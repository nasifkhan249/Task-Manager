const nodemailer = require('nodemailer');
const SendEmailUtility=async(EmailTo,EmailText,EmailSubject)=>{
    let transporter=nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 25,
        secure: false,
        auth: {
            user: 'nasifkhan426@gmail.com',
            pass:'xffs zajd hahu oxxs'
        },tls: {
            rejectUnauthorized: false
        },
    });

    let mailOptions = {
        from: 'Task Manager <nasifkhan426@gmail.com>',
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText
    };

    return await transporter.sendMail(mailOptions);

}

module.exports=SendEmailUtility;