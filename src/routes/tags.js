const express = require('express')
const router = express.Router({ mergeParams: true })
const ctrl = require('../controllers/tags')

router.get('/', ctrl.getAllTags);
router.get('/:tagID', ctrl.getTag);
router.delete('/:tagID', ctrl.deleteTag);
router.post('/', ctrl.addTag);
router.put('/:tagID', ctrl.updateTag);

module.exports = router