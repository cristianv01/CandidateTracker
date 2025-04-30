import React from 'react';
import { Outlet } from 'react-router-dom'; // Outlet renders the matched child route component
import Header from './Header.tsx';
import Sidebar from './Sidebar.tsx';

const Layout: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <div className="flex flex-1"> {/* Main content area takes remaining space */}
        <Sidebar />
        <main className="flex-1 p-6 md:p-8 lg:p-10 bg-muted/40">
          {/* Outlet will render the specific page component based on the route */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;