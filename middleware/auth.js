

export const isLogin = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        
        req.flash("error", "you must be login");
        return res.redirect("/login");
    }
    next();
}