const nodemailer = require("nodemailer");



const sendEmail = async (subject, message, send_to, sent_from, reply_to)  => {
    //crete mail transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST ,
        port: 587,
        auth: {
            user: process.env.EMAIL_USER,
            user: process.env.EMAIL_PASS,

        },
        tls: {
            rejectUnauthorized: false
        }
    })

    const options = {
        from: send_from,
        to: send_to,
        reply_to: reply_to,
        subject: subject,
        html: message,
    } 
};

module.exports = sendEmail