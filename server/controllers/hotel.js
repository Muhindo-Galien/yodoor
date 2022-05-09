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
      hotel.postedBy = req.user.id;
      console.log("here is the id of the seller/user", req.user.id);
      if(req.files.image){
        hotel.image = files.image.name;
        hotel.image.contentType = files.image.mimetype;
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
  let allHomeRooms = await Hotel.find({}).populate("postedBy", '_id name').exec();
  //after find==> .limit(3)

  // console.log(allHomeRooms);
  res.json(allHomeRooms);
}

export const imageAsked = async(req,res)=>{
  let hotel = await Hotel.findById(req.params.hotelId).exec()
  if(hotel&&hotel!==null){
    res.set('Content-Type',hotel.image.contentType);
    return res.json(hotel.image);
  }
}

export const sellerHotels = async(req,res)=>{
  const id = req.user.id;
  let all = await Hotel.find({postedBy: id.toString()}).populate('postedBy','_id name').exec();
  res.status(200).json(all)
}


export const remove = async(req,res)=>{
  let removed = await Hotel.findByIdAndDelete(req.params.hotelId).exec();
  res.status(200).json(removed)
}

// export const read = async(req,res)=>{
//   // let hotel = await Hotel.findById(req.params.hotelId).exec();
//   console.log("hotel backend");

// }

