const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');
const nconf = require('../config');

function getTokenFromHeader(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
}

const token = {
    required: expressJWT({
        secret: nconf.get('jwtSecret'),
        userProperty: 'payload',
        getToken: getTokenFromHeader
    }),
    generate: function (id, username) {
        return jwt.sign({
            id: id,
            username: username,
            exp: Math.floor(Date.now() / 1000) + (60 * 60)
        }, nconf.get('jwtSecret'));
    }
};

module.exports = token;