const { Router } = require('express');
const {
  getAllRetiro,
  postRetiro,
  getRetiro,
  putRetiro,
  deleteRetiro,
} = require('../controllers/retiro.controllers');

const router = Router();

router.get('/api/retiro', getAllRetiro);
router.post('/api/retiro', postRetiro);
router.get('/api/retiro/:id_retiro', getRetiro);
router.put('/api/retiro/:id_retiro', putRetiro);
router.delete('/api/retiro/:id_retiro', deleteRetiro);

module.exports = router;
