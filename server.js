import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { ErrorHandler } from './utils/ErrorHandler.js';
import session from 'express-session';
import flash from 'connect-flash';
import ejsMate from 'ejs-mate';
import { bookingRoute } from './routes/booking.js';
import passport from 'passport';
import { User } from './models/user.model.js';
import { Strategy as LocalStrategy } from 'passport-local';
import { userRoute } from './routes/user.route.js';
import { app, connectDB } from './databases/db.js';




connectDB();



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
app.engine('ejs', ejsMate);
app.set("view engine", "ejs");
app.use(express.urlencoded({extended : true}));
app.set("views", path.join(__dirname, "views"));



app.use(session({
    secret: 'SecretCode',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// Use flash middleware
app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success');
    res.locals.error_msg = req.flash('error');
    res.locals.currUser = req.user;
    next();
});


app.use("/", bookingRoute, userRoute);




app.all("*", (req, res, next) => {
    return next( new ErrorHandler(404, "page not found"));
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500; // Default to 500 for server errors
    const message = err.message || "An unexpected error occurred";

    if (!res.headersSent) {  // Check if headers are already sent
        res.status(statusCode).render("error.ejs", { message, statusCode });
    }
});





