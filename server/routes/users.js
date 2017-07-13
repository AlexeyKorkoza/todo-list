const express = require('express');
const mysql = require('mysql');
const nconf = require('../config');
const connection = mysql.createConnection(nconf.get('db'));
const token = require('../middlewares/token');
const router = express();

router.get('/user', token.required, getUser);

module.exports = router;

function getUser(req, res) {

    const sql = 'SELECT * FROM `Users` WHERE `user_id` = ?';
    connection.query(sql, [req.payload.id], (err, result) =>{

        if (err) {
            res.status(400).json(err);
        }

        if (result) {
            res.status(200).json({
                user: {
                    'username': result.username,
                    'token': token.generate(result[0].user_id, result[0].username)
                }
            });
        }
    });
}