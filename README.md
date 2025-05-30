# Books REST API

A simple REST API for managing a collection of books built with Node.js and Express. This API provides full CRUD (Create, Read, Update, Delete) operations for book management with in-memory storage.

![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-404D59?logo=express) ![REST API](https://img.shields.io/badge/REST-API-blue) ![Status](https://img.shields.io/badge/Status-Active-success)

## 🚀 Features

- ✅ **Full CRUD Operations**: Create, Read, Update, Delete books
- 📚 **In-Memory Storage**: No database required - perfect for learning
- 🔍 **Input Validation**: Proper error handling and data validation
- 📝 **Comprehensive Logging**: Request logging for debugging
- 🎯 **RESTful Design**: Follows REST API conventions
- 🛡️ **Error Handling**: Proper HTTP status codes and error messages
- 📖 **Self-Documenting**: Root endpoint shows all available routes

## 📋 Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)
- Postman (for API testing) - [Download here](https://www.postman.com/downloads/)

## 🛠️ Installation & Setup

### Step 1: Initialize Project
```bash
# Create project directory
mkdir books-rest-api
cd books-rest-api

# Initialize npm project
npm init -y
```

### Step 2: Install Dependencies
```bash
# Install Express
npm install express

# Install nodemon for development (optional but recommended)
npm install --save-dev nodemon
```

### Step 3: Create Server File
Create `server.js` with the provided server code.

### Step 4: Update package.json
Update your `package.json` with the provided configuration.

### Step 5: Start the Server
```bash
# Production mode
npm start

# Development mode (with nodemon for auto-restart)
npm run dev
```

The server will start on `http://localhost:3000`

## 📡 API Endpoints

### Base URL
```
http://localhost:3000
```

### Available Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/` | API information and available routes | None |
| GET | `/books` | Get all books | None |
| GET | `/books/:id` | Get a specific book by ID | None |
| POST | `/books` | Create a new book | JSON object |
| PUT | `/books/:id` | Update a book by ID | JSON object |
| DELETE | `/books/:id` | Delete a book by ID | None |

## 📚 API Documentation

### 1. Get API Information
```http
GET /
```

**Response:**
```json
{
  "message": "Books REST API",
  "version": "1.0.0",
  "endpoints": {
    "GET /books": "Get all books",
    "GET /books/:id": "Get a specific book by ID",
    "POST /books": "Create a new book",
    "PUT /books/:id": "Update a book by ID",
    "DELETE /books/:id": "Delete a book by ID"
  }
}
```

### 2. Get All Books
```http
GET /books
```

**Response:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "year": 1925
    },
    {
      "id": 2,
      "title": "To Kill a Mockingbird",
      "author": "Harper Lee",
      "year": 1960
    }
  ]
}
```

### 3. Get Specific Book
```http
GET /books/:id
```

**Example:** `GET /books/1`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "year": 1925
  }
}
```

### 4. Create New Book
```http
POST /books
```

**Request Body:**
```json
{
  "title": "The Catcher in the Rye",
  "author": "J.D. Salinger",
  "year": 1951
}
```

**Response:**
```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "id": 4,
    "title": "The Catcher in the Rye",
    "author": "J.D. Salinger",
    "year": 1951
  }
}
```

### 5. Update Book
```http
PUT /books/:id
```

**Example:** `PUT /books/1`

**Request Body:**
```json
{
  "title": "The Great Gatsby (Updated Edition)",
  "author": "F. Scott Fitzgerald",
  "year": 1925
}
```

**Response:**
```json
{
  "success": true,
  "message": "Book updated successfully",
  "data": {
    "id": 1,
    "title": "The Great Gatsby (Updated Edition)",
    "author": "F. Scott Fitzgerald",
    "year": 1925
  }
}
```

### 6. Delete Book
```http
DELETE /books/:id
```

**Example:** `DELETE /books/1`

**Response:**
```json
{
  "success": true,
  "message": "Book deleted successfully",
  "data": {
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "year": 1925
  }
}
```

## 🧪 Testing with Postman

### Setup Postman Collection

1. **Open Postman**
2. **Create a new Collection** called "Books API"
3. **Add requests for each endpoint:**

#### GET All Books
- Method: `GET`
- URL: `http://localhost:3000/books`

#### GET Specific Book
- Method: `GET`
- URL: `http://localhost:3000/books/1`

#### POST New Book
- Method: `POST`
- URL: `http://localhost:3000/books`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
```json
{
  "title": "New Book Title",
  "author": "Author Name",
  "year": 2023
}
```

#### PUT Update Book
- Method: `PUT`
- URL: `http://localhost:3000/books/1`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
```json
{
  "title": "Updated Book Title",
  "author": "Updated Author",
  "year": 2024
}
```

#### DELETE Book
- Method: `DELETE`
- URL: `http://localhost:3000/books/1`

## 🔍 Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

### Error Response Format
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Specific validation errors"]
}
```

## 📁 Project Structure

```
books-rest-api/
├── server.js          # Main server file
├── package.json       # Node.js project configuration
├── README.md         # This documentation
└── node_modules/     # Dependencies (created after npm install)
```

## 🚀 Quick Test Commands

Test your API using curl commands:

```bash
# Get all books
curl http://localhost:3000/books

# Get specific book
curl http://localhost:3000/books/1

# Create new book
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Book","author":"Test Author","year":2023}'

# Update book
curl -X PUT http://localhost:3000/books/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Book","author":"Updated Author","year":2024}'

# Delete book
curl -X DELETE http://localhost:3000/books/1
```

## 🔧 Development Tips

### Using Nodemon for Development
```bash
# Install nodemon globally (optional)
npm install -g nodemon

# Run with nodemon for auto-restart
nodemon server.js
```

### Environment Variables
For production, consider using environment variables:
```javascript
const PORT = process.env.PORT || 3000;
```

### Adding More Features
Consider extending the API with:
- Data persistence (MongoDB, PostgreSQL)
- Authentication and authorization
- Input sanitization
- Rate limiting
- API documentation (Swagger)
- Unit tests

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

If you encounter issues:
1. Check that Node.js is installed correctly
2. Verify all dependencies are installed (`npm install`)
3. Ensure port 3000 is not being used by another application
4. Check console output for error messages

---

**Happy Coding! 📚🚀**