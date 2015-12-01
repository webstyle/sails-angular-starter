/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var moment = require('moment');

module.exports = {
    index: function (req, res) {
        var user = req.user || {
                role: 'viewer'
            };
        var offset = req.param('offset') || 0,
            limit = req.param('limit') || 10,
            query = {
                isDeleted: {$ne: true},
                status: 'published',
                type: {$ne: 'static'}
            };

        if (_.contains(['editor', 'admin'], user.role)) {
            delete query.status;
        }

        Article
            .find(query)
            .sort('createdAt desc')
            .limit(limit)
            .skip(offset)
            .exec(function (err, articles) {
                var htmlTruncate = require('html-truncate');

                return res.view('home/index', {
                    currentLoc: 'home',
                    articles: _.map(articles, function (a) {
                        var publishedDate = moment(a.createdAt);
                        return {
                            user: a.user,
                            publishDate: {
                                dateObj: a.createdAt,
                                date: publishedDate.format('D'),
                                day: publishedDate.format('dddd'),
                                month: publishedDate.format('MMMM'),
                                year: publishedDate.format('YYYY')
                            },
                            title: a.title,
                            status: a.status,
                            content: htmlTruncate(a.content, 400),
                            slug: a.slug
                        };
                    })
                });
            });
    }
};

