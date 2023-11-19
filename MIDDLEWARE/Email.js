const nodemailer = require("nodemailer")
const dotenv = require("dotenv")
dotenv.config()

const sendEmail = async(Option)=>{
    const transporter = await nodemailer.createTransport({
        host: smtp.gmail.com,
        service: process.env.SERVICE,
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_ID,
            pass: process.env.MAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    async function main(){
        const info = await transporter.sendEmail({
            from: process.env.MAIL_ID,
            to: Option.email,
            subject: Option.subject,
            text: Option.message
        })
    };

    main().catch(console.error)
}

module.exports = sendEmail