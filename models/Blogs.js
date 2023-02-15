//import mongoose library
const mongoose = require('mongoose');
const {v4: uuidv4} = require('uuid');

//create a vblogSchema
const blogSchema = new mongoose.Schema({
    title: String,
    text: String,
    author: String,
    year: Number,
    categories: [String],
    id: {type: String, default: uuidv4()},
    createdAt: {type: Date, default: Date.now}
});

const Blog = mongoose.model("sample_blogs", blogSchema);

module.exports = Blog;