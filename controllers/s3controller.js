// const Book = require('../models/book');
const formidable = require('formidable');
const path = require('path');
const S3 = require('../models/S3');

exports.index = (req, res) => {
  // res.send('NOT IMPLEMENTED: Site Home Page');
  res.render('index', { title: 'Express' });
};

exports.post = (req, res) => {
  // console.log('in s3 upload');
  const form = new formidable.IncomingForm();
  form.hash = 'sha1';
  form.parse(req);

  form.on('fileBegin', (name, file) => {
    file.path = path.join(__dirname, '/../uploads/', file.name);
  });

  form.on('file', (name, file) => {
    console.log(`Uploaded ${file.name}`);
    const image = new S3({
      hash: file.hash,
      name: file.name,
      path: file.path,
      title: 'uploaded from test harness',
      size: file.size,
      description: file.type,
    });
    image.save((error, result) => {
      if (error) {
        console.error(error);
      } else {
        res.render('index');
      }
    });
  });
};
