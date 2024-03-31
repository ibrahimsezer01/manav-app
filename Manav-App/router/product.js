const express = require('express')
const router = express.Router()

const product = require("../controllers/product")
const upload = require("../helpers/upload")
const isAuth = require("../middlewares/isAuth")

router.get("/products", isAuth, product.get_products_form)

router.post("/products", isAuth, upload.single("images"), product.post_product)

// router.post("/shop/:catId", isAuth, product.get_product_ById);

router.get("/shop/product/:productId", isAuth, product.get_product_ById)

router.get("/shop", isAuth, product.get_products)

module.exports = router