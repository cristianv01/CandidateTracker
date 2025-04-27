
import express, {Express, Request, Response } from "express";
import cors from 'cors';
import {Pool} from "pg"
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const PORT = process.env.port || 3000;

app.use(cors()); // Enable CORS - Configure origins later for security
app.use(express.json()); // Middleware to parse JSON bodies


//--- DB Connection Pool
const pool = new Pool({connectionString: process.env.DATABASE_URL,});
// Use an async IIFE to handle top-level await
(async () => {
    try {
      // Test the connection
      const client = await pool.connect();
      console.log('[server]: Database connected successfully!');
  
      // Example query (optional here, better in route handlers)
      // const res = await client.query('SELECT $1::text as message', ['Hello world!']);
      // console.log('[server]: DB Query Result:', res.rows[0].message);
  
      client.release(); // Release the client back to the pool
    } catch (err) {
      console.error('[server]: Failed to connect to the database.', err);
      // Optionally exit the process if DB connection is critical
      // process.exit(1);
    }
  })();
//----API ROUTES----
app.get('/api/health', (req: Request, res: Response) => {
    res.json({status: 'ok', timeStamp: new Date().toISOString()});
});


// --- Start Server ---
app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
