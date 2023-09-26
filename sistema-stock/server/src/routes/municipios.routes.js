const { Router } = require('express');
const {
  getAllMunicipios,
  postMunicipios,
  getMunicipios,
  putMunicipios,
  deleteMunicipios,
} = require('../controllers/municipios.controllers');

const router = Router();

router.get('/', getAllMunicipios);
router.post('/', postMunicipios);
router.get('/:id_municipios', getMunicipios);
router.put('/:id_municipios', putMunicipios);
router.delete('/:id_municipios', deleteMunicipios);

module.exports = router;
