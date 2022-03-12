import express from 'express';
import userControllers from '../controllers/userControllers';

// controllers
const router = express.Router();

router.post('/user/register', userControllers.register);
router.post('/user/login', userControllers.login);
router.post('/user/refresh_token', userControllers.getAccessToken);
router.post('/user/activation', userControllers.activeEmail);
module.exports = router;