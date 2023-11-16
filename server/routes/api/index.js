const categoryRoutes=require("./category.routes")
const paymentRoutes =require("./payment.routes")
const productRoutes =require("./product.routes")
const saleRoutes =require("./sale.routes")
const shippingRoutes =require("./shipping.routes")
const userRoutes =require("./user.routes")

const router= require("express").Router()

router.use("/users",userRoutes)
router.use("/categories",categoryRoutes)
router.use('/payments',paymentRoutes)
router.use("/products",productRoutes)
router.use("/sales",saleRoutes)
router.use("/shipping",shippingRoutes)

module.exports=router