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
	created: {
		type: Date,
		default: Date.now
	},
	author: {
		type: String,
		required: 'author cannot be blank' 
	},
	faculties: [{
		type: Schema.Types.ObjectId,
		ref: 'Faculty'	
	}]
	
});
		
mongoose.model('VersionFaculty', VersionFacultySchema);