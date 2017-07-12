const express = require('express');
const mysql = require('mysql');
const nconf = require('../config');
const connection = mysql.createConnection(nconf.get('db'));
const token = require('../middlewares/token');
const router = express();

router.post('/create', token.required, createGroup);

module.exports = router;

function createGroup(req, res) {

    const group = {
        'name': req.body.name,
        'user_id': req.payload.id
    };

    const sqlCheck = 'select name, user_id from `groups` where `name` = ? AND `user_id` = ?';
    connection.query(sqlCheck, [group.name, req.payload.id], (err, result) => {
        if (err) {
            res.status(400).json(err);
        }

        if (result && result.length > 0) {
            res.status(403);
        }

        if (!err && result.length === 0) {
            const sql = 'insert into `groups` SET ?';
            connection.query(sql, group, (err, result) => {

                if (err) {
                    res.status(403).json(err);
                }

                if (result) {
                    res.status(200);
                }

            });
        }
    });
}