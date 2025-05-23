'use client'

import Image from 'next/image';
import React, { useEffect,  useState } from 'react';
import { StarIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { addToBasket } from "../slices/basketSlice";

function Product({ id, title, price, description, category, image}) {
       const dispatch = useDispatch();

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });
            
      const [rating, setRating] = useState(0);

      useEffect(() => {
         setRating(Math.floor(Math.random() * 5) + 1);
      }, []);


      const [hasPrime] = useState(() => Math.random() < 0.5);

      const addItemToBasket = () => {
        const product ={
            id, 
            title, 
            price, 
            description, 
            category, 
            image,
            hasPrime,
        };
        
        // sending the product as an action to the REDUX store... the basket slice
        dispatch(addToBasket(product));
      };
    
  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">{category}</p>
      
      <Image src={image} height={200} width={200} objectFit="contain" />

      <h4 className="my-3">{title}</h4>
     { rating > 0 && (
       <div className="flex">
         {Array(rating)
         .fill()
         .map((_, i) => (
         <StarIcon key={i} className="h-5 text-yellow-500" />
         ))}
       </div>
     )}
       <p className="text-xs my-2 line-clamp-2" >{description}</p>

       <div className="mb-5">
         <span>{formatter.format(price)}</span>
       </div>

       {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
            <img className="w-12" src="https://links.papareact.com/fdw" alt="" />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
       )}

       <button onClick={addItemToBasket} className="mt-auto button">Add to Basket</button>
    </div>
  );
}

export default Product;
