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
        returnURL: 'http://localhost:3000/',
        realm: 'http://localhost:3000/',
        stateless: true,
        profile: true
    },
    function(identifier, profile, done) {
        profile.id = identifier.split('/').pop();
        done(null, profile);
        console.log('\n\n\n\n'+identifier+'\n\n\n');
    }
));
};