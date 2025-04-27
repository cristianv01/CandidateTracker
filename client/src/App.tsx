import { useEffect, useState } from 'react';
import './index.css'; // Ensure Tailwind is imported
function App() {
  const [backendStatus, setBackendStatus] = useState<string>('checking...');
  const [timeStamp, setTimestamp] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:5001/api/health') // Use configured backend port
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then((data: { status: string, timeStamp: string }) => {
        setBackendStatus(data.status);
        setTimestamp(data.timeStamp);
      })
      .catch(err => {
        console.error("Failed to connect to backend:", err);
        setBackendStatus('error');
        setTimestamp(null);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Candidate Tracker</h1>
      <p className="text-lg">Backend Status:
        <span className={`ml-2 font-semibold ${backendStatus === 'ok' ? 'text-green-600' : 'text-red-600'}`}>
          {backendStatus}
        </span>
      </p>
      {timeStamp && <p className="text-sm text-gray-500">Server Time: {new Date(timeStamp).toLocaleString()}</p>}
  
    </div>
  );
}
export default App;