import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { toggleCartHidden, hideCart } from '../../redux/cart/cart.actions';
import {
  selectCartItemsCount,
  selectCartHidden,
} from '../../redux/cart/cart.selectors';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag2.svg';

import { ClickAwayListener } from '@material-ui/core';
import './cart-icon.styles.scss';

const CartIcon = ({ toggleCartHidden, itemCount, hideCart, isHidden }) => {
  // Only run if cart is open otherwise otherwise will interfere with components mounting when using search function
  const handleClick = () => {
    !isHidden && hideCart();
  };

  // ClickAwayListener from material UI - allowed to detect clicks off an item - used to close cart dropdown
  return (
    // Make sure touch event false or will fire before buttons being clicked!!!
    <ClickAwayListener onClickAway={handleClick} touchEvent={false}>
      <div className='cart-icon' onClick={toggleCartHidden}>
        <ShoppingIcon className='shopping-icon' />
        <span className='item-count'>{itemCount}</span>
      </div>
    </ClickAwayListener>
  );
};

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
  hideCart: () => dispatch(hideCart()),
});

const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount,
  isHidden: selectCartHidden,
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
