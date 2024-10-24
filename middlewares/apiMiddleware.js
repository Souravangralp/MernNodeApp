const express = require('express');
const router = express.Router();
const accessController = require('../controllers/accessController');
const userController = require('../controllers/userController');

//configure api controller
router.use('/auth', accessController);
router.use(userController);

module.exports = router;