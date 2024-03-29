/**
 * 404 (Not Found) Handler
 *
 * Usage:
 * return res.notFound();
 * return res.notFound(err);
 * return res.notFound(err, view);
 * return res.notFound(err, redirectTo);
 *
 * e.g.:
 * ```
 * return res.notFound();
 * ```
 *
 * NOTE:
 * If a request doesn't match any explicit routes (i.e. `config/routes.js`)
 * or route blueprints (i.e. "shadow routes", Sails will call `res.notFound()`
 * automatically.
 */

module.exports = function notFound(err, viewOrRedirect) {
  // Get access to `req` & `res`
  var req = this.req;
  var res = this.res;

  // when the function reach 404, try to access the apiary first
//  var apiMock = 'http://private-0d3d7-plekengine.apiary-mock.com';
//  var request = require('request');
//  var method = req.method.toLowerCase();

//  request[method](apiMock + req.url, function (error, response, body) {
//    if (!error && response.statusCode === 200) {
//      res.status(response.statusCode);
//      res.type(response.headers['content-type']);
//
//      return res.send(body);
//    }
//    else {
      // Serve JSON (with optional JSONP support)
      function sendJSON(data) {
        if (!data) {
          return res.send();
        }
        else {
          if (typeof data !== 'object' || data instanceof Error) {
            data = {error: data};
          }
          if (req.options.jsonp && !req.isSocket) {
            return res.jsonp(data);
          }
          else return res.json(data);
        }
      }

      // Set status code
      res.status(404);

      // Log error to console
      req._sails.log.verbose('Sent 404 ("Not Found") response');
      if (err) {
        req._sails.log.verbose(err);
      }

      // If the user-agent wants JSON, always respond with JSON
      if (req.wantsJSON) {
        return sendJSON(err);
      }

      // Make data more readable for view locals
      var locals;
      if (!err) {
        locals = {};
      }
      else if (typeof err !== 'object') {
        locals = {error: err};
      }
      else {
        var readabilify = function (value) {
          if (sails.util.isArray(value)) {
            return sails.util.map(value, readabilify);
          }
          else if (sails.util.isPlainObject(value)) {
            return sails.util.inspect(value);
          }
          else return value;
        };
        locals = { error: readabilify(err) };
      }

      // Serve HTML view or redirect to specified URL
      if (typeof viewOrRedirect === 'string') {
        if (viewOrRedirect.match(/^(\/|http:\/\/|https:\/\/)/)) {
          return res.redirect(viewOrRedirect);
        }
        else return res.view(viewOrRedirect, locals, function viewReady(viewErr, html) {
          if (viewErr) return sendJSON(err);
          else return res.send(html);
        });
      }
      else {
        res.locals.vhost = {
          sitename: '404'
        };
        return res.view('404', locals, function viewReady(viewErr, html) {
          //console.log(viewErr);
          if (viewErr) return sendJSON(err);
          else return res.send(html);
        });
      }
//    }
//  });
};
