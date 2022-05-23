const Hotel=  require('../models/hotel');
const Order=  require('../models/order');
import fs from 'fs'


export const allHotels = async(req,res)=>{

  // console.log("hello");
  // from:{$gte: new Date()}
  let allHomeRooms = await Hotel.find({}).populate("postedBy", '_id name').sort({'_id':-1}).exec();
 
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

export const userHotelBookings = async(req,res)=>{
  let all = await Order.find({orderedBy:req.user.id})
  .select("session")
  .populate("hotel")
  .populate("orderedBy","_id name")
  .exec();
  res.json(all)
  console.log("here are you bookings==>", all);

}
export const isAlreadyBooked=async(req,res)=>{
    const{hotelId} =  req.params;
    // find order of the current logged in user
    const userOrders = await Order.find({orderedBy: req.user.id}).select('hotel').exec();
    // check if hotelId is found in user orders array
    let ids=[];
    for(let i =0;i < userOrders.length;i++){
      ids.push(userOrders[i].hotel.toString())
    }
    res.json({
      ok: ids.includes(hotelId),
    })
}

export const searchListings = async(req,res)=>{
  const {location,date,bed}=req.body;
  // console.log(location,date,bed);
    const fromDate = date.split(",")
  let results = await Hotel.find({from:{$gte:new Date(fromDate[0])},location}).exec();
  res.json(results)
}