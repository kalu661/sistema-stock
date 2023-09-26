const { Router } = require('express');
const {
  getAllDevoluciones,
  postDevolucion,
  getDevolucion,
  putDevolucion,
  deleteDevoluciones,
} = require('../controllers/devolucion.controllers');

const router = Router();

router.get('/api/devolucion', getAllDevoluciones);
router.post('/api/devolucion', postDevolucion);
router.get('/api/devolucion/:id_devolucion', getDevolucion);
router.put('/api/devolucion/:id_devolucion', putDevolucion);
router.delete('/api/devolucion/:id_devolucion', deleteDevoluciones);

module.exports = router;
