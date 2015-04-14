'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 *version Faculty Schema
 *stores a version of a list of faculty members
 */
var VersionFacultySchema = new Schema({
	version: {
		type: Number, default: 0,
		required: 'version number cannot be blank'
	},
	author: {
		type: String,
		required: 'author cannot be blank' 
	},
	faculties: {
		type: [Schema.ObjectId],
		ref: 'Faculty'	
	}
	
});
		
mongoose.model('VersionFaculty', VersionFacultySchema);