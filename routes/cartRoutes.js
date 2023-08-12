const router = require('express').Router();
const User = require('../models/user');
const Product = require('../models/product');
const { isLoggedIn } = require('../middlewares/authVerification');

router.get('/user/cart', isLoggedIn, async (req, res) => {
    const user = await User.findById(req.user._id).populate('cart');

    const totalAmount = user.cart.reduce((sum, curr) => sum + curr.price, 0);

    res.render('cart/cart', { user, totalAmount });
})

router.post('/user/:productid/add', isLoggedIn, async (req, res) => {

    const { productid } = req.params;
    const userid = req.user._id;
    const product = await Product.findById(productid);
    const user = await User.findById(userid);

    user.cart.push(product);

    await user.save();

    res.redirect('/user/cart');
})

router.delete('/user/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const user = req.user;
    
    user.cart = user.cart.filter((productid) => id != productid);
    await user.save();

    res.redirect('/user/cart');

})

module.exports = router;