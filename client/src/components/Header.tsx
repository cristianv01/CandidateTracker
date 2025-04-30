import React from "react";
import {Button} from '@/components/ui/button'
import { Bell, UserCircle } from "lucide-react";


const Header: React.FC = () =>{

    return (
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
            <div>
                <h1 className="text-xl font-semibold">Candidate Tracker</h1>
            </div>

            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon">
                    <Bell className="h-6 w-6"/>
                    <span className="sr-only">Notifications</span>
                </Button>
                <Button variant="ghost" size="icon">
                    <UserCircle className="h-6 w-6"/>
                    <span className="sr-only">User Profile</span>
                </Button>
            </div>

        </header>
    )
};

export default Header;