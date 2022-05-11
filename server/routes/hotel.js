const express = require('express')
import { create,allHotels,sellerHotels ,remove} from '../controllers/hotel';
import { hotelOwner } from '../middleware';
import auth from '../middleware/auth';
const formidableMiddleware = require('express-formidable');
const Hotel=  require('../models/hotel');

// controllers

const router = express.Router();
router.post('/create-hotel',auth,create);
router.get('/hotels',allHotels);
// router.get('/hotel/image/:hotelId',formidableMiddleware(),imageAsked);
// router.get('/hotel/:hotelId',read);
router.get('/hotel/seller-hotels',auth,sellerHotels);
router.delete('/delete-hotel/:hotelId',auth,hotelOwner,remove);
router.get('/hotel/:hotelId', async(req,res)=>{
    let hotel =await Hotel.findById(req.params.hotelId).exec();
    res.json(hotel);

})

module.exports = router;