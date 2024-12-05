import express from 'express';
import { wraperAsync } from '../utils/wraperAsync.js';
import { Booking } from '../models/booking.model.js';
import { Contact } from '../models/contact.model.js';
import { isLogin } from '../middleware/auth.js';



const route = express.Router();


route.get("/", (req, res) => {
    res.render("index.ejs");
})


route.post("/contact",isLogin, wraperAsync(async(req, res, next) =>{

    const {name, email, message, subject} = req.body;

    if(!name || !email || !message || !subject){
        return next(new ErrorHandler(400, "all field are required"));
    }

    let contact = new Contact({
        name,
        email,
        message,
        subject
    })
    
   await contact.save();
   req.flash("success", "Thank you for reaching out! We will get back to you soon.");
    res.redirect("/");
}));


route.post("/booking",isLogin, wraperAsync(async(req, res, next) =>{
    const {bookName, bookEmail, bookDate, bookTime, bookPeople, bookMessage, bookPhone} = req.body;

    if(!bookName || !bookEmail || !bookDate || !bookTime || !bookPeople || !bookMessage || !bookPhone){
        return next(new ErrorHandler(400, "all filed are required"));
    }
    

    let Book = new Booking({
        bookName,
        bookEmail,
        bookTime,
        bookDate,
        bookMessage,
        bookPeople,
        bookPhone
    })

   await Book.save();

    req.flash("success", "Your table has been successfully booked!");
    res.redirect("/");
}))




export {route as bookingRoute}