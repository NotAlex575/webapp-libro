// importiamo express
const express = require('express');
// importiamo router
const router = express.Router();
// importiamo il controller
const bookController = require("../controllers/bookController");
//importiamo il multer
const upload = require("../middlewares/multer")

// definizione delle rotte
// index
router.get('/', bookController.index);

// show
router.get('/:id', bookController.show);

//store
router.post("/", upload.single("image"), bookController.store);

module.exports = router;