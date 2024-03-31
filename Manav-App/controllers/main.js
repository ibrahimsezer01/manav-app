const Products = require("../models/Products")

exports.get_contact = (req, res) => {
    try {
        return res.render("site/contact", {
            page_name: "Contact",
        })
    } catch (error) {
        console.log(error);
    }
}

exports.get_about = (req, res) => {
    try {
        return res.render("site/about", {
            page_name: "About",
        })
    } catch (error) {
        console.log(error);
    }
}

exports.get_home = (req, res) => {
    try {
        return res.render("site/home", {
            page_name: "Home",
        })
    } catch (error) {
        console.log(error);
    }
}

