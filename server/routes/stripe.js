import express from 'express';
import { createConnectAccount, getAccountStatus } from '../controllers/stripe';

import auth from '../middleware/auth';


// controllers
const router = express.Router();

router.post('/create-connect-account',auth, createConnectAccount);
router.post('/get-account-status',auth, getAccountStatus);

module.exports = router;