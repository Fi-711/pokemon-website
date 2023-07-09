import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import { Button, useColorMode } from '@chakra-ui/react';

import './cart-dropdown.styles.scss';

/*
  Cart dropdown - manually color coded for dark and light modes using colormode
 */
const CartDropdown = ({ cartItems, history, dispatch }) => {
  const { colorMode } = useColorMode();

  return (
    <div
      className={`cart-dropdown ${
        colorMode === 'dark' ? 'cart-dark' : 'cart-light'
      }`}
    >
      <div className='cart-items'>
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={uuidv4()} item={cartItem} />
          ))
        ) : (
          <span className='empty-message'>Your cart is empty</span>
        )}
      </div>

      <Button
        onClick={() => {
          history.push('/checkout');
          dispatch(toggleCartHidden());
        }}
        isFullWidth={true}
        mx='auto'
        mt={4}
        variant='solid'
        style={{
          color: '#1a1a1a',
          backgroundColor: '#ffcb05',
          border: '2px solid black',
        }}
      >
        Go To Checkout
      </Button>
    </div>
  );
};

// Memoized using reselect library
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

export default withRouter(connect(mapStateToProps)(CartDropdown));
