const db = require('../connection/sqlStartup');

const getTableData = function (req,res) {
    const tableName = (req.params.table).trim();
    db.query('Select * from '+tableName, function(err, result) {
        if (!err) {
            res.json(result);
        } else {
            console.log(err);
                res.json({successful: false, error: err});
        };
    });
};
const updateTable = function (req,res) {
    const allData=req.body;
    const id = Object.keys(allData)[0]
   const data = {...req.body}
   delete data[id];
   delete data.tableName;

    if((allData[id]) !== '') { // If Rec ID exists, then update
        let sql = `UPDATE ${allData.tableName} SET`;
        let sqlAdd1 = ''
        let sqlAdd2 = [];
       
        for (let field in data) {
            sqlAdd1 = sqlAdd1+field+"= ?,";
            sqlAdd2.push(data[field]); 
        }
        sqlAdd2.push(allData[id])
        sql = `UPDATE ${allData.tableName} SET ${sqlAdd1}`
        sql = sql.slice(0,-1);
        sql = sql + ` WHERE ${id} = ?`

        db.query(sql,sqlAdd2, function(err, result) {
            if (!err) {
               console.log('Update Successful')
            } else {
                console.log('There is an error Updating! Error: ', err);
                res.json({successful: false, error: err});
            }
        }); 
    }  else if (allData[id] === '') {
        let sql = `INSERT INTO ${allData.tableName} SET ?`
        db.query(sql, data, function(err, result) {
            if (!err) {
               console.log('Update Successful')
            } else {
                console.log('There is an error Updating! Error: ', err);
                res.json({successful: false, error: err});
            }
        });
    }
    res.json({successful: true});
}
const deleteRecord = function (req,res) {
    const data = (req.params.rec).split(',');
    data[2] = parseInt(data[2]);
    sql = `DELETE FROM ${data[0]} WHERE ${data[1]} = ${data[2]}`;
    db.query(sql,function(err, result) {
        if (!err) {
            console.log('DeletingSuccessful');
            res.json({successful: true});
            } else {
                console.log('There is an error Deleting! Error: ', err);
                res.json({successful: false, error: err});
            }
    });
    // res.json({successful: true});

};
module.exports = {
    getTableData,
    updateTable,
    deleteRecord
  };