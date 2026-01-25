# Racing Point Website

A modern, high-performance racing website built with cutting-edge web technologies, featuring smooth animations and a robust backend infrastructure.

## Tech Stack

### Frontend
- **Next.js** - React framework for production-grade applications
- **TypeScript** - Type-safe JavaScript for better code quality
- **GSAP** - Professional-grade animation library
- **Tailwind CSS** - Utility-first CSS framework

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, minimalist web framework

### Database
- **PostgreSQL** - Advanced open-source relational database

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- Git

### Installation

#### Step 1: Clone the Repository

```bash
git clone https://github.com/managerxp/racingpoint.git
cd racingpoint
```

#### Step 2: Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm i
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

#### Step 3: Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm i
```

Create a `.env` file in the backend directory with the following configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_database_password
DB_NAME=racingpoint_db

# Admin Credentials
ADMIN_EMAIL=admin@racingpoint.com
ADMIN_PASSWORD=your_admin_password

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here_change_this
JWT_EXPIRE=7d
```

#### Step 4: Database Setup

Create a new PostgreSQL database:

```sql
CREATE DATABASE racingpoint_db;
```

Update the `.env` file with your PostgreSQL credentials (username, password, and database name).

#### Step 5: Start the Backend

```bash
npm run dev
```

The backend will run on the port specified in your `.env` file (default: 5000).

## Running the Application

Once both servers are running:

- **Frontend**: `http://localhost:3000`
- **Backend**: `http://localhost:5000` (or your specified port)



## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Contact & Collaboration

For queries, suggestions, or collaboration opportunities:

- GitHub: [@managerxp](https://github.com/managerxp/)

## License

This project is open source and available under the [MIT License](LICENSE).

