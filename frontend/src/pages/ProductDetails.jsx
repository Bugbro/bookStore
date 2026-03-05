import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchBookById } from "../redux/features/bookSlice.js";

const ProductDetails = () => {

  const {id} = useParams(); 
  
  const dispatch = useDispatch();
  const {books, loading} = useSelector((state)=> state.books);
  console.log(books.data);
  
  const book = books.data?.find((b)=> b._id === id );
  console.log(book);
  
  useEffect(()=>{
    if(!book){
      dispatch(fetchBookById(id));
    }
  },[id]);

  return (
    <div>
        HEllo this is product details
    </div>
  )
}

export default ProductDetails