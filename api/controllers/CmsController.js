/**
 * CmsController
 *
 * @description :: Server-side logic for managing contents
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    index: function (req, res) {
        res.locals.layout = 'admin-layout';
        res.view('cms/index', {currentLoc: ''});
    }
};
