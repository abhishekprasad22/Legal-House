# Legal House

Legal House is a web-based application designed to streamline case management for legal professionals. It provides features for creating, viewing, and resolving legal cases, along with file uploads and summaries.

## Features

- **Create Cases**: Add new legal cases with associated client details and upload case files (PDF).
- **View Cases**: View unresolved cases and access uploaded case files.
- **Resolve Cases**: Summarize case files and mark cases as resolved.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Technologies Used

### Frontend

- **React**: For building the user interface.
- **Vite**: For fast development and build processes.
- **Tailwind CSS**: For styling.
- **React Router**: For navigation.
- **Axios**: For API requests.

### Backend

- **Node.js**: For server-side logic.
- **Express.js**: For building RESTful APIs.
- **PostgreSQL**: For database management.
- **Multer**: For handling file uploads.
- **pdf-parse**: For extracting text from PDF files.
- **dotenv**: For environment variable management.

## Installation

### Prerequisites

- Node.js and npm installed.
- PostgreSQL installed and running.

### Backend Setup

1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `Backend` directory and configure the following variables:
   ```env
   DB_USER="your_db_user"
   DB_HOST="localhost"
   DB_DATABASE="your_db_name"
   DB_PASSWORD="your_db_password"
   DB_PORT=5432
   MODEL_NAME="your_model_name"
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the `Frontend` directory:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Open the application in your browser at `http://localhost:5173`.
2. Use the navigation bar to create, view, or resolve cases.
3. Upload case files in PDF format when creating a case.
4. View and summarize case files from the "View Case" or "Resolve Case" pages.

## Project Structure

### Backend

- `controllers/`: Contains logic for handling API requests.
- `models/`: Defines database schemas.
- `routes/`: Defines API endpoints.
- `uploads/`: Stores uploaded files.

### Frontend

- `src/components/`: Reusable UI components.
- `src/page/`: Pages for different views (e.g., Home, CreateCase, ViewCase).
- `src/lib/`: Utility functions.
