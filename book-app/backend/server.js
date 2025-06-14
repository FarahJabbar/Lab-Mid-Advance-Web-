const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

// Initialize Express
const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Define Routes
app.use('/api/books', require('./routes/books'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`✅ Server is running`);
    console.log(`🔗 Access URLs:`);
    console.log(`----------------------------------`);
    console.log(`   Local: http://localhost:${PORT}`);
    console.log(`----------------------------------`);
    console.log(`🚀 API Endpoints:`);
    console.log(`   - GET Books: http://localhost:${PORT}/api/books`);
    console.log(`   - Search Books: http://localhost:${PORT}/api/books/search?author={author}`);
    console.log(`   - POST Add Book: http://localhost:${PORT}/api/books`);
  });