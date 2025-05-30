# Quick Setup Guide

## 🚀 5-Minute Setup

Follow these exact steps to get your Books REST API running:

### Step 1: Create Project Folder
```bash
mkdir books-rest-api
cd books-rest-api
```

### Step 2: Initialize Node.js Project
```bash
npm init -y
```

### Step 3: Install Express
```bash
npm install express
npm install --save-dev nodemon
```

### Step 4: Create Files
Create these 3 files in your project folder:

1. **server.js** - Copy the server code from the artifacts
2. **package.json** - Replace content with the package.json from artifacts  
3. **README.md** - Copy the README content from artifacts

### Step 5: Start the Server
```bash
npm start
```

### Step 6: Test the API
Open your browser and go to: `http://localhost:3000`

You should see the API information page!

## 🧪 Quick Test in Postman

### Test Sequence:
1. **GET** `http://localhost:3000/books` (see all books)
2. **POST** `http://localhost:3000/books` with body:
   ```json
   {
     "title": "Test Book",
     "author": "Test Author", 
     "year": 2023
   }
   ```
3. **GET** `http://localhost:3000/books` (see the new book)
4. **PUT** `http://localhost:3000/books/4` (update the book you just created)
5. **DELETE** `http://localhost:3000/books/4` (delete the book)

## ✅ Success Checklist

- [ ] Node.js installed
- [ ] Project folder created
- [ ] Dependencies installed (`npm install`)
- [ ] Server starts without errors
- [ ] Can access `http://localhost:3000`
- [ ] Postman tests work
- [ ] All CRUD operations functional

## 🔧 Troubleshooting

**Server won't start?**
- Check if port 3000 is free
- Run `npm install` again
- Check Node.js version (`node --version`)

**Can't connect in Postman?**
- Ensure server is running
- Use `http://localhost:3000` (not https)
- Check firewall settings

**JSON errors?**
- Set header `Content-Type: application/json`
- Ensure JSON is valid format
- Check request body syntax

You're all set! 🎉