const router = require('express').Router();
const Products = require('../models/product');
const { validateProduct } = require('../middlewares/dataValidation');

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

router.post('/products', async (req, res) => {
    try {
        const { name, img, price, desc } = req.body;
        await Products.create({ name, img, price: parseFloat(price), desc });

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

router.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Products.findOneAndDelete(id);
        res.redirect('/products');
    }
    catch (e) {
        res.render('error', { err: e.message });
    }
})

router.get('/products/:id/edit', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Products.findById(id);
        res.render('products/editProduct', { product });
    }
    catch (e) {
        res.render('error', { err: e.message });
    }
})

router.patch('/products/:id', validateProduct, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, desc, img } = req.body;

        await Products.findByIdAndUpdate(id, { name, price, desc, img });
        res.redirect(`/products/${id}`);
    }
    catch (e) {
        res.render('error', { err: e.message });
    }
})


module.exports = router;