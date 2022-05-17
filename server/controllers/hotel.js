const Hotel=  require('../models/hotel');
import fs from 'fs'


export const allHotels = async(req,res)=>{

  console.log("hello");
  let allHomeRooms = await Hotel.find({}).populate("postedBy", '_id name').exec();
 
  res.json(allHomeRooms);
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

