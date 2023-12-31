import { CartActionTypes } from './cart.types';
import {
  addItemToCart,
  loadItemToCart,
  removeItemFromCart,
} from './cart.utils';

const INITIAL_STATE = { hidden: true, cartItems: [] };

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return { ...state, hidden: !state.hidden };
    case CartActionTypes.HIDE_CART:
      return { ...state, hidden: true };
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload),
      };
    case CartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload),
      };
    case CartActionTypes.CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.card_id !== action.payload.card_id
        ),
      };
    case CartActionTypes.LOAD_CART_FROM_DB:
      return {
        ...state,
        cartItems: loadItemToCart(state.cartItems, action.payload),
      };
    default:
      return state;
  }
};

export default cartReducer;
