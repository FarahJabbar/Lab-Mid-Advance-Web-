document.addEventListener('DOMContentLoaded', function() {
    const addBookForm = document.getElementById('addBookForm');
    const messageDiv = document.getElementById('message');
    
    addBookForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const title = document.getElementById('title').value;
      const author = document.getElementById('author').value;
      const price = parseFloat(document.getElementById('price').value);
      
      try {
        const response = await fetch('http://localhost:5000/api/books', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, author, price })
        });
        
        if (!response.ok) throw new Error('Failed to add book');
        
        const data = await response.json();
        
        messageDiv.innerHTML = `
          <div class="alert alert-success">
            Book "${data.title}" by ${data.author} added successfully!
          </div>
        `;
        
        addBookForm.reset();
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          messageDiv.innerHTML = '';
        }, 3000);
      } catch (error) {
        console.error('Error:', error);
        messageDiv.innerHTML = `
          <div class="alert alert-danger">
            Failed to add book. Please try again.
          </div>
        `;
      }
    });
  });