/**
 * ArticleController
 * Sample CMS-like application
 *
 * @description :: Server-side logic for managing articles
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var uuid = require('node-uuid'),
    im = require('imagemagick'),
    _ = require('lodash'),
    path = require('path'),
    fs = require('fs');

module.exports = {
    imageUpload: function (req, res) {
        var imgName = uuid.v1(),
            relativePath = 'media/' + imgName + '.png';

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
                            path: '/article/' + relativePath
                        });
                    });
            });
        });
    },

    create: function (req, res) {
        var user = req.user,
            params = _.extend({
                user: {
                    id: user.id,
                    fullname: [user.givenName, user.familyName].join(' ')
                }
            }, req.body);

        if (params.title) {
            params.slug = _.kebabCase(params.title);
        }

        Article.create(params).exec(function (err, record) {
            // Error handling
            if (err) {
                sails.log.error(err);
                return res.serverError(err);
            } else {
                return res.json(record);
            }
        });
    },

    update: function (req, res) {
        var valuesToUpdate = req.body,
            user = req.user;

        if (valuesToUpdate.title) {
            valuesToUpdate.slug = _.kebabCase(valuesToUpdate.title);
        }

        Article.update({id: req.param('id')}, valuesToUpdate, function (err, newMessage) {
            if (err) {
                sails.log.error(err);
                return res.serverError(err);
            } else {
                return res.json(newMessage);
            }
        });
    },

    destroy: function (req, res) {
        var user = req.user;

        Article.update({id: req.param('id'), 'user.id': user.id}, {isDeleted: true}, function (err, newMessage) {
            if (err) {
                sails.log.error(err);
                return res.serverError(err);
            } else {
                return res.json(newMessage);
            }
        });
    },

    find: function (req, res) {
        Article.findOne({id: req.param('id'), isDeleted: {$ne: true}}).exec(function (err, article) {
            return res.json(article);
        });
    },

    findAll: function (req, res) {
        Article.find({isDeleted: {$ne: true}}).sort('createdAt desc').exec(function (err, articles) {
            return res.json(articles);
        });
    },

    media: function (req, res) {
        var filename = req.param('id'),
            origFilePath = path.join('.tmp', 'uploads', 'media', filename);

        if (!/^[a-zA-Z0-9\-\.]+$/.test(filename)) {
            return res.forbidden('illegal character');
        }
        if (!/^[a-zA-Z0-9\-\.]+$/.test(filename)) {
            return res.forbidden('illegal character');
        }

        // if the file is not exist then serve the fallback / default image
        if (!fs.existsSync(origFilePath)) {
            return res.notFound();
        } else {
            // to do cache it for 1 minute
            res.setHeader('Cache-Control', 'public, max-age=600');
            res.sendfile(origFilePath);
        }
    },

    render: function (req, res) {
        var user = req.user || {role: 'viewer'};
        var query = {
            slug: req.param('slug'),
            isDeleted: {$ne: true},
            status: 'published'
        };

        if (_.contains(['editor', 'admin'], user.role)) {
            delete query.status;
        }

        Article.findOne(query).exec(function (err, article) {
            if (!article) {
                return res.notFound();
            }

            var moment = require('moment');
            var publishedDate = moment(article.createdAt || article.updatedAt || new Date());

            return res.view({
                layout: 'layout',
                locals: {
                    currentLoc: article.slug,
                    articles: [{
                        user: article.user,
                        publishDate: {
                            dateObj: article.createdAt,
                            date: publishedDate.format('D'),
                            day: publishedDate.format('dddd'),
                            month: publishedDate.format('MMMM'),
                            year: publishedDate.format('YYYY')
                        },
                        title: article.title,
                        content: article.content,
                        slug: article.slug
                    }]
                }
            });
        });
    },

	// sample render single page
    renderPage: function (req, res) {
        var user = req.user || {role: 'viewer'};
        var query = {
            slug: req.param('slug'),
            isDeleted: {$ne: true},
            status: 'published'
        };

        if (_.contains(['editor', 'admin'], user.role)) {
            delete query.status;
        }

        Article.findOne(query).exec(function (err, article) {
            if (!article) {
                return res.notFound();
            }

            var moment = require('moment');
            var publishedDate = moment(article.createdAt || article.updatedAt || new Date());

            return res.view({
                layout: 'layout',
                locals: {
                    currentLoc: article.slug,
                    articles: [{
                        user: article.user,
                        publishDate: {
                            dateObj: article.createdAt,
                            date: publishedDate.format('D'),
                            day: publishedDate.format('dddd'),
                            month: publishedDate.format('MMMM'),
                            year: publishedDate.format('YYYY')
                        },
                        title: article.title,
                        content: article.content,
                        slug: article.slug
                    }]
                }
            });
        });
    }
};
