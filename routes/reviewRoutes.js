const router = require('express').Router();
const Product = require('../models/product');
const Review = require('../models/review');
const { validateReview } = require('../middlewares/dataValidation');

router.post('/products/:id/review', validateReview, async (req, res) => {

    const { id } = req.params;
    const { rating, comment } = req.body;
    const product = await Product.findById(id);
    const review = new Review({ rating, desc: comment });
    product.reviews.push(review);
    await review.save();
    await product.save();

    res.redirect(`/products/${id}`);
});

router.delete('/products/:productID/:reviewID', async (req, res) => {
    const { productID, reviewID } = req.params;
    await Review.findByIdAndRemove(reviewID);
    res.redirect(`/products/${productID}`);
})



module.exports = router;