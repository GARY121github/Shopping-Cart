const Products = require('../models/product');

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const product = await Products.findById(id);
    if (!(product.author && product.author.equals(req.user._id))) {
        req.flash('error', 'You dont have permissions to do that');
        return res.redirect(`/products/${id}`);
    }
    next();
}