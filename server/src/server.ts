
import express, {Express, Request, Response } from "express";
import cors from 'cors';
import {Pool} from "pg"
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const PORT = process.env.port || 3000;
const adminsRoute = require('./routes/admin.ts')

app.use(cors()); // Enable CORS - Configure origins later for security
app.use(express.json()); // Middleware to parse JSON bodies


//--- DB Connection Pool
// const pool = new Pool({connectionString: process.env.DATABASE_URL,});

// (async () => {
//     try {
//       // Test the connection
//       const client = await pool.connect();
//       console.log('[server]: Database connected successfully!');
  
  
//       client.release();
//     } catch (err) {
//       console.error('[server]: Failed to connect to the database.', err);
      
//     }
//   })();
//----API ROUTES----
app.get('/api/health', (req: Request, res: Response) => {
    res.json({status: 'ok', timeStamp: new Date().toISOString()});
});

// app.post('/api/admin/roster');
app.use('/admins', adminsRoute);


// --- Start Server ---
app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
