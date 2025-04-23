const Book = require('../models/Book');

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Search books by author
exports.searchBooksByAuthor = async (req, res) => {
  try {
    const books = await Book.find({
      author: { $regex: req.query.author, $options: 'i' }
    });
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Add a new book
exports.addBook = async (req, res) => {
  try {
    const { title, author, price } = req.body;

    const newBook = new Book({
      title,
      author,
      price
    });

    const book = await newBook.save();
    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};