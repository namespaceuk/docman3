const express = require('express');

const router = express.Router();

const apiController = require('../controllers/apicontroller');

/* GET docs listing. */

router.get('/list', apiController.list);
router.get('/:name', apiController.view);
router.post('/upload', apiController.upload);
router.post('/fastload/:name', apiController.fastLoad);
module.exports = router;
