import React from 'react';
import { NavLink } from 'react-router-dom'; // Use NavLink for active styling
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Users, FileText, Settings } from 'lucide-react'; // Example icons

const Sidebar: React.FC = () => {
  // Helper function for NavLink className styling
  const getNavLinkClass = ({ isActive }: { isActive: boolean }): string =>
    `w-full justify-start ${
      isActive
        ? 'bg-muted text-primary hover:bg-muted' // Active style
        : 'hover:bg-accent hover:text-accent-foreground' // Non-active hover style
    }`;

  return (
    <aside className="hidden w-64 flex-col border-r bg-background p-4 md:flex">
      {/* Can add a logo/title here too if desired */}
      <nav className="flex flex-col gap-2">
        {/* Use NavLink for automatic active state styling */}
        <NavLink to="/admin/dashboard">
          {({ isActive }) => (
            <Button variant="ghost" className={getNavLinkClass({ isActive })}>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          )}
        </NavLink>
        <NavLink to="/admin/candidates">
          {({ isActive }) => (
            <Button variant="ghost" className={getNavLinkClass({ isActive })}>
              <Users className="mr-2 h-4 w-4" />
              Candidates
            </Button>
          )}
        </NavLink>
        <NavLink to="/admin/documents">
           {({ isActive }) => (
            <Button variant="ghost" className={getNavLinkClass({ isActive })}>
              <FileText className="mr-2 h-4 w-4" />
              Documents Overview
            </Button>
          )}
        </NavLink>
         {/* Add more links as needed */}
      </nav>
      <div className="mt-auto"> {/* Pushes Settings to the bottom */}
        <NavLink to="/admin/settings">
           {({ isActive }) => (
            <Button variant="ghost" className={getNavLinkClass({ isActive })}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          )}
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;