const { Router } = require('express');
const {
  getAllDepartamento,
  postDepartamento,
  getDepartamento,
  putDepartamento,
  deleteDepartamento,
} = require('../controllers/departamentos.controllers');

const router = Router();

router.get('/', getAllDepartamento);
router.post('/', postDepartamento);
router.get('/:id_departamento', getDepartamento);
router.put('/:id_departamento', putDepartamento);
router.delete('/:id_departamento', deleteDepartamento);

module.exports = router;
