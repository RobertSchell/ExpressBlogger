const Blog = require('../models/Blogs');

//GET all blogs
async function getAllBlogs(req, res) {

    //query blogs 
    try {
      const allBlogs = await Blog.find({});
      res.json({blogs: allBlogs });
    }catch(e){
      console.log(e);
    }
};


//GET one blog
async function getOneBlog(req, res) {

    //query blogs
    try {
      const allBlogs = await Blog.findOne({})
      //.limit(1)
      res.json({blogs: allBlogs });
    }catch(e){
      console.log(e);
    }
};


//GET single blog by id
async function getBlogById(req, res) {

    //query blogs 
    try {
      const allBlogs = await Blog.find({id: req.params._id})
      res.json({blogs: allBlogs });
    }catch(e){
      console.log(e);
    }
  };


//DELETE single blog by id
async function deleteBlogById(req, res) {

    //query blogs 
    try {
      const allBlogs = await Blog.deleteOne({id: req.params._id})
      res.json({blogs: allBlogs });
    }catch(e){
      console.log(e);
    }
  };


//POST/Create one blog
async function createOneBlog(req, res, next) {
    try {
      //parse out fields from POST request
      const title  = req.body.title 
      const text = req.body.text 
      const author = req.body.author
      const categories = req.body.category
      const year =  req.body.year;
  
      //pass fields to new Blog model 
      //notice how it's way more organized and does the type checking for us
      const newBlog = new Blog({
          title,
          text,
          author,
          categories,
          year
      });
  
      //save our new entry to the database 
      const savedData =  await newBlog.save();
      
      //return the successful request to the user 
      res.json({
          success: true,
          blogs: savedData
      });
  
    } catch (e) {
      console.log(typeof e);
      console.log(e);
      res.json({
        error: e.toString(),
      });
    }
  };

//PUT update one blog by title
async function updateOneBlog(req, res) {
    if (!req.params.title) {
        res.json({
            success: false,
            message: "No title provided"
        });
        return;
    }

    try {
        const blogPosts = await Blog.findOneAndUpdate(
            {title: req.params.title},
            {
                $set: {
                    title: req.body.title,
                    text: req.body.text,
                    author: req.body.author,
                    categories: req.body.category,
                    year: req.body.year
                },
            },
            { new: true }
        );
        res.json({
            success: true,
            post: blogPosts
        });
    }catch (e) {
        console.log(e);
    }
}
module.exports = {
    getAllBlogs,
    createOneBlog,
    getBlogById,
    deleteBlogById,
    getOneBlog,
    updateOneBlog
};