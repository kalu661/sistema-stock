const Router = require('express');
const {
  getInge,
  postInge,
  getAllIng,
  putInge,
  deleteInge,
} = require('../controllers/ingenieros.controllers');

const router = Router();

router.get('/api/inge/:id_inge', getInge);
router.post('/api/inge', postInge);
router.get('/api/inge', getAllIng);
router.put('/api/inge/:id_inge', putInge);
router.delete('/api/inge/:id_inge', deleteInge);

module.exports = router;
