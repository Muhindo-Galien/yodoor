import express from 'express';
import userControllers from '../controllers/userControllers';

// controllers
const router = express.Router();

router.post('/register', userControllers.register);
router.post('/activation', userControllers.activeEmail);
module.exports = router;