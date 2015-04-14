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
		ref: 'VersionFaculty'
	},
	// pastTA: {
	// 	type: [Schema.ObjectId],
	// 	ref: 'VersionFaculty'
	// },
	funFacts: {
		type: [Schema.ObjectId],
		ref: 'VersionString'
	},
	outstandingProj: {
		type: [Schema.ObjectId],
		ref: 'VersionProject'
	},
	others: {
		type: [Schema.ObjectId],
		ref: 'VersionString'
	},
	facebook: {
		type: [Schema.ObjectId],
		ref: 'VersionString'
	},
	homePage: {
		type: [Schema.ObjectId],
		ref: 'VersionString'
	},
	logo: {
		type: [Schema.ObjectId],
		ref: 'VersionString'
	}
});

mongoose.model('Article', ArticleSchema);
