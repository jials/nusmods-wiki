'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Article = mongoose.model('Article'),
	agent = request.agent(app),
	Faculty = mongoose.model('Faculty'),
	Project = mongoose.model('Project');


/**
 * Globals
 */
var credentials, user, article, pastLecturer1, pastLecturer2, project;

/**
 * Article routes tests
 */
describe('Article CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});


		pastLecturer1 = new Faculty({
			name: 'john',
			academicYear: '2014'
		});

		pastLecturer2 = new Faculty({
			name: 'cow',
			academicYear: '2014'
		});

		project = new Project({
			name: 'project',
			academicYear: '2014'
		});

		user.save(function() {
			article = new Article({
				moduleCode: 'CP3101B',
				pastLecturer: [pastLecturer1, pastLecturer2],
				// pastTA: pastTA,
				funFacts: 'haha',
				others: 'w/e',
				project: project
			});

			done();
		});
	});

	// it('should be able to save an article if logged in', function(done) {
	// 	agent.post('/auth/signin')
	// 		.send(credentials)
	// 		.expect(200)
	// 		.end(function(signinErr, signinRes) {
	// 			// Handle signin error
	// 			if (signinErr) done(signinErr);

	// 			// Get the userId
	// 			var userId = user.id;

	// 			// Save a new article
	// 			agent.post('/articles')
	// 				.send(article)
	// 				.expect(200)
	// 				.end(function(articleSaveErr, articleSaveRes) {
	// 					// Handle article save error
	// 					if (articleSaveErr) done(articleSaveErr);

	// 					// Get a list of articles
	// 					agent.get('/articles')
	// 						.end(function(articlesGetErr, articlesGetRes) {
	// 							// Handle article save error
	// 							if (articlesGetErr) done(articlesGetErr);

	// 							// Get articles list
	// 							var articles = articlesGetRes.body;

	// 							// Set assertions
	// 							(articles[0].user._id).should.equal(userId);
	// 							(articles[0].title).should.match('Article Title');

	// 							// Call the assertion callback
	// 							done();
	// 						});
	// 				});
	// 		});
	// });

	it('should not be able to save an article if not logged in', function(done) {
		agent.put('/' + article.moduleCode)
			.send(article)
			.expect(401)
			.end(function(articleSaveErr, articleSaveRes) {
				// Call the assertion callback
				done(articleSaveErr);
			});
	});

	// it('should not be able to save an article if no title is provided', function(done) {
	// 	// Invalidate title field
	// 	article.title = '';

	// 	agent.post('/auth/signin')
	// 		.send(credentials)
	// 		.expect(200)
	// 		.end(function(signinErr, signinRes) {
	// 			// Handle signin error
	// 			if (signinErr) done(signinErr);

	// 			// Get the userId
	// 			var userId = user.id;

	// 			// Save a new article
	// 			agent.post('/articles')
	// 				.send(article)
	// 				.expect(400)
	// 				.end(function(articleSaveErr, articleSaveRes) {
	// 					// Set message assertion
	// 					(articleSaveRes.body.message).should.match('Title cannot be blank');

	// 					// Handle article save error
	// 					done(articleSaveErr);
	// 				});
	// 		});
	// });

	// it('should be able to update an article if signed in', function(done) {
	// 	agent.post('/auth/signin')
	// 		.send(credentials)
	// 		.expect(200)
	// 		.end(function(signinErr, signinRes) {
	// 			// Handle signin error
	// 			if (signinErr) done(signinErr);

	// 			// Get the userId
	// 			var userId = user.id;

	// 			// Save a new article
	// 			agent.post('/articles')
	// 				.send(article)
	// 				.expect(200)
	// 				.end(function(articleSaveErr, articleSaveRes) {
	// 					// Handle article save error
	// 					if (articleSaveErr) done(articleSaveErr);

	// 					// Update article title
	// 					article.title = 'WHY YOU GOTTA BE SO MEAN?';

	// 					// Update an existing article
	// 					agent.put('/articles/' + articleSaveRes.body._id)
	// 						.send(article)
	// 						.expect(200)
	// 						.end(function(articleUpdateErr, articleUpdateRes) {
	// 							// Handle article update error
	// 							if (articleUpdateErr) done(articleUpdateErr);

	// 							// Set assertions
	// 							(articleUpdateRes.body._id).should.equal(articleSaveRes.body._id);
	// 							(articleUpdateRes.body.title).should.match('WHY YOU GOTTA BE SO MEAN?');

	// 							// Call the assertion callback
	// 							done();
	// 						});
	// 				});
	// 		});
	// });

	// it('should be able to get a list of articles if not signed in', function(done) {
	// 	// Create new article model instance
	// 	var articleObj = new Article(article);

	// 	// Save the article
	// 	articleObj.save(function() {
	// 		// Request articles
	// 		request(app).get('/articles')
	// 			.end(function(req, res) {
	// 				// Set assertion
	// 				res.body.should.be.an.Array.with.lengthOf(1);

	// 				// Call the assertion callback
	// 				done();
	// 			});

	// 	});
	// });


	it('should be able to get a single article if not signed in', function(done) {
		// Create new article model instance
		var articleObj = new Article(article);
	
		// Save the article
		articleObj.save(function() {
			request(app).get('/' + articleObj.moduleCode)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('moduleCode', article.moduleCode);
					res.body.should.be.an.Object.with.property('funFacts', article.funFacts);
					// Call the assertion callback
					done();
				});
		});
	});

	it('should return proper error for single article which doesnt exist, if not signed in', function(done) {
		request(app).get('/articles/test')
			.end(function(req, res) {
				// Set assertion
				res.body.should.be.an.Object.with.property('message', 'Article is invalid');

				// Call the assertion callback
				done();
			});
	});

	it('should be able to delete an article if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new article
				agent.post('/articles')
					.send(article)
					.expect(200)
					.end(function(articleSaveErr, articleSaveRes) {
						// Handle article save error
						if (articleSaveErr) done(articleSaveErr);

						// Delete an existing article
						agent.delete('/articles/' + articleSaveRes.body._id)
							.send(article)
							.expect(200)
							.end(function(articleDeleteErr, articleDeleteRes) {
								// Handle article error error
								if (articleDeleteErr) done(articleDeleteErr);

								// Set assertions
								(articleDeleteRes.body._id).should.equal(articleSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete an article if not signed in', function(done) {
		// Set article user
		article.user = user;

		// Create new article model instance
		var articleObj = new Article(article);

		// Save the article
		articleObj.save(function() {
			// Try deleting article
			request(app).delete('/articles/' + articleObj._id)
			.expect(401)
			.end(function(articleDeleteErr, articleDeleteRes) {
				// Set message assertion
				(articleDeleteRes.body.message).should.match('User is not logged in');

				// Handle article error error
				done(articleDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function() {
			Article.remove().exec(done);
		});
	});
});
