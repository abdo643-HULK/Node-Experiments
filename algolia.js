const algoliasearch = require('algoliasearch');
const admin = require('firebase-admin');
require('dotenv').config();

const serviceAccount = require('./service-account.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// const APP_ID = functions.config().algolia.app;
// const ADMIN_KEY = functions.config().algolia.key;

const APP_ID = process.env.ALGOLIA_APP_ID;
const ADMIN_KEY = process.env.ALGOLIA_ADMIN_KEY;

const client = algoliasearch(APP_ID, ADMIN_KEY);
const index = client.initIndex('products');

const observer = db.collection('drinks').onSnapshot((querySnapshot) => {
	querySnapshot.docChanges().forEach((change) => {
		if (change.type === 'added') {
			const data = change.doc.data();
			const objectID = change.doc.id;

			return index.saveObject({ ...data, objectID });
		}

		if (change.type === 'modified') {
			const newData = change.doc.data();
			const objectID = change.doc.id;
			return index.saveObject({ ...newData, objectID });
		}

		if (change.type === 'removed') {
			index.deleteObject(change.doc.id);
		}
	});
});
