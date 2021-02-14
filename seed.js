const admin = require('firebase-admin');
const faker = require('faker');

admin.initializeApp();
const db = admin.firestore();

const fakeDrinks = () => {
	return db.collection('drinks').add({
		productName: faker.commerce.productName(),
		price: faker.commerce.price(),
		image: faker.image.food(),
	});
};

function fakeSnacks() {
	return db.collection('snacks').add({
		productName: faker.commerce.productName(),
		price: faker.commerce.price(),
		image: faker.image.food(),
	});
}
Array(20).fill(0).forEach(fakeSnacks);
Array(20).fill(0).forEach(fakeDrinks);
