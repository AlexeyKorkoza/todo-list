const express = require('express');
const passport = require('passport');
const router = express();

router.post('/signup', (req, res, next) => {

    passport.authenticate('local-signup', (err) => {
        if (err) {
            return res.status(403).json('User already was created');
        }

        return res.status(204).end();
    })(req, res, next);

});

module.exports = router;
