'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Article Schema
 */
var ArticleSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	moduleCode: {
		type: String,
		default: '',
		trim: true,
		required: 'Module Code cannot be blank'
	},
	pastLecturer: {
		type: [Schema.ObjectId],
		ref: 'Faculty'
	},
	pastTA: {
		type: [Schema.ObjectId],
		ref: 'Faculty'
	},
	funFacts: {
		type: String,
		default: '',
		trim: true
	},
	outstandingProj: {
		type: [Schema.ObjectId],
		ref: 'Project'
	},
	others: {
		type: String,
		default: '',
		trim: true
	},
	facebook: {
		type: String,
		default: '',
		trim: true
	},
	homePage: {
		type: String,
		default: '',
		trim: true
	},
	logo: {
		type: String,
		default: 'img/module.png', //to be edited to contain stub
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Article', ArticleSchema);
