const nodemailer = require("nodemailer");
const user = ''

const sender = '';


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user,
        pass: ""
    }
});

/**
 * @class Email
 */

class Email {
    /**
     * @method send
     */

    static async send(msg, error = false) {
        console.log(`sending email ${error ? "error alert":"alert"}`);

        transporter.sendMail({
            to: sender,
            from: user,
            subject: error ? "Quote of the day - Error" : "Quote of the day",
            html: msg
        });

        console.log(`Alert send Successfully`);


    }
}

module.exports = Email;