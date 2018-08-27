const express = require('express');

const router = express.Router();

const viewController = require('../controllers/viewcontroller');

/* GET docs listing. */

router.get('/:name', viewController.view);

module.exports = router;
