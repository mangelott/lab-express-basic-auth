'use strict';

const { Router } = require('express');
const router = Router();

const routeGuardMiddleware = (req, res, next) => {
  if (!req.session.user) {
    res.redirect('/authentication/sign-in');
  } else {
    next();
  }
};

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Welcome to Authentication Lab' });
});

router.get('/private', routeGuardMiddleware, (req, res, next)=>{
  res.render('private');
});

router.get('/main', routeGuardMiddleware, (req, res, next)=>{
  res.render('main');
});

module.exports = router;
