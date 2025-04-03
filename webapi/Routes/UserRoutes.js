const express = require('express');

const UserDetail = require('../Controllers/UserDetail');
const GetUser = require('../Controllers/GetUser');
const Userlogin = require('../Controllers/Login');

const router = express.Router();

router.post('/save', UserDetail);
router.get('/find', GetUser)
router.post('/login', Userlogin);

module.exports = router;