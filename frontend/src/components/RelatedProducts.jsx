import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRelatedBooks } from '../redux/features/bookSlice.js';

const RelatedProducts = ({bookCategory}) => {

  const dispatch = useDispatch();
  const relatedBooks = useSelector((state) => state.books.relatedBooks);
  
 const prevCategory = useRef(null);
//  re runs again agian end here
useEffect(() => {
  if (!bookCategory) return;

  if (prevCategory.current !== bookCategory) {
    dispatch(fetchRelatedBooks(bookCategory));
    prevCategory.current = bookCategory;
  }

}, [bookCategory, dispatch]);

  console.log(relatedBooks);

  return (
    <div className='text-xl font-semibold my-10'>
        <h2>Related Products</h2>
    </div>
  )
}

export default RelatedProducts