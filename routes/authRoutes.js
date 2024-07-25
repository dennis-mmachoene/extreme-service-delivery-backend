const express = require('express');
const router = express.Router();
const createAccount = require('../controllers/registerContoller');
const login = require('../controllers/loginController');

router.post('/create-account', createAccount);
router.post('/login', login);


module.exports = router;