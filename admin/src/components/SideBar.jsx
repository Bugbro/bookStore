import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const navItems = [
    { icon: "fa-gauge-high", label: "Dashboard", id: "dashboard", path: "/dashboard" },
    { icon: "fa-books", label: "Books", id: "books", path: "/books" },
    { icon: "fa-cart-shopping", label: "Orders", id: "orders", path: "/orders" },
    { icon: "fa-users", label: "Users", id: "users", path: "/users" },
    { icon: "fa-tags", label: "Categories", id: "categories", path: "/categories" },
    { icon: "fa-chart-line", label: "Analytics", id: "analytics", path: "/analytics" },
    { icon: "fa-star", label: "Reviews", id: "reviews", path: "/reviews" },
    { icon: "fa-gear", label: "Settings", id: "settings", path: "/settings" },
];

export const SideBar = ({ sidebarOpen }) => {
    const darkMode = useSelector(state => state.theme.darkMode);
    const location = useLocation();

    return (
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
                {navItems.map(item => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.id}
                            to={item.path}
                            className={`nav-item flex items-center gap-3 px-4 py-2.5 rounded-lg mx-2 mb-1 transition-all
                  ${isActive
                                    ? "bg-indigo-50 text-indigo-600 font-semibold"
                                    : darkMode ? "text-gray-400 hover:text-white" : "text-gray-500"
                                }`}
                            style={{ width: sidebarOpen ? "calc(100% - 16px)" : "40px" }}
                        >
                            <i className={`fa-solid ${item.icon} w-4 text-center flex-shrink-0 ${isActive ? "text-indigo-600" : ""}`}></i>
                            {sidebarOpen && <span className="text-sm truncate">{item.label}</span>}
                        </Link>
                    );
                })}
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
    );
};