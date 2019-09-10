'use strict';

// User model goes here
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  user:{
    type: String,
    required: true,
    trim:true,
    unique:true,
    minlength:true
  },
  passwordHash:{
    type:String,
    required:true
  }
});

module.exports= mongoose.model('User', schema);