const db = require('../connection/sqlStartup');

addCustomer = (req,res) => {
	let customer = {...req.body};
	delete customer.purchases;
	db.query (
		'INSERT INTO customers SET ?', customer, function(err, result, fields) {
			if (!err) {
				addPurchase(req,res);
			} else {
				console.log(err);
				res.json({successful: false, error: err});
			} ;
		}
	);
};
addPurchase = (req,res) => {
	let info = {...req.body.purchases};
	let purchase = {
		purchDate: info.purchaseDate,
  		ccType: info.ccType,
		cardNum: info.cardNum,
		items: info.items,
		cust_email: req.body.email
	};
	db.query (
		'INSERT INTO purchases SET ?', purchase, function(err, result, fields) {
			if (!err) {
				res.json({successful:true});
			} else {
				console.log(err);
				res.json({successful: false, error: err});
			} ;
		}
	);
}
addCustomerPurchase = (req,res)=>{
	const mail = req.body.email;
	// check if customer exists
	db.query (
		"SELECT * FROM `customers` where email = ?", [mail], function(err, result) {
			if (!err) {
				(result.length === 0)?addCustomer(req,res):addPurchase(req,res);
			} else {
				console.log(err);
				res.json({successful: false, error: err});
			};
		}
	);
};
getCustomerByEmail = (req,res)=>{
	let email = ((req.params.email).trim());
	db.query (
		"SELECT * FROM `customers` where email = ?", [email], function(err, result) {
			if (!err) {
				(result.length === 0)?res.json({noCustomer: true}):res.json(result);
			}  else {
				console.log(err);
				res.json({successful: false, error: err});
			};
		});
};
getCustomerPurchases= (req,res)=>{
	let email = ((req.params.email).trim());
	db.query('SELECT * FROM `purchases` WHERE `cust_email` = ?', [email], function(err,results){
		if(!err) {
			results.length === 0?res.json({noPurchases: true}):res.json(results);
		} else {
			console.log(err);
			res.json({successful: false, error: err});
		}
	});
};

module.exports = {
	addCustomerPurchase,
	addCustomer,
	getCustomerByEmail,
	getCustomerPurchases
};