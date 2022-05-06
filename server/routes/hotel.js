import express from 'express';
import { create } from '../controllers/hotel';
const formidableMiddleware = require('express-formidable');
import auth from '../middleware/auth';


// controllers
const router = express.Router();

router.post('/create-hotel',create);

module.exports = router;