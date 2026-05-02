import { assets } from "../assets/assets";

const BlogCard = () => {
    return (
        <div className="my-4 md:my-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-4 shadow rounded">
                    <img className="h-[250px] w-full rounded" src={assets.dummyImg} alt="Blog Image" />
                    <p className="text-xs text-[#17BD8D] font-semibold mt-2">February 26- By Admin</p>
                    <h3 className="text-lg font-semibold my-2 pb-2 border-b border-gray-200">A good reader always learns from every novels & books.</h3>
                    <div className="flex items-center justify-between gap-2">
                        <p className="text-sm">Category: Action & Adventure</p>
                        <a className="text-sm text-white px-4 py-1 rounded font-semibold bg-[#fd3131] " href="#">Read More</a>
                    </div>
                </div>
                <div className="bg-white p-4 shadow rounded">
                    <img className="h-[250px] w-full rounded" src={assets.dummyImg} alt="Blog Image" />
                    <p className="text-xs text-[#17BD8D] font-semibold mt-2">February 26- By Admin</p>
                    <h3 className="text-lg font-semibold my-2 pb-2 border-b border-gray-200">A good reader always learns from every novels & books.</h3>
                    <div className="flex items-center justify-between gap-2">
                        <p className="text-sm">Category: Action & Adventure</p>
                        <a className="text-sm text-white px-4 py-1 rounded font-semibold bg-[#fd3131] " href="#">Read More</a>
                    </div>
                </div>
                <div className="bg-white p-4 shadow rounded"><img className="h-[250px] w-full rounded" src={assets.dummyImg} alt="Blog Image" />
                    <p className="text-xs text-[#17BD8D] font-semibold mt-2">February 26- By Admin</p>
                    <h3 className="text-lg font-semibold my-2 pb-2 border-b border-gray-200">A good reader always learns from every novels & books.</h3>
                    <div className="flex items-center justify-between gap-2">
                        <p className="text-sm">Category: Action & Adventure</p>
                        <a className="text-sm text-white px-4 py-1 rounded font-semibold bg-[#fd3131] " href="#">Read More</a>
                    </div></div>
                <div className="bg-white p-4 shadow rounded"><img className="h-[250px] w-full rounded" src={assets.dummyImg} alt="Blog Image" />
                    <p className="text-xs text-[#17BD8D] font-semibold mt-2">February 26- By Admin</p>
                    <h3 className="text-lg font-semibold my-2 pb-2 border-b border-gray-200">A good reader always learns from every novels & books.</h3>
                    <div className="flex items-center justify-between gap-2">
                        <p className="text-sm">Category: Action & Adventure</p>
                        <a className="text-sm text-white px-4 py-1 rounded font-semibold bg-[#fd3131] " href="#">Read More</a>
                    </div></div>
                <div className="bg-white p-4 shadow rounded"><img className="h-[250px] w-full rounded" src={assets.dummyImg} alt="Blog Image" />
                    <p className="text-xs text-[#17BD8D] font-semibold mt-2">February 26- By Admin</p>
                    <h3 className="text-lg font-semibold my-2 pb-2 border-b border-gray-200">A good reader always learns from every novels & books.</h3>
                    <div className="flex items-center justify-between gap-2">
                        <p className="text-sm">Category: Action & Adventure</p>
                        <a className="text-sm text-white px-4 py-1 rounded font-semibold bg-[#fd3131] " href="#">Read More</a>
                    </div></div>
                <div className="bg-white p-4 shadow rounded"><img className="h-[250px] w-full rounded" src={assets.dummyImg} alt="Blog Image" />
                    <p className="text-xs text-[#17BD8D] font-semibold mt-2">February 26- By Admin</p>
                    <h3 className="text-lg font-semibold my-2 pb-2 border-b border-gray-200">A good reader always learns from every novels & books.</h3>
                    <div className="flex items-center justify-between gap-2">
                        <p className="text-sm">Category: Action & Adventure</p>
                        <a className="text-sm text-white px-4 py-1 rounded font-semibold bg-[#fd3131] " href="#">Read More</a>
                    </div></div>
            </div>
        </div>
    )
}

export default BlogCard;