const fs = require('fs');
const PDFDocument = require('pdfkit');

function createInvoice(invoice, path) {
	let doc = new PDFDocument({ size: 'A4', margin: 50 });

	generateHeader(doc);
	generateCustomerInformation(doc, invoice);
	generateInvoiceTable(doc, invoice);
	// generateFooter(doc);

	doc.end();
	doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc) {
	doc.image('logo.png', 50, 45, { width: 50 })
		.fillColor('#444444')
		.fontSize(20)
		.text('Drinks and Things GmbH', 110, 57)
		.fontSize(10)
		.text('Drinks and Things GmbH', 200, 50, { align: 'right' })
		.text('123 Main Street', 200, 65, { align: 'right' })
		.text('1160 Wien', 200, 80, { align: 'right' })
		.moveDown();
}

function generateCustomerInformation(doc, invoice) {
	doc.fillColor('#444444').fontSize(20).text('Invoice', 50, 160);

	generateHr(doc, 185);

	const customerInformationTop = 200;

	doc.fontSize(10)
		.text('Belegnummer:', 50, customerInformationTop)
		.font('Helvetica-Bold')
		.text(invoice.invoice_nr, 150, customerInformationTop)
		.font('Helvetica')
		.text('Belegdatum:', 50, customerInformationTop + 15)
		.text(formatDate(new Date()), 150, customerInformationTop + 15)
		.text('Gesamtkosten:', 50, customerInformationTop + 30)
		.text(formatCurrency(invoice.subtotal - invoice.paid), 150, customerInformationTop + 30)

		.font('Helvetica-Bold')
		.text(invoice.shipping.name, 300, customerInformationTop)
		.font('Helvetica')
		.text(invoice.shipping.address, 300, customerInformationTop + 15)
		.text(invoice.shipping.plz + ', Wien' + 300, customerInformationTop + 30)
		.moveDown();

	generateHr(doc, 252);
}

function generateInvoiceTable(doc, invoice) {
	let i;
	const invoiceTableTop = 330;

	doc.font('Helvetica-Bold');
	generateTableRow(
		doc,
		invoiceTableTop,
		'Produkt',
		'Description',
		'Unit Cost',
		'Anzahl',
		'Line Total'
	);
	generateHr(doc, invoiceTableTop + 20);
	doc.font('Helvetica');

	for (i = 0; i < invoice.items.length; i++) {
		const item = invoice.items[i];
		const position = invoiceTableTop + (i + 1) * 30;
		generateTableRow(
			doc,
			position,
			item.item,
			item.description,
			formatCurrency(item.amount / item.quantity),
			item.quantity,
			formatCurrency(item.amount)
		);

		generateHr(doc, position + 20);
	}

	// const subtotalPosition = invoiceTableTop + (i + 1) * 30;
	// generateTableRow(
	// 	doc,
	// 	subtotalPosition,
	// 	'',
	// 	'',
	// 	'Subtotal',
	// 	'',
	// 	formatCurrency(invoice.subtotal)
	// );

	// const paidToDatePosition = subtotalPosition + 20;
	// generateTableRow(
	// 	doc,
	// 	paidToDatePosition,
	// 	'',
	// 	'',
	// 	'Paid To Date',
	// 	'',
	// 	formatCurrency(invoice.paid)
	// );

	// const duePosition = invoiceTableTop + 25;
	const duePosition = invoiceTableTop + +(i + 1) * 30;
	doc.font('Helvetica-Bold');
	generateTableRow(
		doc,
		duePosition,
		'',
		'',
		'Gesamtkosten',
		'',
		formatCurrency(invoice.subtotal - invoice.paid)
	);
	doc.font('Helvetica');
}

// function generateFooter(doc) {
// 	doc.fontSize(10).text('Payment is due within 15 days. Thank you for your business.', 50, 780, {
// 		align: 'center',
// 		width: 500,
// 	});
// }

function generateTableRow(doc, y, item, description, unitCost, quantity, lineTotal) {
	doc.fontSize(10)
		.text(item, 50, y)
		.text(description, 150, y)
		.text(unitCost, 280, y, { width: 90, align: 'right' })
		.text(quantity, 370, y, { width: 90, align: 'right' })
		.text(lineTotal, 0, y, { align: 'right' });
}

function generateHr(doc, y) {
	doc.strokeColor('#aaaaaa').lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function formatCurrency(cents) {
	return '$' + (cents / 100).toFixed(2);
}

function formatDate(date) {
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();

	return year + '/' + month + '/' + day;
}

module.exports = {
	createInvoice,
};
