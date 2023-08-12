const router = require('express').Router();
const { validateProduct } = require('../middlewares/dataValidation');
const { isLoggedIn } = require('../middlewares/authVerification');
const { isAuthor } = require('../middlewares/userValidation')

const { allProducts, newProduct, addProduct, 
        viewProduct, deleteProduct, edit, editProduct } = require('../controller/productRoutesController');

router.get('/products', allProducts);

router.get('/products/new', newProduct);

router.post('/products', isLoggedIn, addProduct)

router.get('/products/:id', viewProduct);

router.delete('/products/:id', isLoggedIn, isAuthor, deleteProduct);

router.get('/products/:id/edit', isLoggedIn, edit);

router.patch('/products/:id', isLoggedIn, validateProduct, editProduct)


module.exports = router;