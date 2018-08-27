const S3 = require('../models/S3');


exports.list = (req, res) => {
  // const s3 = new S3();
  S3.find({}, 'id hash name path title description size created_at', (err, docs) => {
    if (err) {
      res.status(500);
      res.render('error', { error: err });
    }
    res.render('doc_list', { title: 'Document List', doc_list: docs });
  });
};
