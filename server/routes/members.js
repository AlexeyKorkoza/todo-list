const express = require('express');
const mysql = require('mysql');
const nconf = require('../config');
const connection = mysql.createConnection(nconf.get('db'));
const token = require('../middlewares/token');
const router = express();

router.get('/:id', token.required, getGroupsById);

module.exports = router;

function getGroupsById(req, res) {

  const id = req.params.id;
  const sql = 'select users.username, members.member_id from `members`' +
    'inner join `users` on members.user_id = users.user_id where `group_id`= ?';
  connection.query(sql, [id], (err, result) => {

    console.log(result);

    if (err) {
      res.status(400).json(err);
    }

    if (result && result.length > 0) {
      res.status(200).json(result);
    }
  })
}