const express = require('express');
const app = express();
const path = require('path');
const engine = require('ejs-mate');
const mongoose = require('mongoose');
const methodOverride = require('method-override');



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


// ROUTING
const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
app.use(productRoutes);
app.use(reviewRoutes);


const port = 3000;
app.listen(3000, () => {
    console.log(`Connected at port ${port}`);
})