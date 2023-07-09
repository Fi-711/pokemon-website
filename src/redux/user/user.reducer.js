import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
  accessToken: null,
  currentUser: null,
  name: null,
  isAdmin: null,
  wishlist: [],
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload.user,
        accessToken: action.payload.accessToken,
        name: action.payload.name,
        isAdmin: action.payload.isAdmin,
        wishlist: action.payload.wishlist,
      };
    case UserActionTypes.LOGOUT_CURRENT_USER:
      return {
        ...state,
        currentUser: null,
        accessToken: null,
        name: null,
        isAdmin: null,
        wishlist: [],
      };
    case UserActionTypes.REFRESH_ACCESS_TOKEN:
      return { ...state, accessToken: action.payload };
    case UserActionTypes.ADD_WISHLIST_ITEM:
      return { ...state, wishlist: [...state.wishlist, action.payload] };
    case UserActionTypes.REMOVE_WISHLIST_ITEM:
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (item) => item.card_id !== action.payload.card_id
        ),
      };
    default:
      return state;
  }
};

export default userReducer;
