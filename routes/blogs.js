const { v4: uuidv4 } = require("uuid");
var express = require("express");
var router = express.Router();

const blogsController = require('../controllers/blogsController');

// CRUD routes (create = POST, read = GET, update = UPDATE, delete = DELETE)
router.get('/all',blogsController.getAllBlogs);
router.get('/single/:_id',blogsController.getBlogById);
router.post('/create-one', blogsController.createOneBlog);
router.delete('/delete/:_id', blogsController.deleteBlogById);
router.get('/all/single', blogsController.getOneBlog);
router.put('/update-one/:title', blogsController.updateOneBlog);

 module.exports = router;