const { auth } = require('firebase-admin');
const admin = require('firebase-admin');
require('dotenv').config();

const serviceAccount = require('./service-account.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

const cutomClaims = {
	admin: true,
};

(async () => {
	await auth.setCustomUserClaims(uid, cutomClaims);
	const user = await auth.getUser(uid);
	console.log('success', user);
	process.exit();
})();
