const { Router } = require('express');
const {
  getAllProductos,
  postProducto,
  getProducto,
  putProducto,
  deleteSProducto,
} = require('../controllers/productos.controllers');

const router = Router();

router.get('/', getAllProductos);
router.post('/', postProducto);
router.get('/:id_producto', getProducto);
router.put('/:id_producto', putProducto);
router.delete('/:id_producto', deleteSProducto);

module.exports = router;
