const express = require('express');
const mysql = require('mysql');
const nconf = require('../config');
const connection = mysql.createConnection(nconf.get('db'));
const token = require('../middlewares/token');
const router = express();

router.get('/:id', token.required, getTodosById);
router.get('/todo/:id', token.required, getTodoById);
router.post('/create', token.required, createTodo);
router.put('/todo/:id', token.required, updateTodo);
router.delete('/todo/:id', token.required, removeTodo);

module.exports = router;

function getTodosById(req, res) {

    const id = req.params.id;
    const sql = 'select * from `todos` where `group_id` = ?';
    connection.query(sql, [id], (err, result) => {

        if (err) {
            res.status(400);
        }

        if (result && result.length === 0) {
            res.status(200).json('Todos are not created');
        }

        if (result && result.length > 0) {
            res.status(200).json(result);
        }

    });
}

function getTodoById(req, res) {

    const id = req.params.id;
    const sql = 'select * from `todos` where `todo_id` = ?';
    connection.query(sql, [id], (err, result) => {

        if (err) {
            res.status(400);
        }

        if (result && result.length > 0) {
            res.status(200).json(result);
        }

    });

}

function createTodo(req, res) {

    const todo = {
        'group_id': req.body.group_id,
        'name': req.body.name,
        'checked': false
    };

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

            });
        }

    });

}

function updateTodo(req, res) {

    const todo = {
        'todo_id': req.body.todo_id,
        'name': req.body.name,
        'group_id': req.body.group_id
    };

    const sqlCheck = 'select name, group_id from `todos` where `name` = ? AND `group_id` = ?';
    connection.query(sqlCheck, [todo.name, todo.group_id], (err, result) => {

        if (err) {
            res.status(400).json(err);
        }

        if (result && result.length > 0) {
            res.status(403).json('Todo already was created');
        }

        if (result && result.length === 0) {

            const sql = 'update `todos` set `name` = ?, `group_id` = ? where `todo_id` = ?';
            connection.query(sql, [todo.name, todo.group_id, todo.todo_id], (err, result) => {

                if (err) {
                    res.status(400).json(err);
                }

                if (result) {
                    res.status(200).json('Todo was updated');
                }

            });
        }

    });

}

function removeTodo(req, res) {
    
    const id = req.params.id;
    const sql = 'delete from `todos` where `todo_id` = ?';
    connection.query(sql, [id], (err, result) => {

        if (err) {
            res.status(400).json(err);
        }

        if (result) {
            res.status(200).json('Todo removed');
        }
    });

}