require('dotenv').config();
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const message = {
	from: 'Abd El Rahaman <abou.shehata642@gmail.com>',
	to: 'mshehata65@yahoo.de',
	subject: 'First Node Mail',
	text: 'For clients with plaintext support only',
	html: '<p>For clients that do not support AMP4EMAIL or amp content is not valid</p>',
	amp: `<!doctype html>
    <html ⚡4email>
      <head>
        <meta charset="utf-8">
        <style amp4email-boilerplate>body{visibility:hidden}</style>
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
      </head>
      <body>
        <p>Image: <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
        <p>GIF (requires "amp-anim" script in header):<br/>
          <amp-anim src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/></p>
      </body>
    </html>`,
	// attachments: [{}],
};

async function getAccessToken() {
	try {
		const accessToken = await oAuth2Client.getAccessToken();
	} catch (error) {}
	return accessToken;
}

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'abou.shehata643@yahoo.de',
		clientId: CLIENT_ID,
		clientSecret: CLIENT_SECRET,
		refreshToken: REFRESH_TOKEN,
		accessToken: getAccessToken(),
	},
});

transporter.sendMail(message, (error, info) => {
	if (error) {
		console.log(error);
	} else {
		console.log('Email sent: ' + info.response);
	}
});

const sendEmail = (to, name, type) => {
	const transporter = nodemailer.createTransport({
		service: 'yahoo',
		auth: {
			user: 'abou.shehata643@yahoo.de',
			pass: process.env.YAHOO_PASSWORD,
		},
	});

	transporter.sendMail(message, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});

	transporter.close();
};
