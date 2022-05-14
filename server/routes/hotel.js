const express = require('express')
import { allHotels,sellerHotels ,remove} from '../controllers/hotel';
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
//Deleting an hotel ends here 


// Get single hotel starts here
router.get('/hotel/:hotelId', async(req,res)=>{
    let hotel =await Hotel.findById(req.params.hotelId).exec();
    res.json(hotel);

})
// Get single hotel starts here

// hotel edit starts here
router.put('/hotel/edit/:hotelId',auth,hotelOwner, async(req,res)=>{
  try {
    let hotel =await Hotel.findById(req.params.hotelId).exec();
    if (!hotel) {
      res.status(404).json("hotel not found");
    }
     // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < hotel.images.length; i++) {
      await cloudinary.uploader.destroy(hotel.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i], {
        folder: "",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    hotel,
  });
  } catch (error) {
    
  }
})


module.exports = router;