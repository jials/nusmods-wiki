'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 *version outstanding projects Schema
 *stores a version of a list of outstanding projects
 */
var VersionProjectsSchema = new Schema({
	version: {
		type: Number, default: 0,
		required: 'version number cannot be blank'
	},
	author:{
		type: String,
		required: 'author cannot be blank' 
	},
	outstanding: {
		type: [Schema.ObjectId],
		ref: 'Project'	
	}
	
});
		
mongoose.model('VersionProject', VersionProjectsSchema);