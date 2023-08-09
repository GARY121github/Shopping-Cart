const router = require('express').Router();
const User = require('../models/user');
const passport = require('passport');


router.get('/register', async (req, res) => {
    res.render('auth/signup');
})

router.post('/register', async (req, res) => {
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
});


router.get('/login', (req, res) => {
    try {
        // req.session.return = req.session.returnURL;
        // console.log(req.session);
        res.render('auth/login');
    }
    catch (err) {
        res.render('error', { err: err.message });
    }
})

router.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function (req, res) {
        req.flash('success', `welcome back ${req.user.username}`);
        // console.log(req.session);
        res.redirect('/products');
    });

router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }

        req.flash('success', 'GoodBye!!!');
        res.redirect('/products');
    });
});


module.exports = router;