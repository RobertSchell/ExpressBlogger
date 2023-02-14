const { v4: uuidv4 } = require("uuid");
const express = require('express');
const router = express.Router();
//const { validateBlogData } = require("../validation/blogs");
//const blogList = [];

//instantiate mongodb 
const { db } = require('../mongo');

//GET blogs listing (return ALL blogs listings)
router.get('/', async function(req, res, next) {
  const blogs = await db()
  .collection('sample_blogs')
  .find({})
  .toArray(function(err, result){
      if (err) {
        res.status(400).send("error fetching blogs")
      } else {
        res.json(result);
      }
    }); 

    res.json({
      sucess:true,
      blogs: blogs
    });
  });


//GET all blogs (limited to 5) could comment out line 33 to GET ALL using this route))
router.get('/all', async function(req, res, next) {
  const blogs = await db()
  .collection('sample_blogs')
  .find({})
  .limit(5)
  .toArray(function(err, result){
      if (err) {
        res.status(400).send("error fetching blogs")
      } else {
        res.json(result);
      }
    }); 

    res.json({
      sucess:true,
      blogs: blogs
    });
  });

//GET single blog
router.get('/all/single', async function(req, res, next) {
  const blogs = await db()
  .collection('sample_blogs')
  .find({})
  .limit(1)
  .toArray(function(err, result){
      if (err) {
        res.status(400).send("error fetching blogs")
      } else {
        res.json(result);
      }
    }); 

    res.json({
      sucess:true,
      blogs: blogs
    });
  });

// //GET single blog by title
// router.get("/single/:title", (req, res)=>{
//   const foundBlog = blogs.find((blog)=>{
//       return blog.title === req.params.title
//   })
//   res.json({
//       success: true,
//       foundBlog: foundBlog
//   })
// });

router.get('/single/:_id', async function(req, res, next) {
  const blogs = await db()
  .collection('sample_blogs')
  .find({id: req.params._id})
  .toArray(function(err, result){
      if (err) {
        res.status(400).send("error fetching blogs")
      } else {
        res.json(result);
      }
    }); 

    res.json({
      sucess:true,
      blogs: blogs
    });
  });


// DELETE single blog
// router.delete("/delete/:title", (req, res)=>{
//   const titleToDelete = req.params.title
//   const indexOfTitle = blogs.findIndex((blog)=>{
//       return blog.title === titleToDelete
//   })
//   blogs.splice(indexOfTitle, 1)
//   res.json({
//       success: true
//   })
// });

// router.delete('/delete/:_id', async function(req, res, next) {
//   const blogs = await db()
//   .collection('sample_blogs')
//   .find({id: req.params._id})
//   .deleteOne({id: req.params._id})
//   if (result.deletedCount === 1) {
//     console.log("Successfully deleted one document.");
//   } else {
//     console.log("No documents matched the query. Deleted 0 documents.");
//   }
//   // .toArray(function(err, result){
//   //     if (err) {
//   //       res.status(400).send("error fetching blogs")
//   //     } else {
//   //       res.json(result);
//   //     }
//   //   }); 

//     res.json({
//       sucess:true,
//       blogs: blogs
//     });
//   });


//POST new blog
// router.post("/create-one", async function (req, res) {
// //  try block, for validation code
//   try {
//     // anticipate fields of our post request /create-one
//     // parse out request data to local variables
//     const title = req.body.title;
//     const text = req.body.text;
//     const author = req.body.author;
//     const category = req.body.category;

//     //create blogData object fields
//     const blogData = {
//       title,
//       text,
//       author,
//       category,
//       createdAt: new Date(),
//       lastModified: new Date(),
//     };
//     //pass blog data object to our validate function
//     const blogDataCheck = validateBlogData(blogData);

//     if (blogDataCheck.isValid === false) {
// 			throw Error(blogDataCheck.message)
//     }

//     blogs.push(blogData);
//     console.log (blogDataCheck);
//     console.log("blogList ", blogs);

//     res.json({
//       success: true,
//     });
//   } catch (error) {
// 		// In the catch block, we always want to do 2 things: console.log the error and respond with an error object
//     console.log(error);
//     res.json({
// 			success: false,
// 			error: String(error)
// 		});
//   }
// });

router.post('/create-one', async function (req, res, next) {
  const blogs = await db()
  .collection('sample_blogs')
  .insertOne({
    id: uuidv4(),
    title: req.body.title,
    text: req.body.text,
    author: req.body.author,
    category: req.body.category,
    createdAt: new Date(),
    lastModified: new Date(),
  })
  res.json({
    success: true,
    blogs: blogs
  });
});

//POST with validation for email field
// router.post('/create-one', async function (req, res, next) {
//   try {
//     const newBlog = {
//       id: uuidv4(),
//       title: req.body.title,
//       text: req.body.text,
//       author: req.body.author,
//       email: req.body.email,
//       category: req.body.category,
//       createdAt: new Date(),
//       lastModified: new Date(),
//     };

//     if (newBlog.email === undefined || !newBlog.email.split('@').length > 1) {

//       res.json({
//         success: false,
//         message: "email invalid",
//     });
//   }
//     const insertOpRes = await db().collection('blogs').insertOne(newBlog);

//     res.json({
//       success: true,
//       newPost,
//     });
//   } catch (e) {
//     console.log(typeof e);
//     console.log(e);
//     res.json({
//     error: e.toString(),
//     });
//   }
// });


//Update single blog
// router.put("/update-one/:title", (req, res)=>{
//   const titleToUpdate = req.params.title
//   const originalTitle = blogs.find((blog)=>{
//       return blog.title === titleToUpdate
//   })
//   const originalTitleIndex = blogs.findIndex((blog)=>{
//       return blog.title === titleToUpdate
//   })

//   if (!originalTitle) {
//       res.json({
//           success: false,
//           message: "Could not find title in blogs"
//       })
//       return
//   }

//   const updatedTitle = {}

//   if (req.body.title !== undefined){
//       updatedTitle.title = req.body.title
//   } else {
//       updatedTitle.title = originalTitle.title
//   }

//   if (req.body.text !== undefined){
//       updatedTitle.text = req.body.text
//   } else {
//       updatedTitle.text = originalTitle.text
//   }

//   if (req.body.author !== undefined){
//       updatedTitle.author = req.body.author
//   } else {
//       updatedTitle.author = originalTitle.author
//   }

//   if (req.body.category !== undefined){
//     updatedTitle.category = req.body.category
// } else {
//     updatedTitle.category = originalTitle.category
// }

//   blogs[originalTitleIndex] = updatedTitle

//   res.json({
//       success: true
//   })
// })


router.get('/get-multi', async function(req, res, next) {
  // console.log(req.params.opt1)
  const blogs = await db()
  .collection('sample_blogs')
  .find({title: { $in: [req.query.opt1,req.query.opt2,req.query.opt3]}})
  .sort(
    {title: 1, blogs: 1}
  )
  .toArray()
    res.json({
      success:true,
      blogs: blogs
    });
});


router.delete('/delete-multi', async function(req, res, next) {
  const idsToDelete = req.body
  
  const deleteResult = await db().collection('sample_blogs').deleteMany({
    id: {
      $in: idsToDelete
    }
  })

  res.json({
    sucess:true,
    deleteResult: deleteResult
  });
});

module.exports = router;