const express = require('express');
const mysql = require('mysql');
const nconf = require('../config');
const connection = mysql.createConnection(nconf.get('db'));
const token = require('../middlewares/token');
const router = express();

router.post('/create', token.required, createTodo);

module.exports = router;

function createTodo(req, res) {

    const todo = {
    'group_id': req.body.group_id,
    'name': req.body.name,
    'checked': false
  };

  console.log(todo);

  const sqlCheck = 'select name, group_id from `todos` where `name` = ? AND `group_id` = ?';
  connection.query(sqlCheck, [todo.name, todo.group_id], (err, result) => {

    if (err) {
      res.status(400).json(err);
    }

    if (result && result.length > 0) {
      res.status(403).json('Todo already was created');
    }

    if (result && result.length === 0) {

      const sql = 'insert into `todos` set ?';
      connection.query(sql, [todo], (err, result) => {

        if (err) {
          res.status(400).json(err);
        }

        if (result) {
          res.status(200).json('Todo was created');
        }

      })
    }

  });

}