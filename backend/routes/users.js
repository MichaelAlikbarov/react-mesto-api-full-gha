const router = require('express').Router();
const {
  getUsers,
  getUserId,
  updateProfile,
  updateAvatar,
  getUsersMe,
} = require('../controllers/users');
const {
  validationGetUserId,
  validationUpdateProfile,
  validationUpdateAvatar,
} = require('../middlewares/validationHandler');

router.get('/', getUsers);
router.get('/me', getUsersMe);
router.get('/:userId', validationGetUserId, getUserId);

router.patch('/me', validationUpdateProfile, updateProfile);
router.patch('/me/avatar', validationUpdateAvatar, updateAvatar);

module.exports = router;
