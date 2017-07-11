const mysql = require('mysql');
const bcrypt = require('bcrypt-nodejs');
const nconf = require('../config');
const connection = mysql.createConnection(nconf.get('db'));
const LocalStrategy = require('passport-local').Strategy;

module.exports = (passport) => {

    connection.connect();

    passport.use('local-signup', new LocalStrategy({
        session: false,
        passReqToCallback: true
    },
    (req, username, password, done) => {

        const user = {
            'username': username,
            'password': bcrypt.hashSync(password, bcrypt.genSaltSync(8), null),
            'email': req.body.email
        };
      
        const checkDataSql = 'SELECT username, email FROM `Users` WHERE `username` = ? OR `email` = ?';
        connection.query(checkDataSql, [user.username, user.email], (err, result) => {
            if (err) {
                return done(err, false);
            }

            if (result && result.length > 0) {
                let err = new Error();
                err.message = 'User already was created';
                return done(err, false);
            }

            if (!err && result.length === 0) {
                const sql = 'INSERT INTO `Users` SET ? ';
                connection.query(sql, user, (err) => {
                    if (err) {
                        return done(err, false);
                    }
                    return done(null, false);
                });
            }
        });
    }
    ));
};