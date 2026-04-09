import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export const Orders = () => {
    const darkMode = useSelector(state => state.theme.darkMode);
    const [activeTab, setActiveTab] = useState("All");

    const stats = [
        { title: "Total Orders", value: "1,240", change: "+14.4%", isPositive: true },
        { title: "New Orders", value: "240", change: "+20%", isPositive: true },
        { title: "Completed Orders", value: "960", change: "+85%", isPositive: true },
        { title: "Canceled Orders", value: "87", change: "-5%", isPositive: false },
    ];

    const mockOrders = [
        { id: "#ORD0001", product: "Wireless Bluetooth Headphones", date: "01-01-2025", price: "49.99", payment: "Paid", status: "Delivered", statusIcon: "fa-truck" },
        { id: "#ORD0001", product: "Men's T-Shirt", date: "01-01-2025", price: "14.99", payment: "Unpaid", status: "Pending", statusIcon: "fa-clock-rotate-left" },
        { id: "#ORD0001", product: "Men's Leather Wallet", date: "01-01-2025", price: "49.99", payment: "Paid", status: "Delivered", statusIcon: "fa-truck" },
        { id: "#ORD0001", product: "Memory Foam Pillow", date: "01-01-2025", price: "39.99", payment: "Paid", status: "Shipped", statusIcon: "fa-truck-fast text-black dark:text-gray-300" },
        { id: "#ORD0001", product: "Adjustable Dumbbells", date: "01-01-2025", price: "14.99", payment: "Unpaid", status: "Pending", statusIcon: "fa-clock-rotate-left" },
        { id: "#ORD0001", product: "Coffee Maker", date: "01-01-2025", price: "79.99", payment: "Unpaid", status: "Cancelled", statusIcon: "fa-boxes-packing text-rose-500" },
        { id: "#ORD0001", product: "Casual Baseball Cap", date: "01-01-2025", price: "49.99", payment: "Paid", status: "Delivered", statusIcon: "fa-truck" },
        { id: "#ORD0001", product: "Full HD Webcam", date: "01-01-2025", price: "39.99", payment: "Paid", status: "Delivered", statusIcon: "fa-truck" },
        { id: "#ORD0001", product: "Smart LED Color Bulb", date: "01-01-2025", price: "79.99", payment: "Unpaid", status: "Delivered", statusIcon: "fa-truck" },
        { id: "#ORD0001", product: "Men's T-Shirt", date: "01-01-2025", price: "14.99", payment: "Unpaid", status: "Delivered", statusIcon: "fa-truck" },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return "text-emerald-500";
            case 'Pending': return "text-amber-500";
            case 'Shipped': return "text-gray-800 dark:text-gray-300";
            case 'Cancelled': return "text-rose-500";
            default: return "text-gray-500";
        }
    };

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
                        {["All order", "Completed", "Pending", "Canceled"].map((tab) => {
                            const isActive = activeTab === tab || (tab === "All order" && activeTab === "All");
                            return (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab === "All order" ? "All" : tab)}
                                    className={`px-4 py-2 font-medium text-[14px] whitespace-nowrap rounded-lg transition-colors ${isActive ? (darkMode ? "bg-emerald-900/30 text-emerald-400" : "bg-[#edf7ed] text-[#4caf50]") : (darkMode ? "text-gray-400 hover:bg-gray-800" : "text-[#718096] hover:bg-gray-50")}`}
                                >
                                    {tab} {tab === "All order" && <span className="ml-0.5 text-[12px] opacity-80">(240)</span>}
                                </button>
                            );
                        })}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 w-full xl:w-auto">
                        <div className={`flex items-center gap-2 px-3 h-10 rounded-lg border flex-grow xl:flex-grow-0 xl:w-[320px] transition-colors ${darkMode ? "bg-gray-800 border-gray-700 focus-within:border-emerald-500/50" : "bg-[#f8fafb] border-[#eaeef2] focus-within:border-[#4caf50]/50"}`}>
                            <i className={`fa-solid fa-magnifying-glass text-sm ${darkMode ? "text-gray-400" : "text-[#a0aec0]"}`}></i>
                            <input type="text" placeholder="Search order report" className={`bg-transparent text-[14px] w-full outline-none ${darkMode ? "text-white placeholder-gray-500" : "text-[#2d3748] placeholder-[#a0aec0]"}`} />
                        </div>
                        <button className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-colors ${darkMode ? "border-gray-700 text-gray-400 hover:bg-gray-800" : "border-[#eaeef2] text-[#718096] hover:bg-gray-50"}`}>
                            <i className="fa-solid fa-filter text-sm"></i>
                        </button>
                        <button className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-colors ${darkMode ? "border-gray-700 text-gray-400 hover:bg-gray-800" : "border-[#eaeef2] text-[#718096] hover:bg-gray-50"}`}>
                            <i className="fa-solid fa-arrow-down-wide-short text-sm"></i>
                        </button>
                        <button className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-colors ${darkMode ? "border-gray-700 text-gray-400 hover:bg-gray-800" : "border-[#eaeef2] text-[#718096] hover:bg-gray-50"}`}>
                            <i className="fa-solid fa-ellipsis text-sm"></i>
                        </button>
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
                            {mockOrders.map((o, i) => (
                                <tr key={i} className={`border-b last:border-0 ${darkMode ? "border-gray-800 hover:bg-gray-800/50 text-gray-300" : "border-[#e2e8f0] hover:bg-gray-50/50 text-[#4a5568]"}`}>
                                    <td className="px-6 py-4 hidden sm:table-cell">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-4 h-4 rounded border flex items-center justify-center ${darkMode ? "border-gray-600 bg-gray-800" : "border-[#cbd5e0] bg-white"} cursor-pointer`}></div>
                                            <span className="font-medium text-[15px]">1</span>
                                        </div>
                                    </td>
                                    <td className={`px-6 py-4 font-medium ${darkMode ? "text-gray-200" : "text-[#2d3748]"}`}>{o.id}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0 border ${darkMode ? "bg-gray-800 border-gray-700 text-gray-500" : "bg-white border-[#e2e8f0] text-gray-400 shadow-sm"}`}>
                                                <i className="fa-solid fa-image text-lg"></i>
                                            </div>
                                            <span className={`font-medium ${darkMode ? "text-gray-200" : "text-[#2d3748]"}`}>{o.product}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{o.date}</td>
                                    <td className={`px-6 py-4 font-semibold ${darkMode ? "text-gray-200" : "text-[#2d3748]"}`}>{o.price}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${o.payment === "Paid" ? "bg-emerald-500" : "bg-rose-500"}`}></div>
                                            <span className="font-medium">{o.payment}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className={`flex items-center gap-2 font-medium ${getStatusColor(o.status)}`}>
                                            <i className={`fa-solid ${o.statusIcon} ${o.statusIcon.includes('text-') ? "" : getStatusColor(o.status)}`}></i>
                                            {o.status}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* PAGINATION */}
                <div className={`flex flex-col sm:flex-row items-center justify-between p-6 border-t ${darkMode ? "border-gray-800" : "border-[#eaeef2]"}`}>
                    <button className={`w-[110px] h-10 flex flex-row items-center justify-center gap-2 rounded-lg border font-medium text-[14px] transition-colors ${darkMode ? "border-gray-700 text-gray-300 hover:bg-gray-800" : "border-[#cbd5e0] text-[#4a5568] hover:bg-gray-50"}`}>
                        <i className="fa-solid fa-arrow-left text-xs"></i> Previous
                    </button>
                    
                    <div className="flex items-center gap-1.5 my-4 sm:my-0">
                        {[1, 2, 3, 4, 5, '...', 24].map((page, idx) => {
                            const isPageActive = page === 1;
                            const isDots = page === '...';
                            return (
                                <button
                                    key={idx}
                                    className={`w-9 h-9 flex items-center justify-center rounded font-medium text-[14px] transition-colors ${isPageActive ? (darkMode ? "bg-emerald-900/50 text-emerald-400" : "bg-[#edf7ed] text-[#4caf50]") : isDots ? "text-gray-400 cursor-default" : (darkMode ? "border border-gray-700 text-gray-400 hover:bg-gray-800" : "border border-[#cbd5e0] text-[#718096] hover:bg-gray-50")}`}
                                    disabled={isDots}
                                >
                                    {page}
                                </button>
                            );
                        })}
                    </div>

                    <button className={`w-[110px] h-10 flex flex-row items-center justify-center gap-2 rounded-lg border font-medium text-[14px] transition-colors ${darkMode ? "border-gray-700 text-gray-300 hover:bg-gray-800" : "border-[#cbd5e0] text-[#4a5568] hover:bg-gray-50"}`}>
                        Next <i className="fa-solid fa-arrow-right text-xs"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};
