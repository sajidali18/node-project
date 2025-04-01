const express = require('express');

const UserDetail = require('../Controllers/UserDetail');
const GetUser = require('../Controllers/GetUser');

const router = express.Router();

router.post('/save', UserDetail);
router.get('/find',GetUser)

module.exports = router;