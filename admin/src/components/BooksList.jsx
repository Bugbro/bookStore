import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBook, fetchAllBooks } from '../redux/features/Book/bookSlice';
import AddBook from './AddBook';

export const BooksList = () => {

    const dispatch = useDispatch();
    const darkMode = useSelector(state => state.theme.darkMode);
    const { books } = useSelector(state => state.book);
    const [selectedBook, setSelectedBook] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleEditClick = (book) => {
        setSelectedBook(book);
        setIsEditModalOpen(true);
    };

    const handleDeleteClick = (id) => {
        if (window.confirm("Are you sure you want to delete this book?")) {
            dispatch(deleteBook(id));
        }
    }

    useEffect(() => {
        if (books.length === 0) {
            dispatch(fetchAllBooks());
        }
    }, [])
    return (
        <div className="fade-in">
            <div className="mb-6">
                <h1 className={`brand-font text-2xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>Books Management</h1>
                <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Manage your library collections, stock, and pricing.</p>
            </div>
            {books.length === 0 ? (
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
            ) : (
                <div className={`overflow-x-auto rounded-xl border ${darkMode ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"} shadow-sm`}>
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className={`${darkMode ? "bg-gray-800/50 border-gray-800 text-gray-400" : "bg-gray-50 border-gray-200 text-gray-500"} border-b text-sm font-medium uppercase tracking-wider`}>
                                <th className="py-4 px-6">Image</th>
                                <th className="py-4 px-6">Book Name</th>
                                <th className="py-4 px-6">Author</th>
                                <th className="py-4 px-6">Actual Price</th>
                                <th className="py-4 px-6">Selling Price</th>
                                <th className="py-4 px-6 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {books.map((book) => (
                                <tr key={book._id} className={`${darkMode ? "divide-gray-800 hover:bg-gray-800/40" : "divide-gray-200 hover:bg-gray-50"} transition-colors`}>
                                    <td className="py-4 px-6">
                                        <div className="w-12 h-16 rounded-md overflow-hidden border border-gray-200/20 shadow-sm">
                                            <img
                                                src={book.images?.[0] || 'https://via.placeholder.com/150'}
                                                alt={book.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </td>
                                    <td className={`py-4 px-6 font-medium ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
                                        {book.title}
                                    </td>
                                    <td className={`py-4 px-6 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                        {book.author}
                                    </td>
                                    <td className={`py-4 px-6 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                        <span className="line-through decoration-red-500/50 mr-1">₹{book.actualPrice}</span>
                                    </td>
                                    <td className={`py-4 px-6 font-semibold ${darkMode ? "text-emerald-400" : "text-emerald-600"}`}>
                                        ₹{book.sellingPrice}
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center justify-center gap-2">
                                            <button onClick={() => handleEditClick(book)} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${darkMode ? "hover:bg-gray-700 text-blue-400" : "hover:bg-blue-50 text-blue-600"}`} title="Edit">
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </button>
                                            <button onClick={() => handleDeleteClick(book._id)} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${darkMode ? "hover:bg-gray-700 text-red-400" : "hover:bg-red-50 text-red-600"}`} title="Delete">
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {isEditModalOpen && (
                <AddBook
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedBook(null);
                    }}
                    isEdit={true}
                    initialData={selectedBook}
                />
            )}
        </div>
    );
};
