'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
	OpenIDStrategy = require('passport-openid').Strategy,
	config = require('../config'),
    users = require('../../app/controllers/users.server.controller');
  
module.exports = function() {
    passport.use(new OpenIDStrategy({
            providerURL: 'https://openid.nus.edu.sg/',
            returnURL: 'http://localhost:3000/auth/openid/return',
            realm: 'http://localhost:3000/',
            profile: true
        },
    
        function(identifier, profile, done) {
            profile.id = identifier.split('/').pop();
            console.log(profile);
            done(null, profile);
        }
    ));
};