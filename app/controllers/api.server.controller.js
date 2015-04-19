'use strict';

/**
 * Module dependencies.
 */
var errorHandler = require('./errors.server.controller'),	
	request = require('request');

/**
*
**/
exports.getJson = function(req, res) {
	request('http://api.nusmods.com/2014-2015/moduleList.json', function (err, response, body) {
		if (!err && response.statusCode == 200) {
			res.end(body);
		}
	});
}
