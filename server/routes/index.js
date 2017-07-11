const express = require('express');
const router = express();
const auth = require('./auth');

router.use('/auth', auth);

module.exports = router;