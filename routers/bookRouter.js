// importiamo express
const express = require('express');
// importiamo router
const router = express.Router();
// importiamo il controller
const bookController = require("../controllers/bookController");

// definizione delle rotte
// index
router.get('/', bookController.index);

// show
router.get('/:id', bookController.show);


module.exports = router;