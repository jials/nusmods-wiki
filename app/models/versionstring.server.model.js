'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * version string Schema
 */
var VersionStringSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	author:{
		type: String,
		required: 'author cannot be blank' 
	},
	content: {
		type: String,
	},
});

mongoose.model('VersionString', VersionStringSchema);
