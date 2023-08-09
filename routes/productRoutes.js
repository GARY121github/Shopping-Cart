const router = require('express').Router();
const Products = require('../models/product');
const { validateProduct } = require('../middlewares/dataValidation');
const { isLoggedIn } = require('../middlewares/authVerification');
const { isAuthor } = require('../middlewares/userValidation')

router.get('/products', async (req, res) => {
    try {
        const allProducts = await Products.find({});
        res.render('products/allProducts', { allProducts });
    }
    catch (e) {
        res.render('error', { err: e.message });
    }
})

router.get('/products/new', async (req, res) => {
    try {
        res.render('products/newProduct');
    }
    catch (e) {
        res.render('error', { err: e.message });
    }
});

router.post('/products', isLoggedIn, async (req, res) => {
    try {
        // console.log(req.user);
        const { name, img, price, desc } = req.body;
        await Products.create({ name, img, price: parseFloat(price), author: req.user._id, desc });
        req.flash('success', 'product added successfully')
        res.redirect('/products');
    }
    catch (e) {
        res.render('error', { err: e.message });
    }
})

router.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Products.findById(id).populate('reviews');

        res.render('products/viewProduct', { product });
    }
    catch (e) {
        res.render('error', { err: e.message });
    }
});

router.delete('/products/:id', isLoggedIn, isAuthor, async (req, res) => {
    try {
        const { id } = req.params;
        await Products.findByIdAndDelete(id);
        req.flash('success', 'product deleted successfully')
        res.redirect('/products');
    }
    catch (e) {
        res.render('error', { err: e.message });
    }
})

router.get('/products/:id/edit', isLoggedIn, async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Products.findById(id);
        res.render('products/editProduct', { product });
    }
    catch (e) {
        res.render('error', { err: e.message });
    }
})

router.patch('/products/:id', isLoggedIn, validateProduct, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, desc, img } = req.body;

        await Products.findByIdAndUpdate(id, { name, price, desc, img });
        req.flash('success', 'product edited successfully')
        res.redirect(`/products/${id}`);
    }
    catch (e) {
        res.render('error', { err: e.message });
    }
})


module.exports = router;