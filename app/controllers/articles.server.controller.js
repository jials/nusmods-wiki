'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Article = mongoose.model('Article'),
	Faculty = mongoose.model('Faculty'),
	Project = mongoose.model('Project'),
	VersionFaculty = mongoose.model('VersionFaculty'),
	VersionProject = mongoose.model('VersionProject'),
	VersionString = mongoose.model('VersionString'),
	async = require('async'),
	_ = require('lodash');

/**
 * Create a article
 */
exports.create = function(req, res) {
	var article = new Article(req.body);

	article.user = req.user;

	article.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(article);
		}
	});
};

/**
 * Show the current article
 */
exports.read = function(req, res) {
	res.json(req.article);
};

/**
 * Update a article
 */
exports.update = function(req, res) {
	var article = req.article;
	var editor = req.body.editedBy;
	var objectType = req.body.type;
	var updated;
	switch(objectType) {
		case 'pastLecturer': 
			updated = new VersionFaculty({
				author: editor
			});

			for (var i = 0; i < req.body.pastLecturer.length; i++) {
				var lecturer = new Faculty(req.body.pastLecturer[i]);
				updated.faculties.push(lecturer);
				lecturer.save();
			}		
			updated.save();
			article.pastLecturer.push(updated);
			break;

		case 'outstandingProj': 
			updated = new VersionProject({
				author: editor
			});
			for (var i = 0; i < req.body.outstandingProj.length; i++) {
				var project = new Project(req.body.outstandingProj[i]);
				updated.projects.push(project);
				project.save();
			}
			updated.save();
			article.outstandingProj.push(updated);
			break;

		case 'funFacts':
			updated = new VersionString({
				author: editor,
				content: req.body.funFacts
			});
			
			updated.save();
			article.funFacts.push(updated);
			break;

		case 'others':
			updated = new VersionString({
				author: editor,
				content: req.body.others
			});
			
			updated.save();
			article.others.push(updated);
			break;

		case 'facebook':
			updated = new VersionString({
				author: editor,
				content: req.body.facebook
			});
			
			updated.save();
			article.facebook.push(updated);
			break;

		case 'homePage':
			updated = new VersionString({
				author: editor,
				content: req.body.homePage
			});
			
			updated.save();
			article.homePage.push(updated);
			break;

		case 'logo':
			updated = new VersionString({
				author: editor,
				content: req.body.logo
			});
			
			updated.save();
			article.logo.push(updated);
			break;

	}

	article.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(article);
		}
	});
};

/**
 * Delete an article
 */
exports.delete = function(req, res) {
	var article = req.article;

	article.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(article);
		}
	});
};

/**
 * List of Articles
 */
exports.list = function(req, res) {
	Article.find().sort('-created').populate('user', 'displayName').exec(function(err, articles) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(articles);
		}
	});
};

/**
 * Article middleware
 */
exports.articleByID = function(req, res, next, id) {
	Article
	.findOne({'moduleCode': id})
	.populate('pastLecturer outstandingProj funFacts others facebook homePage logo')
	// .populate({
	// 	path: 'pastTA',
	// 	match: {version : {$max}}
	// })
	.exec(function(err, article) {
		if (err) return next(err);
		if (!article) {
			article = new Article({
				moduleCode: id,
			});
			// return res.status(404).send({
			// 	message: 'Article not found'
			// });
		}

		async.waterfall([
			function(callback) {
				Faculty.populate(article, {'path': 'pastLecturer.faculties', 'model': 'Faculty'}, callback);
			},
			function(article, callback) {
				Project.populate(article, {'path': 'outstandingProj.projects', 'model': 'Project'}, callback);
			}
		], function(err, article) {
			if (err) return next(err);
			req.article = article;
			next();	
		});
	});
};

/**
 * Article authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.article.User.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};
