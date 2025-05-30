const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Middleware for logging requests
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// In-memory storage for books
let books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925 },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
    { id: 3, title: "1984", author: "George Orwell", year: 1949 }
];

// Counter for generating new book IDs
let nextId = 4;

// Helper function to find book by ID
const findBookById = (id) => {
    return books.find(book => book.id === parseInt(id));
};

// Helper function to validate book data
const validateBook = (book) => {
    const errors = [];
    
    if (!book.title || typeof book.title !== 'string' || book.title.trim() === '') {
        errors.push('Title is required and must be a non-empty string');
    }
    
    if (!book.author || typeof book.author !== 'string' || book.author.trim() === '') {
        errors.push('Author is required and must be a non-empty string');
    }
    
    if (book.year && (!Number.isInteger(book.year) || book.year < 0 || book.year > new Date().getFullYear())) {
        errors.push('Year must be a valid integer between 0 and current year');
    }
    
    return errors;
};

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Books REST API',
        version: '1.0.0',
        endpoints: {
            'GET /books': 'Get all books',
            'GET /books/:id': 'Get a specific book by ID',
            'POST /books': 'Create a new book',
            'PUT /books/:id': 'Update a book by ID',
            'DELETE /books/:id': 'Delete a book by ID'
        }
    });
});

// GET /books - Get all books
app.get('/books', (req, res) => {
    try {
        res.status(200).json({
            success: true,
            count: books.length,
            data: books
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// GET /books/:id - Get a specific book by ID
app.get('/books/:id', (req, res) => {
    try {
        const book = findBookById(req.params.id);
        
        if (!book) {
            return res.status(404).json({
                success: false,
                message: `Book with ID ${req.params.id} not found`
            });
        }
        
        res.status(200).json({
            success: true,
            data: book
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// POST /books - Create a new book
app.post('/books', (req, res) => {
    try {
        const { title, author, year } = req.body;
        
        // Validate input
        const validationErrors = validateBook({ title, author, year });
        if (validationErrors.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: validationErrors
            });
        }
        
        // Create new book object
        const newBook = {
            id: nextId++,
            title: title.trim(),
            author: author.trim(),
            year: year || null
        };
        
        // Add to books array
        books.push(newBook);
        
        res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data: newBook
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// PUT /books/:id - Update a book by ID
app.put('/books/:id', (req, res) => {
    try {
        const book = findBookById(req.params.id);
        
        if (!book) {
            return res.status(404).json({
                success: false,
                message: `Book with ID ${req.params.id} not found`
            });
        }
        
        const { title, author, year } = req.body;
        
        // Validate input
        const validationErrors = validateBook({ title, author, year });
        if (validationErrors.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: validationErrors
            });
        }
        
        // Update book properties
        book.title = title.trim();
        book.author = author.trim();
        book.year = year || null;
        
        res.status(200).json({
            success: true,
            message: 'Book updated successfully',
            data: book
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// DELETE /books/:id - Delete a book by ID
app.delete('/books/:id', (req, res) => {
    try {
        const bookIndex = books.findIndex(book => book.id === parseInt(req.params.id));
        
        if (bookIndex === -1) {
            return res.status(404).json({
                success: false,
                message: `Book with ID ${req.params.id} not found`
            });
        }
        
        const deletedBook = books.splice(bookIndex, 1)[0];
        
        res.status(200).json({
            success: true,
            message: 'Book deleted successfully',
            data: deletedBook
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// Handle 404 for unknown routes
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
        availableRoutes: {
            'GET /': 'API information',
            'GET /books': 'Get all books',
            'GET /books/:id': 'Get a specific book',
            'POST /books': 'Create a new book',
            'PUT /books/:id': 'Update a book',
            'DELETE /books/:id': 'Delete a book'
        }
    });
});

// Global error handler
app.use((error, req, res, next) => {
    console.error('Global error handler:', error);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Books REST API Server is running on http://localhost:${PORT}`);
    console.log(`📚 Ready to manage your book collection!`);
    console.log(`🔍 Visit http://localhost:${PORT} to see available endpoints`);
});