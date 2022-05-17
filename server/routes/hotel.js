const express = require('express')
import { allHotels,sellerHotels } from '../controllers/hotel';
import { hotelOwner } from '../middleware';
import auth from '../middleware/auth';
const cloudinary = require('../utils/cloudinary')
const Hotel=  require('../models/hotel');
const multer = require('multer');
const router = express.Router();
import fs from 'fs'

//define storage for the images

const storage = multer.diskStorage({
  //destination for files
  destination: function (req, file, callback) {
    callback(null, './uploads');
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

router.post('/create-hotel',auth, upload.array('images'),async(req,res)=>{
    try {
        // console.log(req.files);
        // upload image to cloudinary
        const urls = [] ;
        if(req.method === 'POST'){
            const files = req.files;
            for (let file = 0; file<files.length;file++){
                const {path} = files[file]
                // console.log(path);
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
        let hotel = new Hotel({
            title:req.body.title,
              content:req.body.content,
              price:req.body.price,
              location:req.body.location,
              bed:req.body.bed,
              from:req.body.from,
              to:req.body.to,
              images:urls
          })
        
            hotel.postedBy = req.user.id;
        
            hotel.save((err,result)=>{
              if(err){
                console.log("saving hotel error",err);
                res.status(404).send("Error saving")
              }
              res.json({
                massage:"Room successfully created",
              dta:result})
            })
        console.log(hotel);    
    } catch (error) {
        console.log("ERROR",error);
        res.json({message:error})
    }

});
router.get('/hotels',allHotels);
// router.get('/hotel/:hotelId',read);

router.get('/hotel/seller-hotels',auth,sellerHotels);

//Deleting an hotel starts here 
router.delete('/delete-hotel/:hotelId',auth,hotelOwner,async(req,res)=>{
  let hotel = await Hotel.findById(req.params.hotelId).exec();
  // Deleting Images From Cloudinary
  for (let i = 0; i < hotel.images.length; i++) {
    await cloudinary.uploader.destroy(hotel.images[i].public_id);
  }
  await hotel.remove()
  console.log("Hotel deleted!");
  res.status(200).json(hotel)
});

// Get single hotel starts here
router.get('/hotel/:hotelId', async(req,res)=>{
    let hotel =await Hotel.findById(req.params.hotelId).populate("postedBy", '_id name').exec();
    res.json(hotel);

})
// Get single hotel starts here

// hotel edit starts here
router.put('/hotel/edit/:hotelId',auth,hotelOwner,upload.array('images'), async(req,res)=>{
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
      title:req.body.title || hotel.title,
      content:req.body.content || hotel.content,
      price:req.body.price || hotel.price,
      location:req.body.location || hotel.location,
      bed:req.body.bed|| hotel.bed,
      from:req.body.from|| hotel.from,
      to:req.body.to|| hotel.to,
      images: hotel.images,
  }
}
else{
  data = {
    title:req.body.title || hotel.title,
    content:req.body.content || hotel.content,
    price:req.body.price || hotel.price,
    location:req.body.location || hotel.location,
    bed:req.body.bed|| hotel.bed,
    from:req.body.from|| hotel.from,
    to:req.body.to|| hotel.to,
    images: urls,
}
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