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

router.post('/login', (req, res, next) => {

    passport.authenticate('local-login', { failureFlash: true }, (err, userData) => {

        if (err) {
            return res.status(400).json(err);
        }

        if (userData) {
            return res.status(200).json({
                user:userData
            });
        } else {
            return res.status(403).json(req.flash('loginMessage')[0]);
        }

    })(req, res, next);
});

module.exports = router;
