const Hotel=  require('../models/hotel');


export const hotelOwner = async(req,res,next)=>{

    let hotel = await Hotel.findById(req.params.hotelId).exec();
    let owner = hotel.postedBy._id.toString() === req.user.id.toString();
    if(!owner){
        res.status(403).send("UnAuthorized!")
    }
    next();

}