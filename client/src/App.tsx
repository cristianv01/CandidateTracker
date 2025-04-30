import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import './index.css'; // Ensure Tailwind is imported
function App() {
  // const [backendStatus, setBackendStatus] = useState<string>('checking...');
  // const [timeStamp, setTimestamp] = useState<string | null>(null);

  // useEffect(() => {
  //   fetch('http://localhost:5001/api/health') // Use configured backend port
  //     .then(res => res.ok ? res.json() : Promise.reject(res))
  //     .then((data: { status: string, timeStamp: string }) => {
  //       setBackendStatus(data.status);
  //       setTimestamp(data.timeStamp);
  //     })
  //     .catch(err => {
  //       console.error("Failed to connect to backend:", err);
  //       setBackendStatus('error');
  //       setTimestamp(null);
  //     });
  // }, []);


   // --- Placeholder Page Components (Create these basic files) ---
   const DashboardPage = () => <h2 className="text-2xl font-bold">Admin Dashboard</h2>;
   const CandidatesPage = () => <h2 className="text-2xl font-bold">Candidate List</h2>;
   const DocumentsPage = () => <h2 className="text-2xl font-bold">Documents Overview</h2>;
   const SettingsPage = () => <h2 className="text-2xl font-bold">Settings</h2>;
   const LoginPage = () => <h2 className="text-2xl font-bold">Login Page</h2>; // Add later
   const NotFoundPage = () => <h2 className="text-2xl font-bold">404 - Page Not Found</h2>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* <h1 className="text-3xl font-bold text-blue-700 mb-4">Candidate Tracker</h1>
      <p className="text-lg">Backend Status:
        <span className={`ml-2 font-semibold ${backendStatus === 'ok' ? 'text-green-600' : 'text-red-600'}`}>
          {backendStatus}
        </span>
      </p>
      {timeStamp && <p className="text-sm text-gray-500">Server Time: {new Date(timeStamp).toLocaleString()}</p>} */}
      <BrowserRouter>
          <Routes>
            {/* Routes that use the main Layout */}
            <Route path="/admin" element={<Layout />}>
              {/* Default route for /admin */}
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="candidates" element={<CandidatesPage />} />
              <Route path="documents" element={<DocumentsPage />} />
              <Route path="settings" element={<SettingsPage />} />
              {/* Add more admin routes here */}
            </Route>

            {/* Routes without the main Layout (e.g., Login) */}
            <Route path="/login" element={<LoginPage />} />

            {/* Optional: Redirect root path or add a public landing page */}
            <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

            {/* Catch-all 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
    </div>
    
  );
}
export default App;