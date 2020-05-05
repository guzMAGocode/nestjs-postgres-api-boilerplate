import * as nodemailer from 'nodemailer';
import * as pug from 'pug';
import * as juice from 'juice';
import * as htmlToText from 'html-to-text';
import * as util from 'util';

export class MailSender {

    // constructor (private user, html)
    
}

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: parseInt(process.env.MAIL_PORT),
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    });
  
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: 'Nest API team <no-reply@nestapiteam.com>', // sender address
      to: "bar@example.com, baz@example.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>" // html body
    });
  
    console.log("Message sent: %s", info.messageId);
  
  }
  
//   main().catch(console.error);