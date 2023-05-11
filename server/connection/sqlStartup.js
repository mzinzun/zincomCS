const mysql = require('mysql2');
const sql1 = require('./zincomDB');

const db = mysql.createConnection(
	{
		host: 'localhost',
		user: "root",
		port: 3306,
		password: "dev1root",
		multipleStatements: true
	});
// Definition for Initial Database if does not exist!!
const sql = sql1;

db.connect(err => {
	console.log('using sqlStartUp');
	if (!err) {
		console.log("connected as id " + db.threadId);
	}
});
db.query('use zincomdb', function (err, results) {
	if (err) {
		if (err.errno === 1049) {
			console.log('Error Number reported for No database: ', err.errno);
			db.query(sql, function (err, result) { !err ? console.log('zincomdb database created and ready for use') : console.log('err', err) });
		} else { console.log('There was an error Loading the Database!! error: ', err) }
	} else {
		console.log('Database zincomdb already Exists! Now Connected to zincomdb')
	}
});
module.exports = db;


