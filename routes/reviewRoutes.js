const router = require('express').Router();
const Product = require('../models/product');
const Review = require('../models/review');
const { validateReview } = require('../middlewares/dataValidation');

router.post('/products/:id/review', validateReview, async (req, res) => {
    try {

        const { id } = req.params;
        const { rating, comment } = req.body;
        const product = await Product.findById(id);
        const review = new Review({ rating, desc: comment });
        product.reviews.push(review);
        await review.save();
        await product.save();

        req.flash('success', 'review added successfully !!');
        res.redirect(`/products/${id}`);
    }
    catch (e) {
        res.render('error', { err: e.message });
    }
});

router.delete('/products/:productID/:reviewID', async (req, res) => {
    try {
        const { productID, reviewID } = req.params;
        await Review.findByIdAndRemove(reviewID);
        req.flash('success', 'review deleted successfully !!');
        res.redirect(`/products/${productID}`);
    }
    catch (e) {
        res.render('error', { err: e.message });
    }
})



module.exports = router;