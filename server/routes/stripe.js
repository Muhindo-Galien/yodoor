import express from 'express';
import { createConnectAccount, getAccountBalance, getAccountStatus, payoutSetting, stripeSessionId, stripeSuccess } from '../controllers/stripe';

import auth from '../middleware/auth';


// controllers
const router = express.Router();

router.post('/create-connect-account',auth, createConnectAccount);
router.post('/get-account-status',auth, getAccountStatus);
router.post('/get-account-balance',auth, getAccountBalance);
router.post('/payout-setting',auth, payoutSetting);
router.post('/stripe-session-id',auth, stripeSessionId);
router.post('/stripe-success',auth, stripeSuccess);

module.exports = router;