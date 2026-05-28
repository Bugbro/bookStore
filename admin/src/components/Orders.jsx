import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders, updateOrderStatus } from '../redux/features/Order/orderSlice';

const ORDER_STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled", "returned"];

export const Orders = () => {
    const dispatch = useDispatch();
    const darkMode = useSelector(state => state.theme.darkMode);
    const { ordersByRange, loading } = useSelector(state => state.order);
    const [activeTab, setActiveTab] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 4;
    console.log(ordersByRange);

    useEffect(() => {
        dispatch(fetchOrders({ range: "all", page: currentPage, limit }));
    }, [dispatch, currentPage]);

    const allOrders = ordersByRange.all?.orders || [];
    const pagination = ordersByRange.all?.pagination || { totalPages: 1, currentPage: 1, total: 0 };
    const { totalPages, total } = pagination;

    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 4) {
                pages.push(1, 2, 3, 4, 5, '...', totalPages);
            } else if (currentPage >= totalPages - 3) {
                pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }
        return pages;
    };

    const stats = [
        { title: "Total Orders", value: allOrders.length.toString(), change: "+14.4%", isPositive: true },
        { title: "New Orders", value: allOrders.filter(o => o.status?.toLowerCase() === 'pending').length.toString(), change: "+20%", isPositive: true },
        { title: "Completed Orders", value: allOrders.filter(o => ['delivered', 'completed'].includes(o.status?.toLowerCase())).length.toString(), change: "+85%", isPositive: true },
        { title: "Canceled Orders", value: allOrders.filter(o => ['cancelled', 'canceled'].includes(o.status?.toLowerCase())).length.toString(), change: "-5%", isPositive: false },
    ];

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered': case 'completed': return "text-emerald-500";
            case 'pending': return "text-amber-500";
            case 'shipped': return "text-blue-500";
            case 'cancelled': case 'canceled': return "text-rose-500";
            default: return "text-gray-500";
        }
    };

    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered': case 'completed': return "fa-truck text-emerald-500";
            case 'pending': return "fa-clock-rotate-left text-amber-500";
            case 'shipped': return "fa-truck-fast text-blue-500";
            case 'cancelled': case 'canceled': return "fa-boxes-packing text-rose-500";
            default: return "fa-circle-info text-gray-500";
        }
    };

    const filteredOrders = allOrders.filter(order => {
        const s = order.status?.toLowerCase();
        if (activeTab === "All") return true;
        if (activeTab === "Completed") return s === "delivered" || s === "completed";
        if (activeTab === "Pending") return s === "pending";
        if (activeTab === "Canceled") return s === "cancelled" || s === "canceled";
        return true;
    });

    return (
        <div className={`fade-in p-6 ${darkMode ? "text-gray-200" : "text-[#555]"} min-h-screen ${darkMode ? "bg-gray-950" : "bg-[#f8fafb]"}`}>
            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                {stats.map((s, i) => (
                    <div key={i} className={`p-6 rounded-2xl border flex flex-col justify-between ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-[#eaeef2]"}`}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className={`font-semibold text-[15px] ${darkMode ? "text-gray-300" : "text-[#4a5568]"}`}>{s.title}</h3>
                            <button className={`${darkMode ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-600"}`}>
                                <i className="fa-solid fa-ellipsis-vertical text-lg"></i>
                            </button>
                        </div>
                        <div className="flex items-center gap-2.5 mb-2">
                            <h2 className={`font-semibold text-3xl tracking-tight ${darkMode ? "text-white" : "text-[#1a202c]"}`}>{s.value}</h2>
                            <span className={`text-[13px] font-medium px-1.5 py-0.5 rounded ${s.isPositive ? (darkMode ? "text-emerald-400" : "text-emerald-500") : (darkMode ? "text-rose-400" : "text-rose-500")}`}>
                                <i className={`fa-solid ${s.isPositive ? "fa-arrow-up" : "fa-arrow-down"} text-[10px] mr-1`}></i>
                                {s.change}
                            </span>
                        </div>
                        <p className={`text-[13px] ${darkMode ? "text-gray-500" : "text-[#a0aec0]"}`}>Last 7 days</p>
                    </div>
                ))}
            </div>

            {/* MAIN TABLE CONTAINER */}
            <div className={`rounded-xl border ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-[#eaeef2]"} overflow-hidden shadow-sm`}>
                {/* TOOLBAR */}
                <div className="flex flex-col xl:flex-row items-center justify-between p-5 gap-4">
                    {/* Tabs */}
                    <div className="flex items-center gap-1 w-full xl:w-auto overflow-x-auto pb-2 xl:pb-0">
                        {/* ["All order", "Completed", "Pending", "Canceled"] can add this later */}
                        {["All order"].map((tab) => {
                            const isActive = activeTab === tab || (tab === "All order" && activeTab === "All");
                            return (
                                <button
                                    key={tab}
                                    onClick={() => {
                                        setActiveTab(tab === "All order" ? "All" : tab);
                                        setCurrentPage(1);
                                    }}
                                    className={`px-4 py-2 font-medium text-[14px] whitespace-nowrap rounded-lg transition-colors ${isActive ? (darkMode ? "bg-emerald-900/30 text-emerald-400" : "bg-[#edf7ed] text-[#4caf50]") : (darkMode ? "text-gray-400 hover:bg-gray-800" : "text-[#718096] hover:bg-gray-50")}`}
                                >
                                    {tab} {tab === "All order" && <span className="ml-0.5 text-[12px] opacity-80">({total || 0})</span>}
                                </button>
                            );
                        })}
                    </div>

                        
                </div>

                {/* TABLE */}
                <div className="overflow-x-auto w-full">
                    <table className="w-full text-left whitespace-nowrap">
                        <thead className={`${darkMode ? "bg-emerald-900/10 text-emerald-400 border-y border-gray-800" : "bg-[#edf7ed] text-[#388e3c] border-y border-[#e2e8f0]"} text-[14px] font-semibold tracking-wide`}>
                            <tr>
                                <th className="px-6 py-4 hidden sm:table-cell">No.</th>
                                <th className="px-6 py-4">Order Id</th>
                                <th className="px-6 py-4 min-w-[280px]">Product</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Price</th>
                                <th className="px-6 py-4">Payment</th>
                                <th className="px-6 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-[14px]">
                            {loading ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-10 text-gray-500">Loading orders...</td>
                                </tr>
                            ) : filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-10 text-gray-500">No orders found.</td>
                                </tr>
                            ) : filteredOrders.map((o, i) => {
                                const displayStatus = o.status ? o.status.charAt(0).toUpperCase() + o.status.slice(1) : "";

                                return (
                                    <tr key={o._id} className={`border-b last:border-0 ${darkMode ? "border-gray-800 hover:bg-gray-800/50 text-gray-300" : "border-[#e2e8f0] hover:bg-gray-50/50 text-[#4a5568]"}`}>
                                        <td className="px-6 py-4 hidden sm:table-cell">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-4 h-4 rounded border flex items-center justify-center ${darkMode ? "border-gray-600 bg-gray-800" : "border-[#cbd5e0] bg-white"} cursor-pointer`}></div>
                                                <span className="font-medium text-[15px]">{i + 1}</span>
                                            </div>
                                        </td>
                                        <td className={`px-6 py-4 font-medium ${darkMode ? "text-gray-200" : "text-[#2d3748]"}`}>#{o._id.slice(-6).toUpperCase()}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-3">
                                                {o.items?.map((item, idx) => {
                                                    const title = item?.bookId?.title || "Unknown/Deleted Book";
                                                    const image = item?.bookId?.images?.[0] || "";
                                                    return (
                                                        <div key={idx} className="flex items-center gap-4">
                                                            <div className={`w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0 border overflow-hidden ${darkMode ? "bg-gray-800 border-gray-700 text-gray-500" : "bg-white border-[#e2e8f0] text-gray-400 shadow-sm"}`}>
                                                                {image ? <img src={image} alt="product" className="w-full h-full object-cover" /> : <i className="fa-solid fa-image text-lg"></i>}
                                                            </div>
                                                            <span className={`font-medium line-clamp-1 max-w-[200px] ${darkMode ? "text-gray-200" : "text-[#2d3748]"}`} title={title}>{title}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">{new Date(o.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                                        <td className={`px-6 py-4 font-semibold ${darkMode ? "text-gray-200" : "text-[#2d3748]"}`}>₹{o.totalAmount}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${o.paymentMethod?.toLowerCase() === "cod" ? "bg-amber-500" : "bg-emerald-500"}`}></div>
                                                <span className="font-medium uppercase">{o.paymentMethod || "COD"}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className={`flex items-center gap-2 font-medium ${getStatusColor(o.status)}`}>
                                                <i className={`fa-solid ${getStatusIcon(o.status)}`}></i>
                                                <select
                                                    value={o.status || ""}
                                                    onChange={(e) => dispatch(updateOrderStatus({ id: o._id, status: e.target.value }))}
                                                    className={`bg-transparent outline-none cursor-pointer capitalize ${getStatusColor(o.status)}`}
                                                >
                                                    {ORDER_STATUSES.map(status => (
                                                        <option key={status} value={status} className={darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"}>
                                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                {/* PAGINATION */}
                <div className={`flex flex-col sm:flex-row items-center justify-between p-6 border-t ${darkMode ? "border-gray-800" : "border-[#eaeef2]"}`}>
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1 || loading}
                        className={`w-[110px] h-10 flex flex-row items-center justify-center gap-2 rounded-lg border font-medium text-[14px] transition-colors ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""} ${darkMode ? "border-gray-700 text-gray-300 hover:bg-gray-800" : "border-[#cbd5e0] text-[#4a5568] hover:bg-gray-50"}`}
                    >
                        <i className="fa-solid fa-arrow-left text-xs"></i> Previous
                    </button>

                    <div className="flex items-center gap-1.5 my-4 sm:my-0">
                        {getPageNumbers().map((page, idx) => {
                            const isPageActive = page === currentPage;
                            const isDots = page === '...';
                            return (
                                <button
                                    key={idx}
                                    onClick={() => !isDots && typeof page === 'number' && setCurrentPage(page)}
                                    className={`w-9 h-9 flex items-center justify-center rounded font-medium text-[14px] transition-colors ${isPageActive ? (darkMode ? "bg-emerald-900/50 text-emerald-400" : "bg-[#edf7ed] text-[#4caf50]") : isDots ? "text-gray-400 cursor-default" : (darkMode ? "border border-gray-700 text-gray-400 hover:bg-gray-800" : "border border-[#cbd5e0] text-[#718096] hover:bg-gray-50")}`}
                                    disabled={isDots || loading}
                                >
                                    {page}
                                </button>
                            );
                        })}
                    </div>

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages || loading}
                        className={`w-[110px] h-10 flex flex-row items-center justify-center gap-2 rounded-lg border font-medium text-[14px] transition-colors ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""} ${darkMode ? "border-gray-700 text-gray-300 hover:bg-gray-800" : "border-[#cbd5e0] text-[#4a5568] hover:bg-gray-50"}`}
                    >
                        Next <i className="fa-solid fa-arrow-right text-xs"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};
