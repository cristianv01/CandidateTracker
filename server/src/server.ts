
import express, {Express, Request, Response } from "express";
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config()

const app = express()

const PORT = process.env.port || 3000;

app.use(cors()); // Enable CORS - Configure origins later for security
app.use(express.json()); // Middleware to parse JSON bodies



// --- Database Connection Pool (Example) ---
// import { Pool } from 'pg';
// const pool = new Pool({ connectionString: process.env.DATABASE_URL });
// pool.query('SELECT NOW()', (err, res) => {
//   if (err) { console.error('DB Connection Error', err.stack); }
//   else { console.log('DB Connected:', res.rows[0].now); }
// });
// export { pool }; // Export pool for use in other modules
// --- Database Connection Pool (Example) ---
// import { Pool } from 'pg';
// const pool = new Pool({ connectionString: process.env.DATABASE_URL });
// pool.query('SELECT NOW()', (err, res) => {
//   if (err) { console.error('DB Connection Error', err.stack); }
//   else { console.log('DB Connected:', res.rows[0].now); }
// });
// export { pool }; // Export pool for use in other modules

//----API ROUTES----
app.get('/api/health', (req: Request, res: Response) => {
    res.json({status: 'ok', timeStamp: new Date().toISOString()});
});


// --- Start Server ---
app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
