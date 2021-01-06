import React from 'react';
import CartItem from './cartitem';
const CartList = ({movies, updateQuantity, deleteQuantity}) =>{
  console.log(updateQuantity);
  console.log(deleteQuantity);
  const cardComponent = movies.map((user, i) => {
    return <CartItem key={i} name={movies[i].movie_title} url={"https://image.tmdb.org/t/p/w500" + movies[i].poster_path} quantity={movies[i].quantity} unit_price={movies[i].unit_price} id={movies[i].movie_id} updateQuantity={updateQuantity} deleteQuantity={deleteQuantity}/>
  });
  return (
    <div className="block">
      {cardComponent}
    </div>
  );
}

export default CartList;
