const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/costumes')

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);
router.delete('/:id', ctrl.deleteOne);
router.post('/', ctrl.newCostume);
router.put('/:id', ctrl.updateCostume);

module.exports = router