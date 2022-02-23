import express from 'express';
import { showMessage } from '../controllers/auth';

// controllers
const router = express.Router();

router.get('/:message', showMessage);
module.exports = router;