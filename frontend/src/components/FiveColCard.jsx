import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { useSelector } from "react-redux";

const FiveColCard = () => {
  const { books, loading } = useSelector((state)=> state.books);
  const products = books.data?.slice(0,4);
  
  if(loading) return <p>Loading...</p>;
  return (
    <div className="px-28 py-3 my-10">
      <div className="flex items-center justify-between ">
        <h2 className="text-2xl font-bold">Our Favourite Reads</h2>
        <Link to="/products" className="">
          View All Products
        </Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mt-6 ">
        {
          products.map((item, i)=>(
            <div className="flex flex-col gap-2 p-4">
          <img className="rounded-lg" src={item.images[0]} alt={item.title} />
          <p className="text-[#0f8967]">{item.author}</p>
          <h2 className="font-semibold">{item.title}</h2>
          <p>{[...Array(item.star)].map((_, i) => (
                <i key={i} className="fa-solid fa-star text-yellow-400"></i>
              ))} </p>
          <p className="font-semibold">${item.price}</p>
        </div>
          ))
        }

        <div className=" col-span-2 lg:col-span-2 flex flex-col gap-2 p-4">
          <img className="rounded-lg w-full h-102" src={products[0].images[0]} alt={products[0].title} />
          
        </div>

      </div>
    </div>
  );
};

export default FiveColCard;
