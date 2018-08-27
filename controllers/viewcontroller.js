// const S3 = require('../models/S3');
const path = require('path');


exports.view = (req, res) => {
  // res.send('respond with a resource');
  // console.log('in controller');
  res.sendFile(path.join(__dirname, '/../uploads/', req.param('name')));
};
