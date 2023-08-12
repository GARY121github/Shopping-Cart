const router = require('express').Router();
const { validateReview } = require('../middlewares/dataValidation');
const { isLoggedIn } = require('../middlewares/authVerification');
const { addReview, deleteReview } = require('../controller/reviewRoutesController');

router.post('/products/:id/review', isLoggedIn, validateReview, addReview);

router.delete('/products/:productID/:reviewID', isLoggedIn, deleteReview);

module.exports = router;