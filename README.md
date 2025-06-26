# 🚀 Back End Development and APIs Certification Projects

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge)

This repository contains five microservice APIs built as part of the [freeCodeCamp.org Back End Development and APIs Certification](https://www.freecodecamp.org/learn/back-end-development-and-apis/). These projects demonstrate practical skills in Node.js, npm, Express, MongoDB, and Mongoose.

## 📑 Table of Contents
- [Projects Overview](#projects)
- [Learning Outcomes](#learning-outcomes)
- [Installation](#installation)
- [Usage](#usage)

## 🛠️ Projects

### 1. [Timestamp Microservice](./timestamp-microservice)
> 🕒 An API that returns Unix and UTC timestamps for a given date string or the current date.
>
> **Example:** `/api/timestamp/2015-12-25` → `{ "unix": 1451001600000, "utc": "Fri, 25 Dec 2015 00:00:00 GMT" }`

### 2. [Request Header Parser Microservice](./request-header-parser)
> 📋 An API that returns information about the client's IP address, language, and software from the request headers.
>
> **Example:** `/api/whoami` → `{ "ipaddress": "192.168.1.1", "language": "en-US,en", "software": "Chrome/91.0.4472.124" }`

### 3. [URL Shortener Microservice](./url-shortener)
> 🔗 An API that shortens URLs and redirects users to the original URL when the short link is visited.
>
> **Example:** POST `/api/shorturl` → `{ "original_url": "https://www.freecodecamp.org", "short_url": 1 }`

### 4. [Exercise Tracker](./exercise-tracker)
> 🏃‍♂️ An API that allows users to create accounts, log exercises, and retrieve exercise logs. Built with MongoDB and Mongoose.
>
> **Features:** User creation, exercise logging, and filtering logs by date range

### 5. [File Metadata Microservice](./file-metadata)
> 📂 An API that accepts file uploads and returns metadata about the uploaded file, such as name, type, and size.
>
> **Example:** Upload a file → `{ "name": "example.jpg", "type": "image/jpeg", "size": 12345 }`

## 📚 Learning Outcomes

Through these projects, I learned how to:
- Build RESTful APIs using Node.js and Express
- Manage project dependencies with npm
- Handle HTTP requests and responses
- Parse and validate user input
- Work with MongoDB and Mongoose for data storage and retrieval
- Implement file upload functionality
- Deploy and test microservices

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/backend-dev-apis-projects.git

# Navigate to project directory
cd backend-dev-apis-projects

# Install dependencies
npm install
```

## 🖥️ Usage

Each microservice can be run independently:

```bash
# Navigate to specific project
cd timestamp-microservice

# Install project dependencies
npm install

# Start the service
npm start
```

---

*These projects were completed as part of the freeCodeCamp Back End Development and APIs curriculum.*