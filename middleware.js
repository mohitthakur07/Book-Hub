module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash(
      "error",
      "You must be logged in to add your book and view full details of the book."
    );
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.saveRedirectUrl = req.session.redirectUrl;
  }
  next();
};
