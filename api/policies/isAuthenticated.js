// api/policies/authenticated.js

module.exports = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
        return next();
    } else {
        return res.redirect('/login');
    }
};