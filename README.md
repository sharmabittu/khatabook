# Khatabook Project

## Overview

The Khatabook Project is a simple web application for creating, reading, editing, and deleting text files. The application uses Node.js, Express, and EJS for server-side rendering. It is designed to help manage and track personal or business accounts.

## Features

- Create a new "hisaab" (account/record) with a title and content.
- List all available hisaabs.
- View the content of a specific hisaab.
- Edit an existing hisaab.
- Delete a hisaab.
- Responsive design for mobile and desktop views.

## Project Structure

khatabook/
├── files/ # Directory where hisaab files are stored
├── public/ # Public directory for static assets (CSS, JS)
│ ├── css/
│ └── js/
├── views/ # EJS templates
│ ├── pages/
│ │ ├── create.ejs
│ │ ├── edit.ejs
│ │ ├── index.ejs
│ │ ├── read.ejs
│ └── partials/
│ ├── header.ejs
├── app.js # Main application file
└── README.md # Project README file



## Installation

1. **Clone the repository**:

   ```sh
   git clone https://github.com/sharmabittu/khatabook.git
   cd khatabook
npm install
node app.js

The application will start on http://localhost:3000.

Routes

GET /: Home page that lists all hisaabs.
GET /create: Page to create a new hisaab.
POST /createhisaab: Endpoint to handle form submission for creating a new hisaab.
GET /edit/:fileName: Page to edit an existing hisaab.
POST /update/:fileName: Endpoint to handle form submission for updating an existing hisaab.
GET /hisaab/:fileName: Page to view a specific hisaab.
GET /delete/:fileName: Endpoint to delete a specific hisaab.
File Naming and Content
Files are named based on the current date (DD-MM-YYYY.txt). If a file with the same name already exists, a counter is added to the file name (e.g., DD-MM-YYYY(1).txt, DD-MM-YYYY(2).txt).
Each file's content starts with the title in an emphasized format, followed by the hisaab content.

Error Handling
The application includes basic error handling to manage server errors and file operations.


Contributions
Contributions are welcome! Please fork the repository and submit a pull request.

Contact
For any inquiries, please reach out to bittutheengineer@gmail.com.

