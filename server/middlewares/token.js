var jwt = require('jsonwebtoken');
var nconf = require('../config');

function generateJWT() {
    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: Math.floor(Date.now() / 1000) + (60 * 60)
    }, nconf.get('jwtSecret'));
}

var token = {
    generate: generateJWT()
};

module.exports = token;