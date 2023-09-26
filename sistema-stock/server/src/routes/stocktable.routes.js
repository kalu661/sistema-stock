const { Router } = require('express');
const {
  getAllStockTB,
  postStockTB,
  putStockTB,
  deleteStockTB,
  getStockTB,
} = require('../controllers/stocktable_controllers');

const router = Router();

router.get('/api/stocktb', getAllStockTB);
router.post('/api/stocktb', postStockTB);
router.get('/api/stocktb/:id_entrada_tb', getStockTB);
router.put('/api/stocktb/:id_entrada_tb', putStockTB);
router.delete('/api/stocktb/:id_entrada_tb', deleteStockTB);

module.exports = router;
