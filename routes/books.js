const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.post('/create', bookController.createBook);
router.delete('/delete/:id', bookController.deleteBook);
router.post('/loan', bookController.loanOutBook);
router.post('/return', bookController.returnBook);
router.put('/update/:id', bookController.updateBook);
router.get('/', bookController.getAllBooks);

module.exports = router;
