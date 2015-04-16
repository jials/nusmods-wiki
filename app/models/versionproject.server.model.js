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
	created: {
		type: Date,
		default: Date.now
	},
	author:{
		type: String,
		required: 'author cannot be blank' 
	},
	projects: [{
		type: Schema.Types.ObjectId,
		ref: 'Project'	
	}]
	
});
		
mongoose.model('VersionProject', VersionProjectsSchema);