'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
	OpenIDStrategy = require('passport-openid').Strategy,
	config = require('../config'),
    server = require('../server'),
    users = require('../../app/controllers/users.server.controller');
  
module.exports = function() {
    passport.use(new OpenIDStrategy({
            providerURL: 'https://openid.nus.edu.sg/',
            returnURL: 'http://' + server.host + '/auth/openid/return',
            realm: 'http://' + server.host + '/',
            profile: true
        },
    
        function(identifier, profile, done) {
            profile.id = identifier.split('/').pop();
            console.log(profile);
            done(null, profile);
        }
    ));
};