const Router = require('express');
const {
  getSalidas,
  getSalidaById,
  createSalida,
  updateSalida,
  deleteSalida,
} = require('../controllers/salida.controllers');

const router = Router();

router.get('/api/salidas', getSalidas);
router.get('/api/salidas/:id_salida_tb', getSalidaById);
router.post('/api/salidas', createSalida);
router.put('/api/salidas/:id_salida_tb', updateSalida);
router.delete('/api/salidas/:id_salida_tb', deleteSalida);

module.exports = router;
