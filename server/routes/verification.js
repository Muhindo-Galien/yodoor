const express = require("express");
import { hotelOwner } from "../middleware";
import auth from "../middleware/auth";
const cloudinary = require("../utils/cloudinary");
import authAdmin from "../middleware/authAdmin";

const Hotel = require("../models/hotel");
const multer = require("multer");
const router = express.Router();
import fs from "fs";
import Verification from "../models/verification";

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

router.post(
  "/verify-hotel",
  auth,
  upload.array("filesis"),
  async (req, res) => {
    try {
      // console.log(req.files);
      // upload image to cloudinary
      const urls = [];
      if (req.method === "POST") {
        const files = req.files;
        for (let file = 0; file < files.length; file++) {
          const { path } = files[file];
          // console.log(path);
          const newPath = await cloudinary.uploader.upload(path, {
            folder: "YodoorR",
          });
          urls.push({
            public_id: newPath.public_id,
            url: newPath.secure_url,
          });
          fs.unlinkSync(path);
        }
      }
      let verifiedHotel = new Verification({
        images: urls,
      });
      verifiedHotel.roomManager = req.user.id;
      verifiedHotel.save((err, result) => {
        if (err) {
          console.log("Room verification error", err);
          res.status(404).send("Error saving");
        }
        res.json({
          massage: "Credentials successfully sent",
          dta: result,
        });
      });
      console.log("verifiedHotel");
      console.log(verifiedHotel);
    } catch (error) {
      console.log("ERROR", error);
      res.json({ message: error });
    }
  }
);

router.get("/all-verification-request",authAdmin, async(req,res)=>{
  let allVerificationRequest = await Verification.find({})
    .populate("roomManager", "_id name")
    .populate("verifiedHotel", "_id title")
    .sort({ _id: -1 })
    .exec();
 
  res.json(allVerificationRequest);
})
module.exports = router;