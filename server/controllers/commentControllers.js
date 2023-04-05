const db = require('../connection/sqlStartup');

addComment = (req,res) => {
    let comment  = req.body;
    comment.name = (comment.name).trim();
    comment.email = (comment.email).trim();
    comment.subject = (comment.subject).trim();
    comment.comment = (comment.comment).trim();
    delete comment.showAlert;
    db.query('INSERT INTO `comments` SET ?', [comment], function(err,result,field){
      if(!err) {
        res.json({successful:true});
      }else {
				console.log(err);
				res.json({successful: false, error: err});
			};
    });
};

module.exports = {
  addComment
};