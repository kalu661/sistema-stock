const { Router } = require('express');
const {
  getAllUsers,
  postUser,
  getUser,
  putUser,
  deleteUser,
  loginUser,
} = require('../controllers/user.controllers');

const router = Router();

router.get('/api/user', getAllUsers);
router.post('/api/login', loginUser);
router.post('/api/user', postUser);
router.get('/api/user/:id_users', getUser);
router.put('/api/user/:id_users', putUser);
router.delete('/api/user/:id_users', deleteUser);

module.exports = router;
