'use strict';

/**
 * Module dependencies.
 */
var api = require('../../app/controllers/api.server.controller');

module.exports = function(app) {
	app.route('/getmodules')
	.get(api.getJson);
};