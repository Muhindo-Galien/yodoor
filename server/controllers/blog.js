const Blog=  require('../models/blog');
import fs from 'fs'

export const allBlogs = async(req,res)=>{
  // console.log("hello");
  // from:{$gte: new Date()}
  let allBlogs = await Blog.find({})
    .sort({ _id: -1 })
    .exec();
 
  res.json(allBlogs);
}


