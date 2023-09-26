const { Router } = require('express');
const {
  getAllStock,
  postStock,
  putStock,
  deleteStock,
  getStock,
} = require('../controllers/stock.controllers');

const router = Router();

router.get('/api/stock', getAllStock);
router.post('/api/stock', postStock);
router.get('/api/stock/:id_stock_ingreso', getStock);
router.put('/api/stock/:id_stock_ingreso', putStock);
router.delete('/api/stock/:id_stock_ingreso', deleteStock);

module.exports = router;
