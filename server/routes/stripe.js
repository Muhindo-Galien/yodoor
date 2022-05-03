import express from 'express';
import { createConnectAccount } from '../controllers/stripe';

import auth from '../middleware/auth';
import authAdmin from '../middleware/authAdmin';

// controllers
const router = express.Router();

router.post('/create-connect-account',auth, createConnectAccount);


module.exports = router;