document.addEventListener('DOMContentLoaded', function() {
    const booksContainer = document.getElementById('booksContainer');
    const searchInput = document.getElementById('searchInput');
    const loading = document.getElementById('loading');
    
    let allBooks = [];
    
    // Fetch all books
    fetchBooks();
    
    // Search functionality
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      if (searchTerm.length > 0) {
        searchBooks(searchTerm);
      } else {
        displayBooks(allBooks);
      }
    });
    
    async function fetchBooks() {
      try {
        const response = await fetch('http://localhost:5000/api/books');
        if (!response.ok) throw new Error('Failed to fetch books');
        
        allBooks = await response.json();
        displayBooks(allBooks);
        loading.style.display = 'none';
      } catch (error) {
        console.error('Error:', error);
        booksContainer.innerHTML = `<div class="alert alert-danger">Failed to load books. Please try again later.</div>`;
        loading.style.display = 'none';
      }
    }
    
    async function searchBooks(author) {
      try {
        const response = await fetch(`http://localhost:5000/api/books/search?author=${author}`);
        if (!response.ok) throw new Error('Failed to search books');
        
        const results = await response.json();
        displayBooks(results);
      } catch (error) {
        console.error('Error:', error);
        booksContainer.innerHTML = `<div class="alert alert-danger">Failed to search books. Please try again.</div>`;
      }
    }
    
    function displayBooks(books) {
      if (books.length === 0) {
        booksContainer.innerHTML = '<div class="col-12"><p class="text-center">No books found.</p></div>';
        return;
      }
      
      booksContainer.innerHTML = books.map(book => `
        <div class="col-md-4">
          <div class="card book-card">
            <div class="card-body">
              <h5 class="card-title">${book.title}</h5>
              <p class="card-text text-muted">by ${book.author}</p>
              <p class="price">$${book.price.toFixed(2)}</p>
            </div>
          </div>
        </div>
      `).join('');
    }
  });