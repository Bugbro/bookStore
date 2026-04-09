import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddBook from './AddBook.jsx';
import { adminLogoutThunk } from '../redux/features/authSlice.js';
import { toggleDarkMode } from "../redux/features/themeSlice";

export const TopNavBar = ({ sidebarOpen, setSidebarOpen }) => {
    const dispatch = useDispatch();
    const darkMode = useSelector(state => state.theme.darkMode);
    const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);

    const handleLogout = () => {
        dispatch(adminLogoutThunk());
    };

    const handleToggleDarkMode = () => {
        dispatch(toggleDarkMode());
    };

    return (
        <header className={`flex items-center justify-between px-6 py-4 border-b ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"} flex-shrink-0`}>
            <div className="flex items-center gap-4">
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className={`p-2 rounded-lg hover:bg-indigo-50 transition-colors ${darkMode ? "hover:bg-gray-800 text-gray-300" : "text-gray-500"}`}>
                    <i className="fa-solid fa-bars"></i>
                </button>
                <div className={`hidden sm:block flex items-center gap-2 px-3 py-2 rounded-xl text-sm ${darkMode ? "bg-gray-800 text-gray-300" : "bg-slate-100 text-gray-400"}`}>
                    <i className="fa-solid fa-magnifying-glass text-xs"></i>
                    <input placeholder="Search books, orders..." className="bg-transparent outline-none w-48 text-sm" />
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button onClick={handleToggleDarkMode} className={`p-2 rounded-lg transition-colors ${darkMode ? "text-yellow-400 hover:bg-gray-800" : "text-gray-500 hover:bg-slate-100"}`}>
                    <i className={`fa-solid ${darkMode ? "fa-sun" : "fa-moon"}`}></i>
                </button>
                <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors text-gray-500">
                    <i className="fa-solid fa-bell"></i>
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
                </button>
                <button onClick={() => setIsAddBookModalOpen(true)} className="flex items-center gap-2 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-colors">
                    <i className="fa-solid fa-plus text-xs"></i> <span className="hidden sm:block">Add Book</span>
                </button>
                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors">Logout</button>
            </div>

            {isAddBookModalOpen && <AddBook onClose={() => setIsAddBookModalOpen(false)} />}
        </header>
    );
};