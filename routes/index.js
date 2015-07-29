import express from 'express';
var router = express.Router();

var routes = function(passport, mongoose) {
  router.use('/auth/github', passport.authenticate('github'));
  router.use('/auth/github/callback/',
    passport.authenticate('github', { failureRedirect: '/' }), function(req, res) {
    console.log("in");
    res.redirect('/');
  });
  router.get('/auth/logout', function(req, res, next) {
    req.logout();
    res.redirect("/");
  });

  /* GET home page. */
  router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
  });

  return router;
}
module.exports = routes;
