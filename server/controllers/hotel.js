const Hotel=  require('../models/hotel');
import fs from 'fs'
  

export const create = async(req,res)=>{

 
  // console.log("here");
  //   console.log(req.body);
  //   console.log(req.files);
    try {
      let fields = req.body;
      let files = req.files;

      let hotel = new Hotel(fields);

      if(req.files.image){
        hotel.image = files.image.name;
        // hotel.image.contentType = files.image.mimetype;
      }

      hotel.save((err,result)=>{
        if(err){
          console.log("saving hotel error",err);
          res.status(404).send("Error saving")
        }
        res.json(result)

      })
      
    } catch (err) {
      console.log(err);
      res.status(400).json({
        err: err.message
      })
    }
  

}
export const allHotels = async(req,res)=>{

  console.log("hello");
  let allHomeRooms = await Hotel.find({})
  .populate("postedBy", '_id name')
  .exec();
  //after find==> .limit(3)

  console.log(allHomeRooms);
  res.json(allHomeRooms);
}
