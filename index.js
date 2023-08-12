const express = require('express');
const app = express();
const path = require('path');
const engine = require('ejs-mate');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

mongoose.connect('mongodb://127.0.0.1:27017/ShoppingApp').
    then(console.log("DB connected!!!!!")).
    catch(err => console.log(err));


// DEFAULT SETTING
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));



// SETTING UP SESSION-STORAGE FEATURE
const sessionConfig = {
    secret: 'sun rises from east',
    resave: false,
    saveUninitialized: true
}
app.use(session(sessionConfig));
app.use(flash());

// Initialising middleware for passport
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// SETTING UP AUTH
passport.use(new LocalStrategy(User.authenticate()));


// MAKING success and error global so that they can be used through-out all templates.
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})


// ROUTING
const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');

app.use(productRoutes);
app.use(reviewRoutes);
app.use(authRoutes);
app.use(cartRoutes);

app.get('/' , (req , res)=>{
    res.render('home');
})


const port = 3000;
app.listen(3000, () => {
    console.log(`Connected at port ${port}`);
})