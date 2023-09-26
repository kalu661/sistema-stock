const { Router } = require('express');
const {
  getAllProductosCD,
  postProductoCD,
  getProductoCD,
  putProductoCD,
  deleteSProductoCD,
} = require('../controllers/productosCD.controllers');

const router = Router();

router.get('/api/ProductosCD', getAllProductosCD);
router.post('/api/ProductosCD', postProductoCD);
router.get('/api/ProductosCD/:id_cd_productos', getProductoCD);
router.put('/api/ProductosCD/:id_cd_productos', putProductoCD);
router.delete('/api/ProductosCD/:id_cd_productos', deleteSProductoCD);

module.exports = router;
