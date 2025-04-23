const express = require('express');
const router = express.Router();
const booksController = require('../controllers/bookscontroller');

// @route   GET api/books
// @desc    Get all books
router.get('/', booksController.getAllBooks);

// @route   GET api/books/search
// @desc    Search books by author
router.get('/search', booksController.searchBooksByAuthor);

// @route   POST api/books
// @desc    Add a new book
router.post('/', booksController.addBook);

module.exports = router;