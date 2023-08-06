const { productSchema, reviewSchema } = require('../JOIschemas');

module.exports.validateProduct = (req, res, next) => {
    const { name, price, desc, img } = req.body;
    const error = productSchema.validate({ name, price, desc, img });

    if (error) {
        const msg = error.details.map((err) => err.message).join(',');
        return res.render('error', { err: msg });
    }

    next();
}

module.exports.validateReview = (req, res, next) => {
    const { rating, comment } = req.body;
    const { error } = reviewSchema.validate({ rating, comment });

    if (error) {
        const msg = error.details.map((err) => err.message).join(',');
        return res.render('error', { err: msg });
    }
    next();
}