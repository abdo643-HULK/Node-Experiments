const { google } = require('googleapis');

// const auth = new google.auth.GoogleAuth({
// 	keyFile: './service-account2.json',
// 	scopes: ['https://www.googleapis.com/auth/cloud-platform'],
// });

// console.log(auth);
async function getAccessToken() {
	const auth = new google.auth.GoogleAuth({
		keyFile: './service_account2.json',
		scopes: ['https://www.googleapis.com/auth/cloud-platform'],
	});

	const clientId = await auth.getIdTokenClient();
	// const clientSecret =
	// const refreshToken = '';
	const accessToken = await auth.getAccessToken();
}

main().catch(console.error);
