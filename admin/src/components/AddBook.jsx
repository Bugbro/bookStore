import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addBook, updateBook } from '../redux/features/Book/bookSlice';

export default function AddBook({ onClose, isEdit = false, initialData = null }) {
    const darkMode = useSelector(state => state.theme.darkMode);
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.book);
    const [formData, setFormData] = useState(
        initialData ? {
            title: initialData.title || '',
            author: initialData.author || '',
            sellingPrice: initialData.sellingPrice || '',
            actualPrice: initialData.actualPrice || '',
            stock: initialData.stock || '',
            category: initialData.category || '',
            description: initialData.description || '',
            image1: null,
            image2: null,
            image3: null,
            image4: null
        } : {
            title: '',
            author: '',
            sellingPrice: '',
            actualPrice: '',
            stock: '',
            category: '',
            description: '',
            image1: null,
            image2: null,
            image3: null,
            image4: null
        }
    );

    const [previews, setPreviews] = useState(
        initialData?.images && initialData.images.length > 0 ? {
            image1: initialData.images[0] || null,
            image2: initialData.images[1] || null,
            image3: initialData.images[2] || null,
            image4: initialData.images[3] || null
        } : {
            image1: null,
            image2: null,
            image3: null,
            image4: null
        }
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e, index) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setFormData({ ...formData, [`image${index}`]: file });
            setPreviews({ ...previews, [`image${index}`]: URL.createObjectURL(file) });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isEdit && (!formData.image1 || !formData.image2 || !formData.image3 || !formData.image4)) {
            toast.error("Please upload all 4 book cover images.");
            return;
        }

        if (isEdit) {
            const updatePayload = {
                title: formData.title,
                author: formData.author,
                sellingPrice: formData.sellingPrice,
                actualPrice: formData.actualPrice,
                stock: formData.stock,
                category: formData.category,
                description: formData.description,
            };
            try {
                await dispatch(updateBook({ id: initialData._id, data: updatePayload })).unwrap();
                toast.success("Book updated successfully!");
                onClose();
            } catch (error) {
                toast.error(error || "Failed to update book");
            }
            return;
        }

        const data = new FormData();
        data.append('title', formData.title);
        data.append('author', formData.author);
        data.append('sellingPrice', formData.sellingPrice);
        data.append('actualPrice', formData.actualPrice);
        data.append('stock', formData.stock);
        data.append('category', formData.category);
        data.append('description', formData.description);
        data.append('image1', formData.image1);
        data.append('image2', formData.image2);
        data.append('image3', formData.image3);
        data.append('image4', formData.image4);

        try {
            await dispatch(addBook(data)).unwrap();
            toast.success("Book added successfully!");
            onClose();
        } catch (error) {
            toast.error(error || "Failed to add book");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto" style={{ animation: "fadeIn 0.2s ease-out" }}>
            <div className={`relative w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-white"} my-auto animate-[slideUp_0.3s_ease-out]`}>
                {/* Header */}
                <div className={`flex items-center justify-between p-5 border-b ${darkMode ? "border-gray-800" : "border-gray-100"}`}>
                    <div>
                        <h2 className={`font-bold text-xl ${darkMode ? "text-white" : "text-gray-800"}`}>{isEdit ? "Update Book" : "Add New Book"}</h2>
                        <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{isEdit ? "Update the details below to modify the book in the inventory." : "Fill in the details below to add a new book to the inventory."}</p>
                    </div>
                    <button onClick={onClose} className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${darkMode ? "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700" : "bg-gray-100 text-gray-500 hover:text-gray-800 hover:bg-gray-200"}`}>
                        <i className="fa-solid fa-xmark text-sm"></i>
                    </button>
                </div>

                {/* Body Form */}
                <form onSubmit={handleSubmit} className="p-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                        {/* Title */}
                        <div className="space-y-1.5">
                            <label className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Book Title <span className="text-rose-500">*</span></label>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="e.g. Atomic Habits" className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${darkMode ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500" : "bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400"}`} />
                        </div>
                        {/* Author */}
                        <div className="space-y-1.5">
                            <label className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Author <span className="text-rose-500">*</span></label>
                            <input type="text" name="author" value={formData.author} onChange={handleChange} required placeholder="e.g. James Clear" className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${darkMode ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500" : "bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400"}`} />
                        </div>
                        {/* Actual Price */}
                        <div className="space-y-1.5">
                            <label className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Actual Price (₹) <span className="text-rose-500">*</span></label>
                            <input type="number" name="actualPrice" value={formData.actualPrice} onChange={handleChange} required min="0" placeholder="e.g. 499" className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${darkMode ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500" : "bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400"}`} />
                        </div>
                        {/* Selling Price */}
                        <div className="space-y-1.5">
                            <label className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Selling Price (₹) <span className="text-rose-500">*</span></label>
                            <input type="number" name="sellingPrice" value={formData.sellingPrice} onChange={handleChange} required min="0" placeholder="e.g. 399" className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${darkMode ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500" : "bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400"}`} />
                        </div>
                        {/* Stock */}
                        <div className="space-y-1.5">
                            <label className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Stock <span className="text-rose-500">*</span></label>
                            <input type="number" name="stock" value={formData.stock} onChange={handleChange} required min="0" placeholder="e.g. 50" className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${darkMode ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500" : "bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400"}`} />
                        </div>
                        {/* Category */}
                        <div className="space-y-1.5">
                            <label className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Category <span className="text-rose-500">*</span></label>
                            <select name="category" value={formData.category} onChange={handleChange} required className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-50 border-gray-200 text-gray-800"}`}>
                                <option value="" disabled>Select a category</option>
                                <option value="all">All </option>
                                <option value="history">History </option>
                                <option value="fiction">Fiction</option>
                                <option value="non-fiction">Non Fiction</option>
                                <option value="science">Science</option>
                                <option value="biography">Biography</option>
                                <option value="romantic">Romantic</option>
                                <option value="horror">Horror</option>
                                <option value="money">Money & Finance</option>
                                <option value="travel">Travel</option>
                            </select>
                        </div>
                        {/* Description */}
                        <div className="space-y-1.5 sm:col-span-2">
                            <label className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Description <span className="text-rose-500">*</span></label>
                            <textarea name="description" value={formData.description} onChange={handleChange} required rows={3} placeholder="Write a short book description here..." className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none ${darkMode ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500" : "bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400"}`}></textarea>
                        </div>

                        {/* Image Upload Area */}
                        <div className="space-y-1.5 sm:col-span-2">
                            <label className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Book Cover Images {isEdit ? "(Image update not supported)" : "(All 4 required)"} {!isEdit && <span className="text-rose-500">*</span>}</label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
                                {[1, 2, 3, 4].map((index) => (
                                    <label key={index} className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${darkMode ? "border-gray-700 bg-gray-800/50 hover:bg-gray-800" : "border-gray-300 bg-gray-50 hover:bg-gray-100"}`}>
                                        <div className="flex flex-col items-center justify-center w-full h-full text-center relative overflow-hidden rounded-xl">
                                            {previews[`image${index}`] ? (
                                                <>
                                                    <img src={previews[`image${index}`]} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity p-2">
                                                        <i className="fa-solid fa-pen text-white text-xl mb-1"></i>
                                                        <p className="text-xs font-medium text-white truncate w-full" title={formData[`image${index}`]?.name}>{formData[`image${index}`]?.name}</p>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6 px-2">
                                                    <i className={`fa-solid fa-cloud-arrow-up text-2xl mb-2 ${darkMode ? "text-gray-500" : "text-gray-400"}`}></i>
                                                    <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}><span className="font-semibold text-indigo-500">Image {index}</span></p>
                                                    <span className="text-[10px] text-rose-500 mt-1">{!isEdit ? "Required" : ""}</span>
                                                </div>
                                            )}
                                        </div>
                                        <input type="file" className="hidden" accept="image/*" disabled={isEdit} onChange={(e) => handleFileChange(e, index)} />
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className={`flex items-center justify-end gap-3 mt-6 pt-5 border-t ${darkMode ? "border-gray-800" : "border-gray-100"}`}>
                        <button type="button" onClick={onClose} disabled={loading} className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-colors ${darkMode ? "text-gray-300 hover:bg-gray-800" : "text-gray-600 hover:bg-gray-100"} disabled:opacity-50`}>Cancel</button>
                        <button type="submit" disabled={loading} className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white text-sm font-medium shadow-sm transition-colors flex items-center gap-2">
                            {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-cloud-arrow-up"></i>}
                            {loading ? (isEdit ? "Updating..." : "Publishing...") : (isEdit ? "Update Book" : "Publish Book")}
                        </button>
                    </div>
                </form>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px) scale(0.98); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
            `}</style>
        </div>
    );
}
