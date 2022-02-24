import express from 'express';
import userControllers from '../controllers/userControllers';

// controllers
const router = express.Router();

router.post('/register', userControllers.register);
module.exports = router;