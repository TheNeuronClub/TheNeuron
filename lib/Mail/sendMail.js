import nodemailer from 'nodemailer';

const sendEMail = async (data) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.zoho.in',
            secure: true,
            port: 465,
            auth: {
                user: process.env.mail_user,
                pass: process.env.mail_pass,
            },
        })

        const mailData = {
            from: process.env.mail_user,
            to: `${data.email}`,
            subject: `${data.subject}`,
            text: `${data.text}`,
            html: `${data.html}`
        }

        const info = await transporter.sendMail(mailData);
        console.log("result : ", info);
        return 'mail sent'

    }
    catch (error) {
        console.log(error)
    }
}

export default sendEMail