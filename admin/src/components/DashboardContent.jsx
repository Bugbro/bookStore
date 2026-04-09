import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddBook from './AddBook.jsx';
import { fetchAllBooks } from '../redux/features/Book/bookSlice.js';
import { fetchOrders } from '../redux/features/Order/orderSlice.js';
import { getTotalRevenue } from '../redux/features/Admin/adminDashboardSlice.js';


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
    const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
    const darkMode = useSelector(state => state.theme.darkMode);
    const { books, loading: bookLoading } = useSelector(state => state.book);
    const { ordersByRange, loading: orderLoading } = useSelector(state => state.order || {});
    const todayOrders = ordersByRange?.today || [];
    const { totalRevenue, loading: totalRevenueLoading } = useSelector(state => state.adminDashboard || {});
    const { activeUsers } = useSelector((state) => state.socket);

    useEffect(() => {
        if (!books || books.length === 0) {
            dispatch(fetchAllBooks());
        }
        if (ordersByRange?.today === undefined) {
            dispatch(fetchOrders("today"));
        }
        if (totalRevenue === undefined) {
            dispatch(getTotalRevenue());
        }
    }, [dispatch, books, ordersByRange]);

    const stats = [
        { label: "Total Books", value: bookLoading ? "...." : books?.length, icon: "fa-book-open", change: "+12%", color: "#f59e0b" },
        { label: "Orders Today", value: orderLoading ? "...." : todayOrders?.length, icon: "fa-shopping-cart", change: "+8%", color: "#10b981" },
        { label: "Total Revenue", value: totalRevenueLoading ? "...." : totalRevenue, icon: "fa-indian-rupee-sign", change: "+21%", color: "#6366f1" },
        { label: "Active Users", value: activeUsers, icon: "fa-users", change: "+5%", color: "#ef4444" },
    ];

    return (
        <div className="fade-in">
            {/* Page Title */}
            <div className="mb-6">
                <h1 className={`brand-font text-2xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>Dashboard Overview</h1>
                <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Thursday, 26 March 2026 — Welcome back, Admin 👋</p>
            </div>

            {/* STATS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
                {stats.map((s, i) => (
                    <div key={i} className={`stat-card rounded-2xl p-5 ${darkMode ? "bg-gray-900" : "bg-white"} border ${darkMode ? "border-gray-800" : "border-gray-100"}`}>
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: s.color + "18" }}>
                                <i className={`fa-solid ${s.icon}`} style={{ color: s.color }}></i>
                            </div>
                            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{s.change}</span>
                        </div>
                        <p className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>{s.value}</p>
                        <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{s.label}</p>
                    </div>
                ))}
            </div>

            {/* MIDDLE ROW */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-6">

                {/* Recent Orders */}
                <div className={`xl:col-span-2 rounded-2xl ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"} border p-5`}>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className={`font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>Recent Orders</h2>
                        <button className="text-xs text-indigo-600 hover:underline font-medium">View All <i className="fa-solid fa-arrow-right text-xs ml-1"></i></button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className={`${darkMode ? "text-gray-500" : "text-gray-400"} text-xs uppercase`}>
                                    <th className="text-left pb-3 font-medium">Order ID</th>
                                    <th className="text-left pb-3 font-medium">Customer</th>
                                    <th className="text-left pb-3 font-medium hidden md:table-cell">Book</th>
                                    <th className="text-left pb-3 font-medium">Amount</th>
                                    <th className="text-left pb-3 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {todayOrders.slice(0, 5).map((o, i) => {
                                    const statusCapitalized = o.status ? o.status.charAt(0).toUpperCase() + o.status.slice(1) : "Pending";
                                    const bookName = o.items && o.items.length > 0 ? o.items[0]?.bookId?.title : "N/A";
                                    const finalBookDisplay = o.items && o.items.length > 1 ? `${bookName} +${o.items.length - 1}` : bookName;
                                    return (
                                        <tr key={o._id || i} className={`border-t ${darkMode ? "border-gray-800" : "border-gray-50"}`}>
                                            <td className="py-3 text-indigo-500 font-medium">#{o._id ? o._id.slice(-6).toUpperCase() : "N/A"}</td>
                                            <td className={`py-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{o.deliveryAddress?.name || "N/A"}</td>
                                            <td className={`py-3 hidden md:table-cell ${darkMode ? "text-gray-400" : "text-gray-500"} text-xs`}>{finalBookDisplay}</td>
                                            <td className={`py-3 font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>₹{o.totalAmount}</td>
                                            <td className="py-3">
                                                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColor[statusCapitalized] || statusColor.Pending}`}>{statusCapitalized}</span>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {todayOrders.length === 0 && !orderLoading && (
                                    <tr>
                                        <td colSpan="5" className={`py-4 text-center text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>No orders today.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className={`rounded-2xl ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"} border p-5`}>
                    <h2 className={`font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>Quick Actions</h2>
                    <div className="space-y-2">
                        {[
                            { icon: "fa-plus", label: "Add New Book", color: "bg-indigo-600 hover:bg-indigo-700", action: () => setIsAddBookModalOpen(true) },
                            { icon: "fa-truck", label: "Process Orders", color: "bg-emerald-600 hover:bg-emerald-700" },
                            { icon: "fa-tag", label: "Manage Discounts", color: "bg-amber-500 hover:bg-amber-600" },
                            { icon: "fa-download", label: "Export Reports", color: "bg-slate-600 hover:bg-slate-700" },
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

            {/* TOP BOOKS TABLE */}
            <div className={`rounded-2xl ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"} border p-5`}>
                <div className="flex items-center justify-between mb-4">
                    <h2 className={`font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>Top Selling Books</h2>
                    <button className="text-xs text-indigo-600 hover:underline font-medium">Manage Inventory <i className="fa-solid fa-arrow-right text-xs ml-1"></i></button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className={`text-xs uppercase ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                                <th className="text-left pb-3 font-medium">#</th>
                                <th className="text-left pb-3 font-medium">Title</th>
                                <th className="text-left pb-3 font-medium">Author</th>
                                <th className="text-left pb-3 font-medium">Price</th>
                                <th className="text-left pb-3 font-medium">Sales</th>
                                <th className="text-left pb-3 font-medium">Stock</th>
                                <th className="text-left pb-3 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topBooks.map((b, i) => (
                                <tr key={i} className={`border-t ${darkMode ? "border-gray-800" : "border-gray-50"}`}>
                                    <td className={`py-3 text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>{i + 1}</td>
                                    <td className={`py-3 font-medium ${darkMode ? "text-white" : "text-gray-800"}`}>{b.title}</td>
                                    <td className={`py-3 ${darkMode ? "text-gray-400" : "text-gray-500"} text-xs`}>{b.author}</td>
                                    <td className={`py-3 font-semibold ${darkMode ? "text-indigo-400" : "text-indigo-600"}`}>{b.price}</td>
                                    <td className="py-3">
                                        <div className="flex items-center gap-2">
                                            <div className={`h-1.5 rounded-full ${darkMode ? "bg-gray-800" : "bg-gray-100"} w-20`}>
                                                <div className="h-1.5 rounded-full bg-indigo-500" style={{ width: `${(b.sales / 320) * 100}%` }}></div>
                                            </div>
                                            <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{b.sales}</span>
                                        </div>
                                    </td>
                                    <td className="py-3">
                                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${b.stock === 0 ? "bg-rose-100 text-rose-600" : b.stock < 15 ? "bg-amber-100 text-amber-600" : "bg-emerald-100 text-emerald-600"}`}>
                                            {b.stock === 0 ? "Out of Stock" : `${b.stock} left`}
                                        </span>
                                    </td>
                                    <td className="py-3">
                                        <div className="flex items-center gap-2">
                                            <button className="p-1.5 rounded-lg text-indigo-500 hover:bg-indigo-50 transition-colors"><i className="fa-solid fa-pen-to-square text-xs"></i></button>
                                            <button className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"><i className="fa-solid fa-trash text-xs"></i></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Components */}
            {isAddBookModalOpen && <AddBook onClose={() => setIsAddBookModalOpen(false)} />}
        </div>
    );
}