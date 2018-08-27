const path = require('path');
const formidable = require('formidable');
const fs = require('fs');
const S3 = require('../models/S3');


exports.list = (req, res) => {
  S3.find({}, 'id hash name path title description size created_at', (err, docs) => {
    if (err) {
      res.status(500);
      res.json('error', { error: err });
    }
    res.json(docs);
  });
};

exports.view = (req, res) => {
  // res.send('respond with a resource');
  // console.log('in controller');
  res.sendFile(path.join(__dirname, '/../uploads/', req.param('name')));
};

exports.upload = (req, res) => {
  // console.log('in api upload');
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
        res.json(result);
      }
    });
  });
};

exports.fastLoad = (req, res) => {
  // console.log('in api upload');
  const filePath = path.join(__dirname, '/../uploads/', req.param('name'));
  req.pipe(fs.createWriteStream(filePath));
  const image = new S3({
    hash: '123',
    name: req.param('name'),
    path: filePath,
    title: 'fast loaded from test harness',
    size: '456',
    description: 'png',
  });
  image.save((error, result) => {
    if (error) {
      console.error(error);
    } else {
      res.json(result);
    }
  });
};
