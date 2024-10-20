if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const Book = require("./models/books.js");
const methodOverride = require("method-override");
const wrapAsync = require("./utils/wrapAsync.js");
const expressError = require("./utils/expressError.js");
const { bookSchema } = require("./schema.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const { isLoggedIn } = require("./middleware.js");
const { saveRedirectUrl } = require("./middleware.js");
const multer = require("multer");
const { storage } = require("./cloudconfig.js");
const upload = multer({ storage });
const MongoStore = require("connect-mongo");
const user = require("./models/user.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

const dbUrl = process.env.ATLASDB_URL;

main()
  .then(() => console.log("db connect "))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log("error in mongo session store", err);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUnintialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.curntUser = req.user;
  next();
});
app.use((req, res, next) => {
  res.locals.currentRoute = req.path;
  next();
});

const validateBook = (req, res, next) => {
  let { error } = bookSchema.validate(req.body);
  if (error) {
    throw new expressError(400, error);
  } else {
    next();
  }
};

// home route
app.get("/", (req, res) => {
  res.render("home/home.ejs");
});

// sinup route
app.get("/signup", (req, res) => {
  res.render("users/signup");
});

app.post(
  "/signup",
  wrapAsync(async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const registeredUser = await User.register(newUser, password);
      console.log(registeredUser);
      req.login(registeredUser, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", "Welcome to Bookhub");
        res.redirect("/");
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  })
);

// login route
app.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

app.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    req.flash("success", "Welcome back!");
    let redirectUrl = res.locals.redirectUrl || "/";
    res.redirect(redirectUrl);
  }
);

// logout
app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out!");
    res.redirect("/");
  });
});

// add new book route
app.get("/addbooks/new", isLoggedIn, (req, res) => {
  res.render("addbooks/add.ejs");
});

app.post(
  "/addbooks",
  isLoggedIn, // Add isLoggedIn middleware to ensure user is authenticated
  // validateBook,
  upload.single("books[image]"),
  async (req, res, next) => {
    try {
      if (!req.user) {
        throw new expressError(401, "User not authenticated");
      }

      let url = req.file.path;
      let filename = req.file.filename;
      let newBooks = new Book(req.body.books);
      newBooks.owner = req.user._id; // Ensure req.user is defined before accessing _id
      newBooks.image = { url, filename };
      await newBooks.save();
      req.flash("success", "You added your book");
      console.log(newBooks);
      res.redirect("/explorebooks");
    } catch (err) {
      next(err);
    }
  }
);

// book listing route
app.get(
  "/explorebooks",
  wrapAsync(async (req, res) => {
    let search = "";
    if (req.query.search) {
      search = req.query.search;
    }

    const allBooks = await Book.find({
      $or: [{ title: { $regex: ".*" + search + ".*", $options: "i" } }],
    });

    if (search !== "" && allBooks.length === 0) {
      // Render a "not found" message
      res.render("explorebooks/notfound.ejs");
    } else {
      // Render the books
      res.render("explorebooks/allBooks.ejs", { allBooks });
    }
  })
);

// profile book show
app.get(
  "/yourbooks",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    // res.send("your book page");
    // res.render("explorebooks/yourBooks.ejs");
    const userId = req.user._id;
    const yourBooks = await Book.find({ owner: userId });
    // const books = await User.findById(userId).populate("owner");
    // console.log(books.owner);
    res.render("explorebooks/yourBooks.ejs", { yourBooks });
  })
);

// showbook route
app.get(
  "/explorebooks/:id",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const books = await Book.findById(id).populate("owner");
    res.render("explorebooks/showBook.ejs", { books });
  })
);

// edit book route
app.get(
  "/explorebooks/:id/edit",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const books = await Book.findById(id);
    res.render("explorebooks/editbooks.ejs", { books });
  })
);

// update book route
app.put(
  "/explorebooks/:id",
  upload.single("books[image]"),
  validateBook,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, { ...req.body.books });
    if (typeof req.file !== "undefined") {
      let url = req.file.path;
      let filename = req.file.filename;
      updatedBook.image = { url, filename };
      await updatedBook.save();
    }
    req.flash("success", "new changes done!");
    res.redirect(`/explorebooks/${id}`);
  })
);

// delete book route
app.delete("/explorebooks/:id", isLoggedIn, async (req, res) => {
  let { id } = req.params;
  let deletedBook = await Book.findByIdAndDelete(id);
  req.flash("error", "you deleted your book");
  res.redirect("/explorebooks");
});

// Privacy route
app.get("/Privacy", (req, res) => {
  res.render("home/privacy.ejs");
});

app.all("*", (req, res) => {
  res.render("includes/pageErr.ejs");
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.render("error.ejs", { message });
});

app.listen(8080, () => {
  console.log("app is listening on port 8080");
});
