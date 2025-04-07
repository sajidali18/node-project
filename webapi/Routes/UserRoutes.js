const express = require('express');

const UserDetail = require('../Controllers/UserDetail');
const GetUser = require('../Controllers/GetUser');
const Userlogin = require('../Controllers/Login');
const userinfo = require('../Controllers/user');

const router = express.Router();

router.post('/save', UserDetail);
router.get('/find', GetUser)
router.post('/login', Userlogin);
router.get('/user', userinfo)
module.exports = router;