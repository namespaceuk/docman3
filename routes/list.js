const express = require('express');

const router = express.Router();

const listController = require('../controllers/listcontroller');

/* GET docs listing. */

router.get('/', listController.list);
// router.get('/', (req, res, next) => {
//  res.send('respond with a resource');
// });

module.exports = router;
