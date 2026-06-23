# Full-Stack Library Inventory Management Web Application

A responsive, enterprise-grade full-stack web application designed to streamline internal asset tracking, real-time stock allocation, and transactional logging. This project demonstrates core backend engineering, database management, and asynchronous data flows.

## 🚀 Core Features
*   **Complete CRUD Operations:** Seamlessly create, read, update, and delete entries for books, members, and active staff.
*   **Real-Time Status Tracking:** Implements live system flags to trace dynamic asset availability, reservations, and borrow statuses.
*   **Automated Logging:** Tracks transaction histories and calculates systemic overdue metrics for borrowed items.
*   **Responsive UI:** An intuitive, user-friendly frontend interface optimized for different device form factors. (seperate repo)

## 🛠️ Tech Stack
*   **Frontend:** HTML5, CSS3, Bootstrap, Modern JavaScript (ES6+ / Fetch API)
*   **Backend:** Node.js, Express.js (RESTful API architecture)
*   **Database:**  MySQL
*   **Environment & Tools:** npm, Git, Version Control

## 📁 Project Architecture
```text
├── config/             # Database connection setups
├── controllers/        # Logical controllers processing CRUD operations
├── migrations/         # Sequelize DB migration scripts (Schema version control)
├── models/             # Data schemas defining inventory properties
├── routes/             # Express.js REST API route declarations
├── seeders/            # Demo data injection files for local development
├── index.js            # Main application entry point
├── package.json        # Project metadata and dependencies
└── README.md
```

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/creepyherobrineIII/Cobblestone_Library.git
   cd Cobblestone_Library
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Run Database Migrations:**
   Ensure your local development database (MySQL/PostgreSQL) is running, then execute the Sequelize CLI commands to build the tables and inject seed data:
   ```bash
   # Run migrations to generate tables
   npx sequelize-db:migrate
   
   # (Optional) Run seeders to populate initial book catalog data
   npx sequelize-db:seed:all
   ```

4. **Configure Environment Variables (If applicable):**
   Create a `.env` file in the root directory and specify your configurations:
   ```env
   PORT=3000
   DB_URI=your_database_connection_string
   ```

5. **Launch the local development server:**
   ```bash
   npm start
   ```
   The application will run locally at `http://localhost:8080` (unless configured).


## 📄 License
This project is open-source and available under the MIT License.
