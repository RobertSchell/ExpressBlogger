// var express = require('express');
// var router = express.Router();

// const Blog = require('./model/Blogs');

// /* GET home page. */
// router.get('/', async function(req, res) {

//   try {
//     const allBlogs = await Blog.find({});
//     res.json({ blogs: allBlogs });
// }catch(e) {
//   console.log(e);
// }
// });


// module.exports = router;

var express = require('express');
var router = express.Router();

//import models
const Blog = require('../models/Blogs');

/* GET home page. */
router.get('/', async function(req, res) {

  //query blogs 
  try {
    const allBlogs = await Blog.find({});
    res.json({ blogs: allBlogs });
  }catch(e){
    console.log(e);
  }
});


module.exports = router;
