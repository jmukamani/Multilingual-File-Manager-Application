# Multi-User File Manager Application

## Description

This project is a backend application for a **multi-user file manager** built with Node.js. It allows users to securely register, log in, and manage files within their designated directories. The application demonstrates core backend development skills, including authentication, file handling, database interaction, and unit testing.

---

## Features

### 1. User Management
- Secure user registration and login.
- Passwords hashed using **bcrypt**.
- Authentication managed with **JWT**.

### 2. File Management
- Create, read, update, and delete files within user-specific directories.
- Directories and files are managed securely using the **fs-extra** library.

### 3. Multilingual Support (i18n)
- [Optional] Allow users to select their preferred interface language.

### 4. Queuing System
- [Optional] Use **Redis** for asynchronous tasks such as file uploads or progress tracking.

### 5. Unit Testing
- Comprehensive tests for user authentication and file management functionality using **Jest**.

---

## Technologies Used

- **Node.js**: Backend framework.
- **Express.js**: Server and API framework.
- **MongoDB**: Database for storing user and file metadata.
- **Mongoose**: ODM for database management.
- **Redis**: Queuing system for asynchronous tasks.
- **bcrypt**: Password hashing for secure user authentication.
- **JWT**: Token-based authentication.
- **fs-extra**: Simplifies file system operations.
- **Jest**: Testing framework for unit and integration tests.

---

## Installation and Setup

### 1. Prerequisites
Ensure you have the following installed on your machine:
- **Node.js** (v14+)
- **MongoDB** (local or cloud-based, e.g., MongoDB Atlas)
- **Redis** (optional for queuing system)

### 2. Clone the Repository
```bash
git clone https://github.com/your-repo/file-manager.git
cd file-manager
```

### 3. Install Dependencies
```bash
npm intall
```

### 4. Set Up Environment Variables
Create a ```.env``` file in the root of the project and add the following:
```
PORT=3000
MONGO_URI=mongodb://localhost:27017/file_manager
JWT_SECRET=your_secret
```
**Note: Replace ```mongodb://localhost:27017/file_manager``` with your MongoDB connection string if you're using MongoDB Atlas or another host.** 

### 5. Start the MongoDB Server
If using a local MongoDB instance, ensure it's running:
```
mongob
```

---

## Usage

### Start the Server
Run the server locally:
```
npm start
```
The application will be available at ```http://localhost:3000```.

## API Endpoints

### User Management
- **POST /api/users/register:** Register a new user.
    - Body: ```{ "email": "example@example.com", "password": "password123" }```
- **POST /api/users/login:** Log in an existing user.
    - Body: ```{ "email": "example@example.com", "password": "password123" }```
### File Management
- **POST /api/files:** Create a new file.
    - Body: ```{ "fileName": "example.txt", "content": "Hello World" }```
- **GET /api/files/:fileName:** Read a file.
- **PUT /api/files:** Update an existing file.
    - Body: ```{ "fileName": "example.txt", "content": "Updated Content" }```
- **DELETE /api/files/:fileName:** Delete a file.

---

## Testing

### Run Tests
Use the following command to run unit tests:
```
npm test
```

---

## Contributors

- **Juliet Mukamani:**
- **Bryan Aurel Bakongo Bwemou**

---

## License

This project is licensed under the MIT License.