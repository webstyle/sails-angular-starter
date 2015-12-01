/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var uuid = require('node-uuid'),
    im = require('imagemagick'),
    _ = require('lodash'),
    path = require('path'),
    fs = require('fs'),
    generatePassword = require('password-generator');


module.exports = {
    imageUpload: function (req, res) {
        var imgName = uuid.v1(),
            relativePath = 'user/' + imgName + '.png';

        return req.file('file').upload(relativePath, function onUploadComplete(err, uploadedFiles) {
            _.each(uploadedFiles, function (file) {
                im.convert([file.fd, '-resize', '600', file.fd],
                    function (err) {
                        if (err) {
                            throw err;
                        }

                        res.json({
                            type: 'success',
                            id: imgName,
                            path: '/user/' + relativePath
                        });
                    });
            });
        });
    },

    find: function (req, res) {
        User.findOne({id: req.param('id'), isDeleted: {$ne: true}}).exec(function (err, article) {
            return res.json(article);
        });
    },

    findAll: function (req, res) {
        User.find({isDeleted: {$ne: true}}).sort('givenName desc').exec(function (err, articles) {
            return res.json(articles);
        });
    },

    profile: function (req, res) {
        return res.json(req.user);
    },

    create: function (req, res) {
        var params = _.extend({
            role: 'editor',
            password: generatePassword(8, false)
        }, req.body);

        User.create(params).exec(function (err, user) {
            // Error handling
            if (err) {
                sails.log.error(err);
                return res.serverError(err);
            } else {

                if (sails.config.user.requireUserActivation) {
                    res.render('email/email.ejs', {
                        user: user,
                        hostname: 'http://' + req.host
                    }, function (err, list) {
                        nodemailer.send({
                            name: user.givenName + ' ' + user.familyName,
                            from: sails.config.nodemailer.from,
                            to: user.email,
                            subject: 'New Account Acivation Required',
                            messageHtml: list
                        }, function (err, response) {
                            sails.log.debug('nodemailer sent', err, response);
                        });
                        return res.json(user);
                    });
                }
            }
        });
    },

    activate: function (req, res) {
        var params = req.params.all(),
            genpass = generatePassword(8, false);

        sails.log.debug('activation action');

        //Activate the user that was requested.
        User.update({
            id: params.id,
            activationToken: params.token
        }, {
            activated: true,
            password: genpass,
            activationToken: false
        }, function (err, user) {
            // Error handling
            if (err) {
                sails.log.debug(err);
                res.send(500, err);
                // Updated users successfully!
            } else {
                user = _.first(user);
                sails.log.debug('User activated:', user);

                var username = user.username;
                res.render('email/account_activated.ejs', {user: user, password: genpass}, function (err, list) {
                    nodemailer.send({
                        name: user.givenName + ' ' + user.familyName,
                        from: sails.config.nodemailer.from,
                        to: user.email,
                        subject: 'Your account is now activated',
                        messageHtml: list
                    }, function (err, response) {
                        sails.log.debug('nodemailer sent', err, response);
                        res.redirect('/auth/process?username=' + encodeURIComponent(username) + '&password=' + genpass);
                    });
                });
            }
        });

    },

    update: function (req, res) {
        var valuesToUpdate = req.body;

        if (valuesToUpdate.resetPassword) {
            var genpass = generatePassword(8, false);
            valuesToUpdate.password = genpass;
        }

        if (valuesToUpdate.isDeleted === true) {
            valuesToUpdate.activated = false;
        }

        User.update({id: req.param('id')}, valuesToUpdate, function (err, resp) {
            if (err) {
                sails.log.error(err);
                return res.serverError(err);
            } else {
                var user = _.first(resp);
                if (valuesToUpdate.resetPassword) {
                    res.render('email/account_activated.ejs', {user: user, password: genpass}, function (err, list) {
                        nodemailer.send({
                            name: user.givenName + ' ' + user.familyName,
                            from: sails.config.nodemailer.from,
                            to: user.email,
                            subject: 'New password, new charm',
                            messageHtml: list
                        }, function (err, response) {
                            sails.log.debug('nodemailer sent', err, response);
                        });
                    });
                }

                return res.json(resp);
            }
        });
    },

    destroy: function (req, res) {
        User.update({id: req.param('id')}, {isDeleted: true}, function (err, resp) {
            if (err) {
                sails.log.error(err);
                return res.serverError(err);
            } else {
                return res.json(resp);
            }
        });
    }

};

