// import express from 'express';

var routes = function(passport, mongoose) {
  var express = require('express');
  var router = express.Router();

  router.get('/auth/github', passport.authenticate('github'));
  router.get('/auth/callback/github',
    passport.authenticate('github', { failureRedirect: '/' }), function(req, res) {
    console.log("********************* auth", req.user, "*******************************");
    res.redirect('/');
  });
  router.get('/auth/logout', function(req, res, next) {
    req.logout();
    res.redirect("/");
  });

  /* GET home page. */
  router.get('/', (req, res, next) => {
    console.log("root ******",req.user);
    res.render('index', { thisUserData: req.user });
  });

  return router;
}
module.exports = routes;
