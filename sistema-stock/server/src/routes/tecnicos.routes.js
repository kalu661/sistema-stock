const { Router } = require('express');
const {
  getAllTecnico,
  postTecnico,
  getTecnico,
  putTecnico,
  deleteTecnico,
} = require('../controllers/tecnicos.controllers');

const router = Router();

router.get('/', getAllTecnico);
router.post('/', postTecnico);
router.get('/:id_tecnico', getTecnico);
router.put('/:id_tecnico', putTecnico);
router.delete('/:id_tecnico', deleteTecnico);

module.exports = router;
