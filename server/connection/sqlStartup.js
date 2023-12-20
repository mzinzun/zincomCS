const mysql = require('mysql2');
const sql1 = require('./zincomDB');
const db = mysql.createConnection(
	{
		host: 'mysql',
		port: 3306,
		user: "dbuser",
		password: "dbuser",
		database: 'zincomdb',
		multipleStatements: true,
		connectTimeout: 5000 // Set a higher value for connectTimeout (in milliseconds)
	});
// Definition for Initial Database if does not exist!!

// async function preloadData() {
// 	const sql = await sql1;
// 	// Check if the database is empty by querying for existing tables
// 	db.query("SHOW TABLES", (err, results) => {
// 		if (err) {
// 			console.log("Error checking for existing tables:", err);
// 			return;
// 		}

// 		// If there are no tables in the database, preload data
// 		if (results.length === 0) {
// 			db.query(sql, (err, result) => {
// 				if (!err) {
// 					console.log('Preloaded data successfully!');
// 				} else {
// 					console.log('Error preloading data:', err);
// 				}
// 			});
// 		} else {
// 			console.log('Database already contains tables. Skipping preloading.');
// 		}
// 	});
// }
db.connect(err => {
	console.log('using sqlStartUp');
	if (!err) {
		console.log("connected as id " + db.threadId);
		// preloadData();
	}
	else {
		console.log("connection error " + err.stack);
	}
});
// proload data from slq if database is empty



// intended for initial database creation if does not exist
// db.query('use zincomdb', function(err,results) {
// 	if (err) {
// 		if(err.errno === 1049) {
// 			console.log('Error Number reported for No database: ',err.errno);
// 			db.query(sql,function (err,result){!err?console.log('zincomdb database created and ready for use'):console.log('err',err)});
// 		}	else {
// 			console.log('There was an error Loading the Database!! error: ',err)
// 		}
// 	} else {
// 		console.log('Database zincomdb already Exists! Now Connected to zincomdb')
// 	}
// });
module.exports = db;
