'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Project Schema
 */
var ProjectSchema = new Schema({
	name: {
		type: String,
		required: 'Name cannot be blank'
	},

	academicYear1: {
		type: String,
	},

	academicYear2: {
		type: String,
	},

	photo: {
		type: [String],
		default: 'img/user.png' //to be changed to default logo address
	},

	video: {
		type: String,
	}
});

mongoose.model('Project', ProjectSchema);