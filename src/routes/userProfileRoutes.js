const express = require('express');
const router = express.Router();
const userProfileController = require('../controllers/userProfileController');

router.get('/', userProfileController.getUserProfiles);
router.get('/:id', userProfileController.getUserProfileById);
router.post('/', userProfileController.createUserProfile);
router.put('/:id', userProfileController.updateUserProfile);
router.delete('/:id', userProfileController.deleteUserProfile);

module.exports = router;