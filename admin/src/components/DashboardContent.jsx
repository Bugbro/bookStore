import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddBook from './AddBook.jsx';
import RecentOrders from './RecentOrders.jsx';
import { fetchAllBooks } from '../redux/features/Book/bookSlice.js';
import { fetchOrders } from '../redux/features/Order/orderSlice.js';
import { getTotalRevenue } from '../redux/features/Admin/adminDashboardSlice.js';
import { useNavigate } from "react-router-dom";
import { BooksList } from './BooksList.jsx';


const recentOrders = [
    { id: "#ORD-001", customer: "Arjun Sharma", book: "The Midnight Library", amount: "₹499", status: "Delivered", date: "26 Mar 2026" },
    { id: "#ORD-002", customer: "Priya Mehta", book: "Atomic Habits", amount: "₹349", status: "Processing", date: "25 Mar 2026" },
    { id: "#ORD-003", customer: "Rohan Verma", book: "Ikigai", amount: "₹299", status: "Shipped", date: "25 Mar 2026" },
    { id: "#ORD-004", customer: "Sneha Kapoor", book: "Rich Dad Poor Dad", amount: "₹399", status: "Pending", date: "24 Mar 2026" },
    { id: "#ORD-005", customer: "Kunal Tiwari", book: "Wings of Fire", amount: "₹279", status: "Delivered", date: "24 Mar 2026" },
];

const topBooks = [
    { title: "Atomic Habits", author: "James Clear", sales: 320, stock: 45, price: "₹349" },
    { title: "The Alchemist", author: "Paulo Coelho", sales: 290, stock: 12, price: "₹279" },
    { title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", sales: 250, stock: 28, price: "₹399" },
    { title: "Ikigai", author: "H. Garcia", sales: 210, stock: 0, price: "₹299" },
];

const statusColor = {
    Delivered: "bg-emerald-100 text-emerald-700",
    Processing: "bg-blue-100 text-blue-700",
    Shipped: "bg-amber-100 text-amber-700",
    Pending: "bg-rose-100 text-rose-700",
};

export default function DashboardContent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
    const darkMode = useSelector(state => state.theme.darkMode);
    const { books, totalBooks, loading: bookLoading } = useSelector(state => state.book);
    const { ordersByRange, loading: orderLoading } = useSelector(state => state.order || {});
    const todayOrders = ordersByRange?.today?.orders || [];
    const { totalRevenue, loading: totalRevenueLoading } = useSelector(state => state.adminDashboard || {});
    const { activeUsers } = useSelector((state) => state.socket);
    console.log(books);

    useEffect(() => {
        if (!books || books.length === 0) {
            dispatch(fetchAllBooks());
        }
        if (!ordersByRange?.today?.orders) {
            dispatch(fetchOrders({ range: "today", page: 1, limit: 10 }));
        }
        if (totalRevenue === undefined) {
            dispatch(getTotalRevenue());
        }
    }, [dispatch, books, ordersByRange]);

    const stats = [
        { label: "Total Books", value: bookLoading ? "...." : totalBooks, icon: "fa-book-open", change: "+12%", color: "#f59e0b" },
        { label: "Orders Today", value: orderLoading ? "...." : todayOrders?.length, icon: "fa-shopping-cart", change: "+8%", color: "#10b981" },
        { label: "Total Revenue", value: totalRevenueLoading ? "...." : totalRevenue, icon: "fa-indian-rupee-sign", change: "+21%", color: "#6366f1" },
        { label: "Active Users", value: activeUsers, icon: "fa-users", change: "+5%", color: "#ef4444" },
    ];

    return (
        <div className="fade-in">
            {/* Page Title */}
            <div className="mb-6">
                <h1 className={`brand-font text-2xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>Dashboard Overview</h1>
                <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Thursday, 26 March 2026 — Welcome back, Admin</p>
            </div>

            {/* STATS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
                {stats.map((s, i) => (
                    <div key={i} className={`stat-card rounded-2xl p-5 ${darkMode ? "bg-gray-900" : "bg-white"} border ${darkMode ? "border-gray-800" : "border-gray-100"}`}>
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: s.color + "18" }}>
                                <i className={`fa-solid ${s.icon}`} style={{ color: s.color }}></i>
                            </div>
                            {/* <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{s.change}</span> */}
                        </div>
                        <p className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>{s.value}</p>
                        <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{s.label}</p>
                    </div>
                ))}
            </div>

            {/* MIDDLE ROW */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-6">

                <RecentOrders />

                {/* Quick Actions */}
                <div className={`rounded-2xl ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"} border p-5`}>
                    <h2 className={`font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>Quick Actions</h2>
                    <div className="space-y-2">
                        {[
                            { icon: "fa-plus", label: "Add New Book", color: "bg-indigo-600 hover:bg-indigo-700", action: () => setIsAddBookModalOpen(true) },
                            { icon: "fa-truck", label: "Orders", color: "bg-emerald-600 hover:bg-emerald-700", action: () => navigate("/orders") },
                            // { icon: "fa-tag", label: "Manage Discounts", color: "bg-amber-500 hover:bg-amber-600" },
                            // { icon: "fa-download", label: "Export Reports", color: "bg-slate-600 hover:bg-slate-700" },
                            { icon: "fa-bullhorn", label: "Send Newsletter", color: "bg-purple-600 hover:bg-purple-700" },
                        ].map((a, i) => (
                            <button key={i} onClick={a.action} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-white text-sm font-medium transition-colors ${a.color}`}>
                                <i className={`fa-solid ${a.icon} w-4 text-center`}></i> {a.label}
                            </button>
                        ))}
                    </div>

                    {/* Mini stock alert */}
                    <div className="mt-5 p-3 bg-rose-50 rounded-xl border border-rose-100">
                        <p className="text-xs font-semibold text-rose-700 mb-1"><i className="fa-solid fa-triangle-exclamation mr-1"></i> Low Stock Alert</p>
                        <p className="text-xs text-rose-500">Ikigai — Out of stock!</p>
                        <p className="text-xs text-rose-500">The Alchemist — Only 12 left</p>
                    </div>
                </div>
            </div>

            {/* books component */}
            <BooksList />

            {/* Modal Components */}
            {isAddBookModalOpen && <AddBook onClose={() => setIsAddBookModalOpen(false)} />}
        </div>
    );
}