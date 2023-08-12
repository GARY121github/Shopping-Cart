const router = require('express').Router();
const passport = require('passport');
const { registerPage, register, loginPage, login, logout } = require('../controller/authRoutesController')

router.route('/register')
    .get(registerPage)
    .post(register);


router.route('/login')
    .get(loginPage)
    .post(passport.authenticate('local', { failureRedirect: '/login' }), login);

router.get('/logout', logout);

module.exports = router;

