const express = require('express');
const mysql = require('mysql');
const nconf = require('../config');
const connection = mysql.createConnection(nconf.get('db'));
const token = require('../middlewares/token');
const router = express();

router.get('/:id', token.required, getGroupsById);
router.post('/add', token.required, addMember);

module.exports = router;

function getGroupsById(req, res) {

  const id = req.params.id;
  const sql = 'select users.username, members.member_id, members.user_id from `members`' +
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

function addMember(req, res) {

  const data = {
    'group_id': req.body.group_id,
    'user_id': req.body.user_id,
    'status': 'member'
  };

  const sqlCheck = 'select group_id, user_id from `members` where `group_id` = ? and `user_id` = ? ';
  connection.query(sqlCheck, [data.group_id, data.user_id], (err, result) => {

    if (err) {
      res.status(400).json(err);
    }

    if (result && result.length > 0) {
      res.status(200).json('This user already was added');
    }

    if (result && result.length === 0) {

      const sql = 'insert into `members` set ?';
      connection.query(sql, [data], (err, result) => {

        if (err) {
          res.status(400).json(err);
        }

        console.log(result);
        if (result) {
          data.member_id = result.insertId;
          console.log(data);
          res.status(200).json(data);
        }
      })
    }
  })

}