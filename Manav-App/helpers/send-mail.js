const nodemailer = require("nodemailer");
const config = require("../config");


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: config.email.username,
        pass: config.email.password,
    },
});


module.exports = send_email_text = async (send_to, subject, text) => {

    const email_html = {
        from: { name: config.email.username },
        to: send_to,
        subject: subject,
        text: text
    };

    const mail = await transporter.sendMail(email_html)

    mail ? console.log("mail gönderildi") : console.log("mail gönderilmedi");
}