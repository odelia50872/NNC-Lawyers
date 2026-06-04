const express = require('express');
const router = express.Router();
const financialController = require('../controllers/financialController');

router.get('/users/:id', financialController.getFinancialReportById);
router.get('/users', financialController.getAllFinancialReportsByUserId);
router.post('/users', financialController.createFinancialReport);
router.delete('/users/:id', financialController.deleteFinancialReport);
router.put('/users/:id', financialController.updateFinancialReport);


module.exports = router;