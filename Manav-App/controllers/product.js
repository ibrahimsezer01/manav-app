const Products = require("../models/Products")
const Categories = require("../models/Categories")
const cloudinary = require("../helpers/cloudinary")
const sendEmail = require("../helpers/send-mail")


exports.get_products_form = async (req, res) => {
    try {
        const categories = await Categories.findAll()
        res.render("site/products", {
            page_name: "Products",
            categories: categories
        })
    } catch (error) {
        console.log(error);
    }
}

exports.post_product = async (req, res) => {
    const { name, price, description, stock, CategoryId } = req.body
    const images = req.file
    const userId = req.session.userId
    const email = req.session.email

    try {
        const image = await cloudinary.handleUpload(images.path)

        const product = await Products.create({
            name: name,
            price: price,
            description: description,
            CategoryId: CategoryId,
            stock: stock,
            image_public_id: image.public_id,
            image_url: image.url,
            userId: userId
        })

        if (product) {
            await sendEmail(email, "Ürün Ekleme", "İşleminiz başarıyla sonuçlanmıştır iyi günler dileriz")
            return res.redirect("/shop")
        }
            
    } catch (error) {
        console.log(error);
    }
}

exports.delete_product = async (req, res) => {
    try {
        const categories = await Categories.find
    } catch (error) {
        console.log(error);
    }
}

exports.get_product_ById = async (req, res) => {
    const productId = req.params.productId
    try {
        const product = await Products.findOne({ where: { id: productId }})
        return res.render("site/product-details", {
            product: product,
            page_name: "Shop",
        })
    } catch (error) {
        console.log(error);
    }
}

exports.get_products = async (req, res) => {
    try {
        const products = await Products.findAll()
        return res.render("site/shop", {
            products: products,
            page_name: "Shop",
        })
    } catch (error) {
        console.log(error);
    }
}