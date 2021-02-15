'use strict';
require('dotenv').config();
const nodemailer = require('nodemailer');

const port = 587;
const smtpEndpoint = 'email-smtp.eu-central-1.amazonaws.com';

const senderAddress = 'Mary Major <abou.shehata643@yahoo.de>';
const toAddresses = 'mshehata65@yhoo.de';

const smtpUsername = process.env.SES_USER;
const smtpPassword = process.env.SES_PASSWORD;

var subject = 'Amazon Pinpoint test (Nodemailer)';

// The email body for recipients with non-HTML email clients.
var body_text = `Amazon Pinpoint Test (Nodemailer)
---------------------------------
This email was sent through the Amazon Pinpoint SMTP interface using Nodemailer.
`;

// The body of the email for recipients whose email clients support HTML content.
var body_html = `<html>
<head></head>
<body>
  <h1>Amazon Pinpoint Test (Nodemailer)</h1>
  <p>This email was sent with <a href='https://aws.amazon.com/pinpoint/'>Amazon Pinpoint</a>
        using <a href='https://nodemailer.com'>Nodemailer</a> for Node.js.</p>
</body>
</html>`;

// The message tags that you want to apply to the email.
var tag0 = 'key0=value0';
var tag1 = 'key1=value1';

async function main() {
	// Create the SMTP transport.
	let transporter = nodemailer.createTransport({
		host: smtpEndpoint,
		port: port,
		secure: false, // true for 465, false for other ports
		auth: {
			user: smtpUsername,
			pass: smtpPassword,
		},
	});

	// Specify the fields in the email.
	let mailOptions = {
		from: senderAddress,
		to: toAddresses,
		subject: subject,
		text: body_text,
		html: body_html,
		// Custom headers for configuration set and message tags.
		headers: {
			'X-SES-CONFIGURATION-SET': configurationSet,
			'X-SES-MESSAGE-TAGS': tag0,
			'X-SES-MESSAGE-TAGS': tag1,
		},
	};

	// Send the email.
	let info = await transporter.sendMail(mailOptions);

	console.log('Message sent! Message ID: ', info.messageId);
}

main().catch(console.error);
