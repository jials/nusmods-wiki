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

	academicYearStart: {
		type: String,
	},

	academicYearEnd: {
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