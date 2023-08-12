module.exports.isLoggedIn = (req, res, next) => {
    
    if (!req.isAuthenticated()) {
        console.log(req.locals);
        req.session.returnURL = req.originalUrl;
        req.flash('error', 'You need to login first to do that!');
        return res.redirect('/login');
    }
    next();

}