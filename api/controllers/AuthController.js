// api/controllers/AuthController.js

var passport = require('passport');

module.exports = {

    login: function (req, res) {
        res.view('auth/login', {currentLoc: ''});
    },
    process: function (req, res) {
        passport.authenticate('local', function (err, user, info) {
            // console.log(err, user, info);

            if ((err) || (!user)) {
                req.flash('error', 'invalid email or password');
                return res.redirect('/login');
            }
            req.logIn(user, function (err) {
                if (err) {
                    res.send(err);
                }
                return res.redirect('/');
            });
        })(req, res);
    },

    logout: function (req, res) {
        req.logOut();
        return res.redirect('/');
    }
};