import { useSelector } from 'react-redux';

export const BooksList = () => {
    const darkMode = useSelector(state => state.theme.darkMode);

    return (
        <div className="fade-in">
            <div className="mb-6">
                <h1 className={`brand-font text-2xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>Books Management</h1>
                <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Manage your library collections, stock, and pricing.</p>
            </div>

            <div className={`rounded-2xl ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"} border p-8 flex flex-col items-center justify-center min-h-[400px]`}>
                <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center mb-4">
                    <i className="fa-solid fa-book-open text-indigo-600 text-2xl"></i>
                </div>
                <h2 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>Books List Coming Soon!</h2>
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"} text-center max-w-sm mt-2`}>
                    This is a placeholder for the book management system. You'll be able to add, edit, and delete books here.
                </p>
                <button className="mt-6 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-colors">
                    Add Your First Book
                </button>
            </div>
        </div>
    );
};
