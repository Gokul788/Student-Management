# Student Management

A simple and powerful web application for managing student information. Built using **MERN Stack** (MongoDB, Express.js, React, Node.js), this project allows users to **Add**, **View**, **Update**, and **Delete** student details easily.

## 🚀 Features

- **Add Student**: Register new students with essential details.
- **View Students**: List all registered students in a user-friendly table.
- **Edit Student**: Update existing student information.
- **Delete Student**: Remove students from the database.
- **Responsive Design**: Works seamlessly on both desktop and mobile devices.

## 🛠️ Tech Stack

- **Frontend**: React, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Other**: Tailwind CSS for styling

## ⚙️ Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/Gokul788/Student-Management.git
    cd Student-Management
    ```

2. **Install dependencies for both frontend and backend**:

    **Frontend**:
    ```bash
    cd frontend
    npm install
    ```

    **Backend**:
    ```bash
    cd ../backend
    npm install
    ```

3. **Setup environment variables**:

    Create a `.env` file in the `backend` directory and add your MongoDB URI:
    ```
    MONGO_URI=your_mongodb_connection_string
    PORT=5000
    ```

4. **Run the application**:

    Open two terminals:

    **Terminal 1**: (Backend)
    ```bash
    cd backend
    npm start
    ```

    **Terminal 2**: (Frontend)
    ```bash
    cd frontend
    npm start
    ```

5. **Open your browser**:
    - Visit [http://localhost:3000](http://localhost:3000)

## 📂 Project Structure

```plaintext
Student-Management/
├── frontend/         # Frontend code (React)
├── backend/          # Backend code (Express & MongoDB)
└── README.md
