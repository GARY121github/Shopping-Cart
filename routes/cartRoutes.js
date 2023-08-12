const router = require('express').Router();
const { isLoggedIn } = require('../middlewares/authVerification');
const { myCart, addInCart, deleteProduct } = require('../controller/cartRoutesController');

router.get('/user/cart', isLoggedIn, myCart);

router.post('/user/:productid/add', isLoggedIn, addInCart)

router.delete('/user/:id', isLoggedIn, deleteProduct);

module.exports = router;