'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Faculty Schema
 */
var FacultySchema = new Schema({
	name: {
		type: String,
		required: 'Name cannot be blank'
	},

	academicYear: {
		type: String,
		required: 'academic year cannot be blank'
	},

	photo: {
		type: String,
		default: 'img/user.png' //to be changed to default logo address
	}
});

mongoose.model('Faculty', FacultySchema);