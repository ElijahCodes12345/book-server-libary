# My Book Library API

## Overview
This is a RESTful API for managing a book library, built with Node.js and Express. It supports user creation, authentication, and CRUD operations on books.

## Installation
1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start the server:
    ```bash
    node server.js
    ```

## Usage
- Base URL: `http://localhost:3000`

## API Endpoints

### Users
- **Create User**
    - Method: POST
    - URL: `/users/create`
    - Request Body: `{ "username": "example", "password": "password" }`
    - Response: `{ "message": "User created successfully" }`

- **Authenticate User**
    - Method: POST
    - URL: `/users/authenticate`
    - Request Body: `{ "username": "example", "password": "password" }`
    - Response: `{ "message": "Authentication successful"}`

- **Get All Users**
    - Method: GET
    - URL: `/users`
    - Response: `[{ "username": "example" }]`

### Books
- **Create Book**
    - Method: POST
    - URL: `/books/create`
    - Request Body: `{ "title": "Book Title", "author": "Author Name" }`
    - Response: `{ "message": "Book added successfully", "book": { "id": 1, "title": "Book Title", "author": "Author Name" } }`

- **Delete Book**
    - Method: DELETE
    - URL: `/books/delete/:id`
    - Response: `{ "message": "Book deleted successfully" }`

- **Loan Out Book**
    - Method: POST
    - URL: `/books/loan`
    - Request Body: `{ "bookId": 1, "username": "example" }`
    - Response: `{ "message": "Book loaned out successfully", "book": { "id": 1, "title": "Book Title", "author": "Author Name", "loanedTo": "example" } }`

- **Return Book**
    - Method: POST
    - URL: `/books/return`
    - Request Body: `{ "bookId": 1 }`
    - Response: `{ "message": "Book returned successfully", "book": { "id": 1, "title": "Book Title", "author": "Author Name", "loanedTo": null } }`

- **Update Book**
    - Method: PUT
    - URL: `/books/update/:id`
    - Request Body: `{ "title": "Updated Title", "author": "Updated Author" }`
    - Response: `{ "message": "Book updated successfully", "book": { "id": 1, "title": "Updated Title", "author": "Updated Author" } }`

- **Get All Books**
    - Method: GET
    - URL: `/books`
    - Response: `[{ "title": "Arise" }]`
