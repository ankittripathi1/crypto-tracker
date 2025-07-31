# VR Automation

This project is a full-stack application that displays cryptocurrency data. It consists of a React frontend and a Node.js backend.

## Tech Stack

### Frontend

- **Framework:** React
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Build Tool:** Vite

### Backend

- **Framework:** Express.js
- **Language:** JavaScript
- **Database:** PostgreSQL (with Prisma ORM)
- **Scheduling:** node-cron

## Setup Instructions

### Prerequisites

- Node.js
- npm
- PostgreSQL

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ankittripathi1/crypto-tracker.git
    cd crypto-tracker
    ```

2.  **Install frontend dependencies:**
    ```bash
    cd client
    npm install
    ```

3.  **Install backend dependencies:**
    ```bash
    cd ../server
    npm install
    ```

4.  **Set up the database:**
    - Create a PostgreSQL database.
    - Create a `.env` file in the `server` directory and add the `DATABASE_URL`:
      ```
      DATABASE_URL="database url"
      ```
    - Run the database migrations:
      ```bash
      npx prisma migrate deploy
      ```

### Running the Application

1.  **Start the backend server:**
    ```bash
    cd server
    npm start
    ```

2.  **Start the frontend development server:**
    ```bash
    cd ../client
    npm run dev
    ```

## Cron Job

The backend includes a cron job that runs every hour to update the cryptocurrency prices in the database. The job is defined in `server/src/jobs/priceUpdateJob.js` and is scheduled using `node-cron`.

The cron schedule is `0 * * * *`, which means the job runs at the beginning of every hour.


## Deployment


