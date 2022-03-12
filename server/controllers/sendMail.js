
   
const nodemailer = require('nodemailer')
const {google} = require('googleapis')
const {OAuth2} = google.auth;
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'

const {
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS
} = process.env

const oAuth2Client = new google.auth.OAuth2(
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    OAUTH_PLAYGROUND
);

// send mail
const sendEmail = (to, url, txt) => {
    oAuth2Client.setCredentials({
        refresh_token: MAILING_SERVICE_REFRESH_TOKEN
    })

    const accessToken =  oAuth2Client.getAccessToken();

    const smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: SENDER_EMAIL_ADDRESS,
            clientId: MAILING_SERVICE_CLIENT_ID,
            clientSecret: MAILING_SERVICE_CLIENT_SECRET,
            refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
            accessToken: accessToken
        }
    })

    const mailOptions = {
        from: SENDER_EMAIL_ADDRESS,
        to: to,
        subject: "PASSWORD ACTIVATION.",
        html: `
        <div style="max-width: 700px; margin:auto; border: 2px solid #548CFF; padding: 50px 20px; font-size: 110%; border-radius: 4px;">
        <h2 style="text-align: center; text-transform: uppercase;color: #548CFF; font-family: sans-serif;">Welcome to YODOOR.</h2>
        <p style=" font-family: sans-serif;">Congratulations! You're almost set to start using <b>YODOOR</b>.
            Just click the button below to validate your email address.
        </p>
        <a href=${url} style="background: #548CFF;border-radius: 4px; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block; font-family: sans-serif;">${txt}</a>

        <p  style=" font-family: sans-serif;">If the button doesn't work for any reason, you can also click on the link below:</p>

        <div  style=" font-family: sans-serif;">${url}</div>
        `
    }
    
    smtpTransport.sendMail(mailOptions, (err, infor) => {
        if(err) return err;
        return infor
    })
}

module.exports = sendEmail