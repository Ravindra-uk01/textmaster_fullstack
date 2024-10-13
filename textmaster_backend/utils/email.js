import nodemailer from 'nodemailer';

const sendEmail = async options =>{

    // 1) Create a Transporter
    const transporter = nodemailer.createTransport({
        //service : 'Gmail',
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth : {
            user : process.env.EMAIL_USERNAME,
            pass : process.env.EMAIL_PASSWORD
        }
        // Activate in gmail less secure option
    })

    // 2) Define the email options 
    const mailOptions = {
        from : "Ravindra Singh Rayal <otp.ravindra@gmail.com>",
        to : options.email,
        subject : options.subject,
        //text : options.message,
        html : options.message,
    }

    // 3) Actually send the email
    const info = await transporter.sendMail(mailOptions);
   // console.log('info is ', info);
}

export default sendEmail;