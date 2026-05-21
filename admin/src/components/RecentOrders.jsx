import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from '../redux/features/Order/orderSlice.js';

const statusColor = {
    Delivered: "bg-emerald-100 text-emerald-700",
    Processing: "bg-blue-100 text-blue-700",
    Shipped: "bg-amber-100 text-amber-700",
    Pending: "bg-rose-100 text-rose-700",
};

export default function RecentOrders() {
    const dispatch = useDispatch();
    const darkMode = useSelector(state => state.theme.darkMode);
    const { ordersByRange, loading: orderLoading } = useSelector(state => state.order || {});
    const [selectedRange, setSelectedRange] = useState("today");
    const currentOrders = ordersByRange?.[selectedRange]?.orders || [];

    useEffect(() => {
        console.log(ordersByRange);
        if (selectedRange && !ordersByRange?.[selectedRange]?.orders) {
            dispatch(fetchOrders({ range: selectedRange, page: 1, limit: 10 }));
        }
    }, [dispatch, selectedRange, ordersByRange]);

    return (
        <div className={`xl:col-span-2 rounded-2xl ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"} border p-5`}>
            <div className="flex items-center justify-between mb-4">
                <h2 className={`font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>Recent Orders</h2>
                <select
                    value={selectedRange}
                    onChange={(e) => setSelectedRange(e.target.value)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg border outline-none cursor-pointer capitalize transition-all ${darkMode
                            ? "bg-gray-800 border-gray-700 text-gray-200 focus:border-indigo-500/50"
                            : "bg-white border-gray-200 text-gray-700 focus:border-indigo-500/50 shadow-sm"
                        }`}
                >
                    <option value="today">Today</option>
                    <option value="month">Month</option>
                    <option value="year">Year</option>
                    <option value="all">All</option>
                </select>
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
                        {currentOrders.slice(0, 5).map((o, i) => {
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
                        {currentOrders.length === 0 && !orderLoading && (
                            <tr>
                                <td colSpan="5" className={`py-4 text-center text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>No orders found for this range.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
