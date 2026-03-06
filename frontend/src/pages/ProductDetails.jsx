import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchBookById } from "../redux/features/bookSlice.js";

const ProductDetails = () => {

  const {id} = useParams(); 
  
  const dispatch = useDispatch();
  const {books, singleBook, loading} = useSelector((state)=> state.books);
  
  const book = books.data?.find((b)=> b._id === id ) || singleBook;
  console.log(book);
  
    useEffect(()=>{
      if(!book){
        dispatch(fetchBookById(id));
      }
    },[id]);

  const [mainImage, setMainImage] = useState(book?.images[0]);
  if(loading) return <h3>Loading please wait</h3>
  return (
    <div className='px-28 py-3 my-10'>
        <h2>Products</h2>
        <div className='flex items-center gap-6 my-4'>
          {/* image container */}
          <div className='flex flex-col gap-2 py-2 '>
            <img src={mainImage} className=' w-80 h-96 border border-gray-200 px-2 rounded-md' alt="" />
            <div className='flex items-center gap-2 ' >
              {
                book?.images.map((item, i)=>(
                  <img onClick={()=>setMainImage(item)} src={item} alt="" className='w-10 h-10 rounded-md cursor-pointer' key={i}/>
                ))
              }
            </div>
            
          </div>
          {/* product descri */}
          <div className='flex-1 flex flex-col items-start gap-2'>
              <p className='bg-gray-200 px-3 py-2 w-fit text-[#0f8967] text-sm font-semibold'>In Stock</p>
              <h2 className=' font-semibold text-2xl'>{book?.title}</h2>
              <div className='flex gap-2 items-center border-b border-gray-200 w-full pb-3'>
                <p className='text-base font-semibold border-r-2 border-gray-200 pr-3'><span className='text-gray-500 text-xs mr-1'> Author: </span> {book?.author}</p>
                <span>
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`fa-star ${i < book?.rating ? "fa-solid text-yellow-400" : "fa-regular text-gray-300"}`}></i>
                  ))}
                </span>
              </div>
              <p className='text-[#0f8967] text-xl font-semibold'>Rs. {book?.price}</p>
              <p className='text-gray-500 text-sm '>{book?.description}</p>
          </div>
        </div>
    </div>
  )
}

export default ProductDetails