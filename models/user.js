const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

// Define the user schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensure the email is unique
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address."], // Regex for email validation
  },
});

// Plugin for handling username and password with passport-local-mongoose
userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

// Export the User model
module.exports = mongoose.model("User", userSchema);
