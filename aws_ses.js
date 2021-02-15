let nodemailer = require('nodemailer');
let aws = require('aws-sdk');

const toAddress = 'mshehata65@yhoo.de';

aws.config.loadFromPath('aws-config.json');

// create Nodemailer SES transporter
let transporter = nodemailer.createTransport({
	SES: new aws.SES({
		apiVersion: '2010-12-01',
	}),
});

// send some mail
transporter.sendMail(
	{
		from: 'Abdo <abou.shehata643@yahoo.de>',
		to: toAddress,
		subject: 'Message',
		text: 'I hope this message gets sent!',
		ses: {
			// optional extra arguments for SendRawEmail
			Tags: [
				{
					Name: 'tag name',
					Value: 'tag value',
				},
			],
		},
	},
	(err, info) => {
		console.log(info.envelope);
		console.log(info.messageId);
	}
);
