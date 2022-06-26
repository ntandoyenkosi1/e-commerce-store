const router = require('express').Router()
const user = require('../controllers/userController')
const category = require('../controllers/categoryController')
const product = require('../controllers/productController')
const sale= require('../controllers/saleController')

router.get('/api/users', user.findAllUsers)
router.get('/api/users/:userId', user.findUserById)
router.post('/api/users', user.createUser)
router.put('/api/users/:userId', user.updateUser)
router.delete('/api/users/:userId', user.deleteUser)

router.get('/api/categories', category.getAllCategories)
router.get('/api/categories/:categoryId', category.getCategoryById)
router.post('/api/categories', category.createCategory)
router.put('/api/categories/:categoryId', category.updateCategory)
router.delete('/api/categories/:categoryId', category.deleteCategory)

router.get('/api/products', product.getAllProducts)
router.get('/api/products/:productId', product.getProductById)
router.post('/api/products', product.createProduct)
router.put('/api/products/:productId', product.updateProduct)
router.delete('/api/products/:productId', product.deleteProduct)

router.get('/api/sales', sale.getAllSales)
router.get('/api/sales/:saleId', sale.getSalesByUserId)
router.post('/api/sales', sale.createSale)
router.put('/api/sales/:saleId', sale.updateSale)
router.delete('/api/sales/:saleId', sale.deleteSale)

module.exports=router;