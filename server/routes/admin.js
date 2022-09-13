const express = require("express");
import {
  allUsers,
} from "../controllers/admin";
const Hotel = require("../models/hotel");
import authAdmin from "../middleware/authAdmin";
import auth from "../middleware/auth";
const cloudinary = require("../utils/cloudinary");
const Blog = require("../models/blog");
const multer = require("multer");
const router = express.Router();
import fs from "fs";

//define storage for the images

const storage = multer.diskStorage({
  //destination for files
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },

  //add back the extension
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

//upload parameters for multer
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 3,
  },
});

// controllers

// router.post(
//   "/create-blog",
//   auth, authAdmin,
//   upload.array("images"),
//   async (req, res) => {
//     try {
//       const urls = [];
//       if (req.method === "POST") {
//         const files = req.files;
//         for (let file = 0; file < files.length; file++) {
//           const { path } = files[file];
//           const newPath = await cloudinary.uploader.upload(path, {
//             folder: "YodoorR",
//           });
//           urls.push({
//             public_id: newPath.public_id,
//             url: newPath.secure_url,
//           });
//           fs.unlinkSync(path);
//         }
//       }
//       let blog = new Blog({
//         title: req.body.title,
//         content: req.body.content,
//         location: req.body.location,
//         images: urls,
//       });

//       blog.save((err, result) => {
//         if (err) {
//           console.log("saving blog error", err);
//           res.status(404).send("Error saving");
//         }
//         res.json({
//           massage: "blog successfully created",
//           dta: result,
//         });
//       });
//       console.log(blog);
//     } catch (error) {
//       console.log("ERROR", error);
//       res.json({ message: error });
//     }
//   }
// );
router.get("/all-users",auth, authAdmin,allUsers);

// //Deleting an hotel starts here
// router.delete("/delete-blog/:blogId", async (req, res) => {
//     const { _id: blogId } = req.params;
//   let blog = await Blog.findById(req.params.blogId).exec();
//   // Deleting Images From Cloudinary
//   for (let i = 0; i < blog.images.length; i++) {
//     await cloudinary.uploader.destroy(blog.images[i].public_id);
//   }
//   await blog.remove();
//   console.log("blog deleted!");
//   res.status(200).json("blog deleted!");
// });

// // Get single hotel starts here
// router.get("/blog/:blogId", async (req, res) => {
//   let blog = await Blog.findById(req.params.blogId)
//     .populate("postedBy", "_id name")
//     .exec();
//   res.json(blog);
// });
// // Get single hotel starts here

// // hotel edit starts here
// router.put(
//   "/blog/edit/:blogId",
//   authAdmin,
//   upload.array("images"),
//   async (req, res) => {
//     try {
//       // Deleting Images From Cloudinary
//       let blog = await Blog.findById(req.params.blogId).exec();
//       let files = req.files;

//       for (let i = 0; i < blog.images.length; i++) {
//         await cloudinary.uploader.destroy(blog.images[i].public_id);
//         console.log("blog with ", blog.images[i].public_id, "was deleted");
//       }
//       const urls = [];
//       if (files) {
//         for (let file = 0; file < files.length; file++) {
//           const { path } = files[file];
//           const newPath = await cloudinary.uploader.upload(path, {
//             folder: "YodoorR",
//           });
//           urls.push({
//             public_id: newPath.public_id,
//             url: newPath.secure_url,
//           });
//           fs.unlinkSync(path);
//         }
//       }
//       req.body.images = urls;
//       let data;
//       if (urls.length === 0) {
//         data = {
//           title: req.body.title || blog.title,
//           content: req.body.content || blog.content,
//           location: req.body.location || blog.location,
//           images: blog.images,
//         };
//       } else {
//         data = {
//           title: req.body.title || blog.title,
//           content: req.body.content || blog.content,
//           location: req.body.location || blog.location,
//           images: urls,
//         };
//       }
//       // console.log(data);
//       blog = await Blog.findByIdAndUpdate(req.params.blogId, data, {
//         new: true,
//         runValidators: true,
//         useFindAndModify: false,
//       });

//       res.status(200).json({
//         success: true,
//         blog,
//       });
//     } catch (error) {}
//   }
// );

// hotel edit starts here
router.put('/admin/edit/hotel/:hotelId',auth,authAdmin,upload.array('images'), async(req,res)=>{
  try {
    // Deleting Images From Cloudinary
    let hotel =await Hotel.findById(req.params.hotelId).exec();
    let files = req.files;
   

    for (let i = 0; i < hotel.images.length; i++){
      await cloudinary.uploader.destroy(hotel.images[i].public_id);
      console.log("hotel whit ",hotel.images[i].public_id,"was deleted");
    }
    const urls = [];
    if(files){
      for (let file = 0; file<files.length;file++){
        const {path} = files[file]
        const newPath = await cloudinary.uploader.upload(path, {
          folder: "YodoorR",});
        urls.push(
          {
            public_id: newPath.public_id,
            url: newPath.secure_url,
          }
        )
         fs.unlinkSync(path)
    }
  }
  req.body.images = urls;
  let data
  if(urls.length === 0){
     data = {
       title: req.body.title || hotel.title,
       content: req.body.content || hotel.content,
       price: req.body.price || hotel.price,
       location: req.body.location || hotel.location,
       bed: req.body.bed || hotel.bed,
       from: req.body.from || hotel.from,
       to: req.body.to || hotel.to,
       images: hotel.images,
       verified: req.body.verified || hotel.verified,
     };
}
else{
  data = {
    title: req.body.title || hotel.title,
    content: req.body.content || hotel.content,
    price: req.body.price || hotel.price,
    location: req.body.location || hotel.location,
    bed: req.body.bed || hotel.bed,
    from: req.body.from || hotel.from,
    to: req.body.to || hotel.to,
    verified: req.body.verified || hotel.verified,
    images: urls,
  };
}
  // console.log(data);
  hotel = await Hotel.findByIdAndUpdate(req.params.hotelId,data,{
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })

  res.status(200).json({
    success: true,
    hotel,
  });
  } catch (error) {
    
  }
})
module.exports = router;
