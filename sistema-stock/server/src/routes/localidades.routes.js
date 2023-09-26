const { Router } = require('express');
const {
  getAllLocalidad,
  postLocalidad,
  getLocalidad,
  putLocalidad,
  deleteLocalidad,
} = require('../controllers/localidades.controllers');

const router = Router();

router.get('/', getAllLocalidad);
router.post('/', postLocalidad);
router.get('/:id_localidades', getLocalidad);
router.put('/:id_localidades', putLocalidad);
router.delete('/:id_localidades', deleteLocalidad);

module.exports = router;
