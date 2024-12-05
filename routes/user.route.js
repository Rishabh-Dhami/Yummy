import express from "express";
import passport from "passport";
import { User } from "../models/user.model.js";
import { wraperAsync } from "../utils/wraperAsync.js";


const router = express.Router();

// Route to render login page
router.get("/login", (req, res) => {
  res.render("user/login.ejs");
});

// Route to render signup page
router.get("/signup", (req, res) => {
  res.render("user/signup.ejs");
});

// Signup route - Handles user registration
router.post(
  "/signup",
  wraperAsync(async (req, res, next) => {
    try {
      const { username, password, email } = req.body;

      // Check if all fields are filled
      if (!username || !password || !email) {
        req.flash("error", "All fields are required");
        return res.redirect("/signup");
      }

      // Check if the user already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        req.flash("error", "Username is already taken");
        return res.redirect("/signup");
      }

      // Create new user
      const newUser = new User({ username, email });
      const registeredUser = await User.register(newUser, password);

      

      // Automatically log in the user after registration
      req.login(registeredUser, (err) => {
        if (err) {
          console.error("Error logging in user after signup:", err);
          return next(err);
        }
        req.flash("success", "Welcome to the platform!");
        res.redirect("/"); // Redirect to home page
      });
    } catch (error) {
      console.error("Signup error:", error);
      req.flash("error", error.message || "An error occurred during signup.");
      res.redirect("/signup");
    }
  })
);

// Login route - Handles user authentication
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",  // Redirect if login fails
    failureFlash: true,  // Flash failure message
  }),
  (req, res) => {
    req.flash("success", "Successfully logged in!");
    res.redirect("/"); // Redirect to home or dashboard
  }
);

// Logout route - Handles user logout
router.get(
  "/logout",
  wraperAsync((req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Logged out successfully!");
      res.redirect("/"); // Redirect to homepage after logout
    });
  })
);

export { router as userRoute };
