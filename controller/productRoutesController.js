const Products = require('../models/product');

module.exports.allProducts = async (req, res) => {
    try {
        const products = await Products.find({});
        res.render('products/allProducts', { products });
    }
    catch (e) {
        res.render('error', { err: e.message });
    }
};

module.exports.newProduct = async (req, res) => {
    try {
        res.render('products/newProduct');
    }
    catch (e) {
        res.render('error', { err: e.message });
    }
}

module.exports.addProduct = async (req, res) => {
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
};

module.exports.viewProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Products.findById(id).populate('reviews');
        // console.log(product);
        res.render('products/viewProduct', { product });
    }
    catch (e) {
        res.render('error', { err: e.message });
    }
};

module.exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await Products.findByIdAndDelete(id);
        req.flash('success', 'product deleted successfully')
        res.redirect('/products');
    }
    catch (e) {
        res.render('error', { err: e.message });
    }
};

module.exports.edit = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Products.findById(id);
        res.render('products/editProduct', { product });
    }
    catch (e) {
        res.render('error', { err: e.message });
    }
};

module.exports.editProduct = async (req, res) => {
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
};