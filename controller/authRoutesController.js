const User = require('../models/user');

module.exports.registerPage = async (req, res) => {
    res.render('auth/signup');
};

module.exports.register = async (req, res) => {
    try {
        const { username, password, email, role } = req.body;
        const user = new User({ username, email, role });
        const newUser = await User.register(user, password);

        req.login(newUser, function (err) {
            if (err) {
                return next(err);
            }

            req.flash('success', 'Welcome , You are Registered Successfully');
            return res.redirect('/products');
        });
    }
    catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
};

module.exports.loginPage = (req, res) => {
    try {
        req.session.return = req.session.returnURL;
        // console.log(req.session);
        res.render('auth/login');
    }
    catch (err) {
        res.render('error', { err: err.message });
    }
};

module.exports.login = function (req, res) {
    req.flash('success', `welcome back ${req.user.username}`);
    // console.log(req);
    res.redirect('/products');
};

module.exports.logout = function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }

        req.flash('success', 'GoodBye!!!');
        res.redirect('/products');
    });
};