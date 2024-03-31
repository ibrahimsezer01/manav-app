const express = require('express')
const router = express.Router()

const main = require("../controllers/main")
const isAuth = require("../middlewares/isAuth")


router.get("/contact", isAuth, main.get_contact)

router.get("/about", isAuth, main.get_about)

router.get("/", main.get_home)

module.exports = router