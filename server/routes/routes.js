const productControllers = require('../controllers/productControllers');
const customerControllers = require('../controllers/customerControllers');
const commentControllers = require('../controllers/commentControllers');
const portalControllers = require('../controllers/portalControllers');

module.exports = (app) => {

//Products routes

app.get('/catagoryList', productControllers.productCatagories);
app.get('/getProductsByCatagory/:cat', productControllers.productsByCatagory);
app.get('/getProductBySKU/:sku', productControllers.productBySKU);
app.post('/getProductBySKUmulti', productControllers.productBySKUmulti);

//Customer routes
app.put('/addCustomerPurchase', customerControllers.addCustomerPurchase);
app.get('/getCustomerByEmail/:email',customerControllers.getCustomerByEmail);
app.get('/getCustomerPurchases/:email',customerControllers.getCustomerPurchases);

//Comments routes
app.post('/addComment', commentControllers.addComment);

//Portal Routes
app.get('/getTableData/:table', portalControllers.getTableData);
app.put('/updateTable', portalControllers.updateTable);
app.delete('/deleteRecord/:rec', portalControllers.deleteRecord);

// No routes exist
// this middleware will not allow the request to go beyond it
app.use(function(req, res, next) {
    res.send('No Such Path exists');
  });
}
