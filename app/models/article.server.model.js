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
	moduleCode: {
		type: String,
		default: '',
		trim: true,
		required: 'Module Code cannot be blank'
	},
	pastLecturer: [{
		type: Schema.Types.ObjectId,
		ref: 'VersionFaculty'
	}],
	// pastTA: {
	// 	type: [Schema.ObjectId],
	// 	ref: 'VersionFaculty'
	// },
	funFacts: [{
		type: Schema.Types.ObjectId,
		ref: 'VersionString'
	}],
	outstandingProj: [{
		type: Schema.Types.ObjectId,
		ref: 'VersionProject'
	}],
	others: [{
		type: Schema.Types.ObjectId,
		ref: 'VersionString'
	}],
	facebook: [{
		type: Schema.Types.ObjectId,
		ref: 'VersionString'
	}],
	homePage: [{
		type: Schema.Types.ObjectId,
		ref: 'VersionString'
	}],
	logo: [{
		type: Schema.Types.ObjectId,
		ref: 'VersionString'
	}]
});

mongoose.model('Article', ArticleSchema);
