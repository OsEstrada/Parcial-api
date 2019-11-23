var express = require('express');
var router = express.Router();
var gameController = require('../controllers/gameController')

/* GET users listing. */
router.get('/:nombre', gameController.getOne);
router.get('/', gameController.getAll);

router.post('/',gameController.create);
router.put('/:nombre', gameController.update);
router.delete('/:nombre',gameController.delete);

module.exports = router;