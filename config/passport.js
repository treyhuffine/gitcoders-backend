var GithubStrategy  = require('passport-github').Strategy;

// load up the user model
var User = require('../models/user');

// load the auth variables
var configAuth = require('./auth');

module.exports = function(passport) {

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    console.log(user);
    done(null, user.id);
  });
  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
  // passport.deserializeUser(function(user, done) {
  //   done(null, user);
  // });

  // =========================================================================
  // TWITTER =================================================================
  // =========================================================================
  passport.use(new GithubStrategy({
      clientID        : configAuth.githubAuth.clientID,
      clientSecret    : configAuth.githubAuth.clientSecret,
      callbackURL     : configAuth.githubAuth.callbackURL
    },
    function(token, tokenSecret, profile, done) {
      // make the code asynchronous
      process.nextTick(function() {
        User.findOne({ githubID : profile._json.id }, function(err, user) {

          // if there is an error, stop everything and return that
          // ie an error connecting to the database
          if (err)
            return done(err);

          // if the user is found then log them in
          if (user) {
            return done(null, user); // user found, return that user
          } else {
            // if there is no user, create them
            var newUser = new User();
            newUser.githubID = profile._json.id;
            newUser.githubData = profile._json;

            // set all of the user data that we need

            // newUser = profile;
            console.log("%%%%%%%%%%% new user", newUser);

            // var fullSizeImage = profile._json.profile_image_url.replace('_normal', '');

            // newUser.twitter.id              = profile.id;
            // newUser.twitter.token           = token;
            // newUser.twitter.tokenSecret     = tokenSecret;
            // newUser.twitter.username        = profile.username;
            // newUser.twitter.displayName     = profile.displayName;
            // newUser.twitter.profileImageUrl = fullSizeImage;
            // newUser.twitter.location        = (profile._json.profile_location && profile._json.profile_location.name);

            // save our user into the database
            newUser.save(function(err) {
              if (err)
                throw err;
              return done(null, newUser);
            });
          }
        });
      });

  }));

};
