const router = require('express').Router();
const { validateProduct } = require('../middlewares/dataValidation');
const { isLoggedIn } = require('../middlewares/authVerification');
const { isAuthor } = require('../middlewares/userValidation')

const { allProducts, newProduct, addProduct,
        viewProduct, deleteProduct, edit, editProduct } = require('../controller/productRoutesController');

router.route('/products')
        .get(allProducts)
        .post(isLoggedIn, addProduct);

router.get('/products/new', newProduct);

router.route('/products/:id')
        .get(viewProduct)
        .patch(isLoggedIn, validateProduct, editProduct)
        .delete(isLoggedIn, isAuthor, deleteProduct)

router.get('/products/:id/edit', isLoggedIn, edit);

module.exports = router;