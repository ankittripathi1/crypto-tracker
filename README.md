# Full-Stack Crypto Tracker

This project is a full-stack cryptocurrency tracking application built for a technical assessment from VR Automations. It fetches live data from the CoinGecko API, displays the top 10 cryptocurrencies in a React dashboard, stores the data in a PostgreSQL database, and includes a scheduled background job to keep the data updated.

## Live Demo

*   **Frontend URL:** [https://crypto-tracker-one-woad.vercel.app/](https://crypto-tracker-one-woad.vercel.app/)
*   **Backend Base URL:** [https://crypto-tracker-sc9g.onrender.com/](https://crypto-tracker-sc9g.onrender.com/)

## Tech Stack

| Category      | Technology                                       |
|---------------|--------------------------------------------------|
| **Frontend**  | React, TypeScript, Vite, Tailwind CSS            |
| **Backend**   | Node.js, Express.js                              |
| **Database**  | PostgreSQL, Prisma (ORM)                         |
| **API**       | CoinGecko                                        |
| **Deployment**| Vercel (Frontend), Render (Backend)              |
| **Scheduling**| node-cron                                        |

## Features

-   **Live Data:** Displays the top 10 cryptocurrencies with real-time prices, 24-hour percentage change, and market cap.
-   **Database Storage:** Caches cryptocurrency data in a PostgreSQL database to reduce API calls and improve performance.
-   **Historical Data:** Stores a snapshot of price data periodically for potential future analysis.
-   **Scheduled Sync:** A background job runs automatically to fetch the latest data from the CoinGecko API.

## Setup and Installation

### Prerequisites

-   Node.js (v18.x or later recommended)
-   npm (or yarn/pnpm)
-   PostgreSQL database

### Installation Steps

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ankittripathi1/crypto-tracker.git
    cd crypto-tracker
    ```

2.  **Set up the Backend:**
    ```bash
    cd server
    npm install
    ```
    - Create a `.env` file in the `server` directory.
    - Add your PostgreSQL connection string to the `.env` file:
      ```env
      DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
      ```
    - Apply the database schema:
      ```bash
      npx prisma migrate deploy
      ```

3.  **Set up the Frontend:**
    ```bash
    cd ../client
    npm install
    ```

### Running the Application

1.  **Start the backend server:**
    ```bash
    # In the /server directory
    npm start
    ```
    The backend will be running at `http://localhost:3000`.

2.  **Start the frontend application:**
    ```bash
    # In the /client directory
    npm run dev
    ```
    The frontend will be accessible at `http://localhost:5173`.

## Background Job

The application uses a background job to periodically fetch and store cryptocurrency data.

-   **Technology:** The job is implemented using the `node-cron` library.
-   **Location:** The code for the job is located at `server/src/jobs/priceUpdateJob.js`.
-   **Schedule:** The job is configured to run **every hour**. The cron schedule is `0 * * * *`.
-   **Functionality:** When triggered, the job fetches the latest data for the top 10 cryptocurrencies from the CoinGecko API and updates the `CurrentData` and `HistoryData` tables in the database.

## Database Schema

The database consists of two tables, managed by Prisma:

1.  `CurrentData`: Stores the latest snapshot of each cryptocurrency. This table is updated frequently.
2.  `HistoryData`: Stores historical price and market data for each coin every time the background job runs.

## Screenshots

### Database Records

*(Please insert a screenshot of your database records here, showing sample data in the `current_data` or `history_data` tables.)*

![Database Screenshot](placeholder.png)

### Automation Setup

*(Please insert a screenshot of your cron job setup. For a service like Render, this would be a view of the Cron Job configuration page.)*

![Cron Job Screenshot](placeholder.png)