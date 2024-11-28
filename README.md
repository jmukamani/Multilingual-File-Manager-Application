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

### 3. Install Dependencies
```bash
npm intall