'use strict';

const {Router} = require('express');
const router= Router();
const User= require('./../models/user');
const bcrypt=require('bcrypt');



router.get('/sign-up',(req,res,next)=>{
  res.render('sign-up');
});

router.post('/sign-up',(req,res,next)=>{
  const username=req.body.username;
  const password=req.body.password;

  bcrypt.hash(password,10)
    .then(hash=>{
      return User.create({
        username,
        passwordHash:hash
      });
    })
    .then(user=>{
      req.session.user = {
        _id: user._id
      };
      res.redirect('/private');
    })
    .catch(error=>{
      console.log('There was an error in the sign up process.',error);
      res.redirect('/authentication/sign-up');
    });
});

router.get('/sign-in',(req,res,next)=>{
  res.render('sign-in');
});

router.post('/sign-in',(req,res,next)=>{
  const username=req.body.username;
  const password=req.body.password;

  let auxiliary;

  User.findOne({username})
    .then(user=>{
      if (!user) {
        throw new Error('USER_NOT_FOUND');
      } else {
        auxiliary = user;
        return bcrypt.compare(password, user.passwordHash);
      }
    })
    .then(matches => {
      if (!matches) {
        throw new Error ('PASSWORD_DOESNT_MATCH');
      } else {
        req.session.user = {
          _id : auxiliary._id
        };
        res.redirect('private');
      }
    })
    .catch(error=>{
      console.log('There was an error in the sign in process.',error);
      res.redirect('/authentication/sign-in');
    });
});

router.post('/sign-out', (req, res, next)=>{
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
