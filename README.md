### Multilingual File Manager Application Documentation
## 1. Project Overview
The Multilingual File Manager is a robust web application designed to provide secure, multi-user file management with internationalization support.

## 2. Technical Stack
Backend: Node.js, Express.js
Database: MongoDB
Authentication: Passport.js, JWT
Internationalization: i18next
Additional Libraries:
bcryptjs for password hashing
mongoose for database ORM
express-session for session management

## 3. Project Structure
file-manager/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   ├── passport.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── fileController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── i18nMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── File.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── fileRoutes.js
│   │   └── userRoutes.js
│   └── locales/
│       ├── en.json
│       └── es.json
├── .env
├── app.js
└── server.js
## 4. Key Features
User Registration and Authentication
Multilingual Support
Secure File Management
User Profile Management
## 5. Environment Setup
# Prerequisites
Node.js (v14+ recommended)
MongoDB
Redis (optional)
Installation Steps
Clone the repository
git clone https://github.com/jmukamani/multilingual-file-manager.git

cd multilingual-file-manager

Install Dependencies
npm install
Create .env File

MONGODB_URI=mongodb://localhost:27017/filemanager
PORT=3000
SESSION_SECRET=your_session_secret
JWT_SECRET=your_jwt_secret

Start the Server
npm start

## 6. API Endpoints
Authentication Endpoints
POST /api/auth/register
Register a new user
Body: { username, email, password, language }

POST /api/auth/login
User login
Body: { email, password }

User Endpoints
GET /api/users/profile
Retrieve user profile (authenticated)

PUT /api/users/profile
Update user profile (authenticated)
Body: { username, language }

File Endpoints
POST /api/files/upload
Upload a file (authenticated)
Supports file upload with directory 

GET /api/files
List files (authenticated)
Optional query parameters for directory filtering

DELETE /api/files/:fileId
Delete a specific file (authenticated)

## 7. Internationalization
The application supports multiple languages through i18next:
Default Language: English
Supported Languages: English, Spanish
Language can be changed via user profile or detected automatically

## 8. Security Features
Password Hashing with bcrypt
JWT-based Authentication
Passport.js Local Strategy
Protected Routes
Input Validation

## 9. Error Handling
Centralized error middleware
Detailed error responses
Logging of server-side errors

## 10. Performance Considerations
Efficient database queries
Minimal middleware stack
Stateless authentication with JWT

## 11. Troubleshooting
Ensure MongoDB is running
Check .env configuration
Verify network permissions
Review server logs for detailed errors

### Demo Scenario: File Management Workflow
# Scenario: Sarah's Project Collaboration
User Registration
POST /api/auth/register
{
  "username": "sarah_dev",
  "email": "sarah@project.com",
  "password": "SecurePass123!",
  "language": "en"
}

# User Login
POST /api/auth/login
{
  "email": "sarah@project.com",
  "password": "SecurePass123!"
}

# Create Project Directory
POST /api/files/directory
{
  "directoryName": "ProjectX",
  "parentDirectoryId": null
}

# Upload Project Documents
POST /api/files/upload
{
  "file": "requirements.pdf",
  "parentDirectoryId": "projectx_directory_id"
}

# List Project Files

GET /api/files?parentDirectoryId=projectx_directory_id
Update User Language Preference

PUT /api/users/profile
{
  "language": "es"
}
## Workflow Highlights
Secure authentication
Multilingual interface
Hierarchical file management
User-specific file access
Postman/cURL Testing
Included Postman collection and cURL commands in the documentation for easy API testing.

## Recommended Improvements
Implement file sharing
Add real-time collaboration features
Enhance error handling
Implement more granular permissions

### Contribution Guidelines
Fork the repository
Create feature branches
Write comprehensive tests
Follow coding standards
Submit pull requests

## Contributors
Bryan Aurel
Juliet Mukamani