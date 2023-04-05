// const db = require('../connection/sqlConnection');
const db = require('../connection/sqlStartup');

const productCatagories = function (req,res) {
	db.query (
		'SELECT distinct `catagory` FROM `products` ORDER BY `catagory` ', function(err, result) {
			if (!err) {
				res.json(result);
			} else {
				console.log(err);
					res.json({successful: false, error: err});
			};
		});
};
const productsByCatagory = function (req,res) {	
	const cat = ((req.params.cat).trim());
	db.query (
		"SELECT * FROM `products` where `catagory` = ?",cat, function(err, result) {
			if (!err) {
				res.json(result);
			} else {
				console.log(err);
					res.json({successful: false, error: err});
			};
		});
};
const productBySKU = function (req,res) {
	const sku = ((req.params.sku).trim());
	db.query (
		"SELECT * FROM `products` where  `sku` = ?",[sku], function(err, result) {
			if (!err) {
				res.json(result);
			} else {
				console.log(err);
					res.json({successful: false, error: err});
			};
		});
};
const productBySKUmulti = function (req,res) {
	// store array of skus' 
	const info = req.body;
	// create multiple select statements for number of items purchased searched by sku
	var sql1 = 'SELECT * FROM `products` where  `sku` = ?;'
	for(let i=1;i<info.length;i++) {
		sql1 = sql1+ 'SELECT * FROM `products` where  `sku` = ?;'
	}
	db.query (
		sql1, info,function(err, result) {
			if (!err) {
				res.json(result);
			} else {
				console.log(err);
					res.json({successful: false, error: err});
			};
		});
};

module.exports = {
	productCatagories,
	productsByCatagory,
	productBySKU,
	productBySKUmulti
};