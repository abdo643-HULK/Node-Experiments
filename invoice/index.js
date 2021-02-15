const products = require('./products');
const { createInvoice } = require('./generator');

createInvoice(products, 'invoice.pdf');
