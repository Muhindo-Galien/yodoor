import express from 'express';
import userControllers from '../controllers/userControllers';
import auth from '../middleware/auth';
import authAdmin from '../middleware/authAdmin';

// controllers
const router = express.Router();

router.post('/user/register', userControllers.register);
router.post('/user/activation', userControllers.activeEmail);
router.post('/user/login', userControllers.login);
router.post('/user/refresh_token', userControllers.getAccessToken);
router.post('/user/forgot', userControllers.forgotPassword);
router.post('/user/reset',auth ,userControllers.resetPassword);
router.get('/user/infor',auth ,userControllers.getUserInfor);
router.get('/user/all_infor', auth, authAdmin, userControllers.getUsersAllInfor)
router.get('/user/logout', userControllers.logout)
module.exports = router;