const express = require('express');
const router = express();
const auth = require('./auth');
const users = require('./users');
const groups = require('./groups');
const todos = require('./todos');

router.use('/auth', auth);
router.use('/users', users);
router.use('/groups', groups);
router.use('/todos', todos);

module.exports = router;