const express = require('express');
const mysql = require('mysql');
const nconf = require('../config');
const connection = mysql.createConnection(nconf.get('db'));
const token = require('../middlewares/token');
const router = express();

router.get('/', token.required, getGroups);
router.get('/first', token.required, getGroupFirst);
router.get('/group/:id', token.required, getGroup);
router.post('/create', token.required, createGroup);
router.put('/group/:id', token.required, updateGroup);
router.delete('/group/:id', token.required, removeGroup);

module.exports = router;

function getGroup(req, res) {

    const id = req.params.id;
    const sql = 'select * from `groups` where `group_id` = ?';
    connection.query(sql, [id], (err, result) => {

        if (err) {
            res.status(400);
        }

        if (result && result.length === 1) {
            res.status(200).json(result);
        }

    });
}

function getGroupFirst(req, res) {

    const sql = 'select * from `groups` limit 1';
    connection.query(sql, (err, result) => {

        if (err) {
            res.status(400);
        }

        if (result && result.length === 1) {
            res.status(200).json(result);
        }

    });

}

function getGroups(req, res) {

    const sql = 'select * from `groups` where `user_id` = ?';
    connection.query(sql, [req.payload.id], (err, results) => {

        if (err) {
            res.status(400);
        }

        if (results && results.length > 0) {
            res.status(200).json(results);
        }

        if (results && results.length === 0) {
            res.status(200).json('Empty');
        }
    });
}

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
                    const member = {
                        'group_id': result.insertId,
                        'user_id': group.user_id,
                        'status': 'author'
                    };
                    const sqlMembers = 'insert into `members` SET ?';
                    connection.query(sqlMembers, [member], (err, result) =>{
                        if (err) {
                            res.status(400).json(err);
                        }

                        if (result) {
                            res.status(200).json('Group was created');
                        }
                    })
                }

            });
        }
    });
}

function updateGroup(req, res) {

    const id = req.body.group_id;
    const sql = 'update `groups` set `name` = ? where `group_id` = ?';
    connection.query(sql, [req.body.name, id], (err, result) => {

        if (err) {
            res.status(400).json(err);
        }

        if (result) {
            res.status(200).json('Group was updated');
        }

    });
}

function removeGroup(req, res) {

    const id = req.headers.id.split(' ')[1];
    const sql = 'delete from `groups` where `group_id` = ?';
    connection.query(sql, [id], (err, result) => {

        if (err) {
            res.status(400).json(err);
        }

        if (result) {
            res.status(200).json('Group removed by id');
        }
    });
}