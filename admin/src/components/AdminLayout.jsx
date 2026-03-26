import { useState } from "react";
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { SideBar } from "./SideBar";
import { TopNavBar } from "./TopNavBar";

export const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const darkMode = useSelector(state => state.theme.darkMode);

    return (
        <div className={`flex h-screen overflow-hidden ${darkMode ? "bg-gray-950 text-white" : "bg-slate-50 text-gray-800"}`}>

            <SideBar sidebarOpen={sidebarOpen} />

            <div className="flex-1 flex flex-col overflow-hidden">

                <TopNavBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                {/* DYNAMIC CONTENT AREA */}
                <main className="flex-1 overflow-y-auto p-6 fade-in">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
