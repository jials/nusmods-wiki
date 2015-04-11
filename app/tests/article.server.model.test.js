'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Article = mongoose.model('Article'),
	Faculty = mongoose.model('Faculty'),
	Project = mongoose.model('Project');

/**
 * Globals
 */
var user, article, pastLecturer1, pastLecturer2, pastTA, project;

/**
 * Unit tests
 */
describe('Article Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		pastLecturer1 = new Faculty({
			name: 'john',
			academicYear: '2014'
		});

		pastLecturer2 = new Faculty({
			name: 'ali',
			academicYear: '2014'
		});

		pastTA = new Faculty({
			name: 'cow',
			academicYear: '2014'
		});

		project = new Project({
			name: 'project',
			academicYear: '2014'
		});

		user.save(function() {
			article = new Article({
				moduleCode: 'Article Title',
				pastLecturer: [pastLecturer1, pastLecturer2],
				pastTA: pastTA,
				funFacts: 'haha',
				others: 'w/e',
				project: project
			});

			article.pastLecturer.push(pastLecturer2);
			
			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return article.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without title', function(done) {
			article.title = '';

			return article.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) {
		Article.remove().exec(function() {
			User.remove().exec(done);
		});
	});
});
