import React, { useEffect, useState } from 'react';
import Image from 'next/image'; 
import { StarIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { addToBasket, removeFromBasket } from "../slices/basketSlice"

function CheckoutProduct({
    id, 
    title, 
    price, 
    description, 
    category, 
    image,
    hasPrime,
}) {

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });

      const [rating, setRating] = useState(0);

     useEffect(() => {
       setRating(Math.floor(Math.random() * 5) + 1);
      }, []);


      const dispatch = useDispatch();

      const addItemsToBasket = () => {
        const product = {
            id, 
            title, 
            price, 
            description, 
            category, 
            image,
            hasPrime,
      };

      //Push item into redux 
        dispatch(addToBasket(product));

      };

      //Remove item from redux 
      const removeItemFromBasket = () => {
        dispatch(removeFromBasket({ id }))
      }

  return (
    <div className="grid grid-cols-5">
        <Image
         src={image}
         height={200}
         width={200}
         objectFit="contain"
         alt="product image"
         />

         {/*middle*/}

         <div className="col-span-3 mx-5">
            <p>{title}</p> { rating > 0 && (
            <div className="flex">
                {Array(rating)
                .fill()
                .map((_, i)=> (
                    <StarIcon key={i} className="h-5 text-yellow-500" />
                ))}
            </div>
        )}
             <p className="text-xs my-2 line-clamp-3">{description}</p>
             <div className="mb-5">
               <span>{formatter.format(price)}</span>
             </div>

             {hasPrime && (
               <div className="flex items-center space-x-2 ">
                  <Image className="w-12" src="https://links.papareact.com/fdw" width={48} height={48} loading="lazy" alt="prime image" />
                  <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
               </div>
             )}
         </div>

         {/*Right add/remove button*/}
     <div className="flex flex-col space-y-2 my-auto justify-self-end">
         <button className="button" onClick={addItemsToBasket}>Add to Basket</button>
         <button className="button" onClick={removeItemFromBasket}>Remove from Basket</button>
     </div>
    </div>
  )
}

export default CheckoutProduct
