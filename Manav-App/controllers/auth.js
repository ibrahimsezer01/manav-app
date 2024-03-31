const User = require("../models/User")
const slugfield = require("../helpers/slugField")
const bcrypt = require("bcrypt")
const sendEmail = require("../helpers/send-mail")
const jwt = require("jsonwebtoken")

exports.get_register = (req, res) => {
    try {
        res.render("site/register", {
            page_name: "Register",
        })
    } catch (error) {
        console.log(error);
    }
}

exports.post_register = async (req, res) => {
    const { fullName, email, password, birthday } = req.body
    const slug = slugfield(fullName)

    try {
        const checkFullName = await User.findOne({ where: { url: slug } })

        if (checkFullName) {
            return res.redirect("/register")
        }

        const checkEmail = await User.findOne({ where: { email: email } })

        if (checkEmail) {
            return res.redirect("/register")
        }

        if (!checkEmail && !checkFullName) {
            const passwordHash = await bcrypt.hash(password, 10)

            const user = await User.create({
                fullName: fullName,
                email: email,
                password: passwordHash,
                birthday: birthday,
                url: slug
            })

            const token = jwt.sign({ userId: user.id, fullName: user.fullName }, process.env.JWT_KEY)
            await sendEmail(user.email, "Hesab oluşturma", "Hesabiniz Başariyla oluşturuldu")


            // res.cookie("isAuth", 1)

            req.session.isAuth = true
            req.session.userId = user.id
            req.session.email = user.email
            // res.cookie("jsonwebtoken", token, {
            //     httpOnly: true,
            //     maxAge: 1000 * 60 * 60 * 24
            // })

            return res.redirect("/")
        }

    } catch (error) {
        console.log(error);
    }
}

exports.get_login = (req, res) => {
    try {
        res.render("site/login", {
            page_name: "Log in",
        })
    } catch (error) {
        console.log(error);
    }
}

exports.post_login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email: email } })

        if (!user) {
            return res.status(401).redirect("/login");
        }

        const match = await bcrypt.compare(password, user.password)

        if (!match) {
            return res.status(401).redirect("/login");
        }

        if (user && match) {
            req.session.isAuth = true;
            req.session.userId = user.id
            req.session.email = user.email
            return res.redirect(req.query.returnUrl || "/");
        }

    } catch (error) {
        console.log(error);
    }
}

exports.get_logout = (req, res) => {
    try {
        req.session.destroy()
        return res.redirect("/login")
    } catch (error) {
        console.log(error);
    }
}