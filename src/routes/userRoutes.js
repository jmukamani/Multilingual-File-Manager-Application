const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const { authenticate } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/profile', authenticate, getUserProfile);
router.put('/profile', authenticate, updateUserProfile);

module.exports = router;
