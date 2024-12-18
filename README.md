# Forum and Post Management System

A modern and responsive forum and post management system built with Angular for the front end and Node.js/Express with MongoDB for the back end. This project enables users to manage posts, themes, and user profiles with a focus on secure authentication and a clean, modular architecture.

## Frameworks and Libraries Used

### Front End
- **Angular**: Framework for building the application.
- **RxJS**: For handling reactive streams and asynchronous operations.
- **CSS**: For styling components and making the app responsive.

### Back End
- **Node.js**: Runtime environment for the back end.
- **Express.js**: Web framework for creating RESTful APIs.
- **MongoDB**: NoSQL database for storing application data.

### Additional Libraries
- **JWT**: For secure user authentication.
- **Bcrypt**: For password hashing.
- **Mongoose**: For object data modeling (ODM) with MongoDB.

## How to Run the Project

### Prerequisites
- Node.js installed
- MongoDB installed and running locally

### Steps to Run

1. **Clone the repository**:
   ```bash
   git clone https://github.com/miroslavnanovski/project-softuni-app
   cd project-softuni-app
   ```
2. **Restore the Database**:
   ```bash
   1.Locate the Database Files Navigate to the folder containing the database dump files: server/resources/forum.
   
    2.Run the Restore Command Open a terminal or command prompt and execute the following command:mongorestore -d forum C:\path\to\the\database\files <- (example path)
   
    Replace C:\path\to\the\database\files with the actual path to the folder where the database files are located.
   
    Once the command completes successfully, the database named forum will be restored and ready for use by the application
   ```

3. **Install dependencies**:
   ```bash
   npm install

4. **Start the back end**:
   ```bash
   cd server/Rest-api
   npm start
   ```

5. **Start the front end**:
   ```bash
   cd src
   ng serve
   ```

6. **Access the application**:
   Open your browser and navigate to `http://localhost:4200`.

## Functionality

- **Authentication**:
  - User registration and login.
  - Persistent login with JWT authentication.
- **Posts**:
  - Create, view, and manage posts.
  - Posts are categorized under themes.
- **Themes**:
  - Subscribe to themes and view relevant posts.
  - Create and manage themes.
- **Profile Management**:
  - View and edit user profile details.
  - Change password functionality.

## Architecture

### Front End
- **Core Components**:
  - `HeaderComponent`, `FooterComponent`, `AuthenticateComponent`.
- **Shared Components**:
  - Loader, error messages, and reusable utilities.
- **Routing**:
  - Guards (e.g., `AuthGuard`) protect routes based on user authentication.

### Back End
- **API**:
  - Endpoints for managing users, posts, and themes.
- **Database**:
  - MongoDB models for structured data storage.


