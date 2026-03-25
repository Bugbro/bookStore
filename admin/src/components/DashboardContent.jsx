import { useState } from "react";

// Font Awesome via CDN (injected via style tag)
const FA_CDN = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css";

const stats = [
    { label: "Total Books", value: "4,821", icon: "fa-book-open", change: "+12%", color: "#f59e0b" },
    { label: "Orders Today", value: "138", icon: "fa-shopping-cart", change: "+8%", color: "#10b981" },
    { label: "Total Revenue", value: "₹2,34,500", icon: "fa-indian-rupee-sign", change: "+21%", color: "#6366f1" },
    { label: "Active Users", value: "1,209", icon: "fa-users", change: "+5%", color: "#ef4444" },
];

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

const navItems = [
    { icon: "fa-gauge-high", label: "Dashboard", id: "dashboard" },
    { icon: "fa-books", label: "Books", id: "books" },
    { icon: "fa-cart-shopping", label: "Orders", id: "orders" },
    { icon: "fa-users", label: "Users", id: "users" },
    { icon: "fa-tags", label: "Categories", id: "categories" },
    { icon: "fa-chart-line", label: "Analytics", id: "analytics" },
    { icon: "fa-star", label: "Reviews", id: "reviews" },
    { icon: "fa-gear", label: "Settings", id: "settings" },
];

const statusColor = {
    Delivered: "bg-emerald-100 text-emerald-700",
    Processing: "bg-blue-100 text-blue-700",
    Shipped: "bg-amber-100 text-amber-700",
    Pending: "bg-rose-100 text-rose-700",
};

export default function DashboardContent() {
    const [active, setActive] = useState("dashboard");
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    return (
        <>
            <link rel="stylesheet" href={FA_CDN} />
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap');
        * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }
        .brand-font { font-family: 'Playfair Display', serif; }
        .sidebar-transition { transition: width 0.3s cubic-bezier(.4,0,.2,1); }
        .fade-in { animation: fadeIn 0.4s ease; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        .stat-card:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
        .stat-card { transition: transform 0.2s, box-shadow 0.2s; }
        .nav-item:hover { background: rgba(99,102,241,0.08); }
        ::-webkit-scrollbar { width: 5px; } ::-webkit-scrollbar-thumb { background: #c7d2fe; border-radius: 10px; }
      `}</style>

            <div className={`flex h-screen overflow-hidden ${darkMode ? "bg-gray-950 text-white" : "bg-slate-50 text-gray-800"}`}>

                {/* SIDEBAR */}
                <aside className={`${sidebarOpen ? "w-64" : "w-16"} sidebar-transition flex-shrink-0 ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"} border-r flex flex-col`}>
                    {/* Logo */}
                    <div className={`flex items-center gap-3 px-4 py-5 border-b ${darkMode ? "border-gray-800" : "border-gray-100"}`}>
                        <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0">
                            <i className="fa-solid fa-book-open text-white text-sm"></i>
                        </div>
                        {sidebarOpen && <span className="brand-font text-xl font-bold text-indigo-600 truncate">BookHaven</span>}
                    </div>

                    {/* Nav */}
                    <nav className="flex-1 py-4 overflow-y-auto">
                        {navItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => setActive(item.id)}
                                className={`nav-item w-full flex items-center gap-3 px-4 py-2.5 rounded-lg mx-2 mb-1 transition-all cursor-pointer
                  ${active === item.id
                                        ? "bg-indigo-50 text-indigo-600 font-semibold"
                                        : darkMode ? "text-gray-400 hover:text-white" : "text-gray-500"
                                    }`}
                                style={{ width: sidebarOpen ? "calc(100% - 16px)" : "40px" }}
                            >
                                <i className={`fa-solid ${item.icon} w-4 text-center flex-shrink-0 ${active === item.id ? "text-indigo-600" : ""}`}></i>
                                {sidebarOpen && <span className="text-sm truncate">{item.label}</span>}
                            </button>
                        ))}
                    </nav>

                    {/* Bottom user */}
                    {sidebarOpen && (
                        <div className={`px-4 py-4 border-t ${darkMode ? "border-gray-800" : "border-gray-100"} flex items-center gap-3`}>
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">A</div>
                            <div className="overflow-hidden">
                                <p className="text-xs font-semibold truncate">Admin</p>
                                <p className="text-xs text-gray-400 truncate">admin@bookhaven.in</p>
                            </div>
                        </div>
                    )}
                </aside>

                {/* MAIN */}
                <div className="flex-1 flex flex-col overflow-hidden">

                    {/* TOPBAR */}
                    <header className={`flex items-center justify-between px-6 py-4 border-b ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"} flex-shrink-0`}>
                        <div className="flex items-center gap-4">
                            <button onClick={() => setSidebarOpen(!sidebarOpen)} className={`p-2 rounded-lg hover:bg-indigo-50 transition-colors ${darkMode ? "hover:bg-gray-800 text-gray-300" : "text-gray-500"}`}>
                                <i className="fa-solid fa-bars"></i>
                            </button>
                            <div className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm ${darkMode ? "bg-gray-800 text-gray-300" : "bg-slate-100 text-gray-400"}`}>
                                <i className="fa-solid fa-magnifying-glass text-xs"></i>
                                <input placeholder="Search books, orders..." className="bg-transparent outline-none w-48 text-sm" />
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-lg transition-colors ${darkMode ? "text-yellow-400 hover:bg-gray-800" : "text-gray-500 hover:bg-slate-100"}`}>
                                <i className={`fa-solid ${darkMode ? "fa-sun" : "fa-moon"}`}></i>
                            </button>
                            <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors text-gray-500">
                                <i className="fa-solid fa-bell"></i>
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
                            </button>
                            <button className="flex items-center gap-2 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-colors">
                                <i className="fa-solid fa-plus text-xs"></i> Add Book
                            </button>
                        </div>
                    </header>

                    {/* CONTENT */}
                    <main className="flex-1 overflow-y-auto p-6 fade-in">

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
                                            {recentOrders.map((o, i) => (
                                                <tr key={i} className={`border-t ${darkMode ? "border-gray-800" : "border-gray-50"}`}>
                                                    <td className="py-3 text-indigo-500 font-medium">{o.id}</td>
                                                    <td className={`py-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{o.customer}</td>
                                                    <td className={`py-3 hidden md:table-cell ${darkMode ? "text-gray-400" : "text-gray-500"} text-xs`}>{o.book}</td>
                                                    <td className={`py-3 font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>{o.amount}</td>
                                                    <td className="py-3">
                                                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColor[o.status]}`}>{o.status}</span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className={`rounded-2xl ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"} border p-5`}>
                                <h2 className={`font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>Quick Actions</h2>
                                <div className="space-y-2">
                                    {[
                                        { icon: "fa-plus", label: "Add New Book", color: "bg-indigo-600 hover:bg-indigo-700" },
                                        { icon: "fa-truck", label: "Process Orders", color: "bg-emerald-600 hover:bg-emerald-700" },
                                        { icon: "fa-tag", label: "Manage Discounts", color: "bg-amber-500 hover:bg-amber-600" },
                                        { icon: "fa-download", label: "Export Reports", color: "bg-slate-600 hover:bg-slate-700" },
                                        { icon: "fa-bullhorn", label: "Send Newsletter", color: "bg-purple-600 hover:bg-purple-700" },
                                    ].map((a, i) => (
                                        <button key={i} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-white text-sm font-medium transition-colors ${a.color}`}>
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

                    </main>
                </div>
            </div>
        </>
    );
}