const express = require('express')
import { create,allHotels, imageAsked } from '../controllers/hotel';
import auth from '../middleware/auth';
const formidableMiddleware = require('express-formidable');


// controllers

const router = express.Router();
router.post('/create-hotel',auth,create);
router.get('/hotels',allHotels);
router.get('/hotel/image/:hotelId',imageAsked);

module.exports = router;