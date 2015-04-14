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

	version: {
		type: Number, default: 0,
		required: 'version number cannot be blank'
	},
	author:{
		type: String,
		required: 'author cannot be blank' 
	},
	funFacts: {
		type: String,
	},
});

mongoose.model('VersionString', VersionStringSchema);
