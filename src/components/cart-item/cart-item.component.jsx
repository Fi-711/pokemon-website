import React from 'react';

import './cart-item.styles.scss';

const CartItem = ({ item: { card_img_small, price, card_name, quantity } }) => {
  return (
    <div className='cart-item'>
      <img src={card_img_small} alt={card_name} />
      <div className='item-details'>
        <span className='name'>{card_name}</span>
        <span className='price'>
          {quantity} x £{price.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
