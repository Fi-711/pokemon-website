import { UserActionTypes } from './user.types';

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const logoutCurrentUser = () => ({
  type: UserActionTypes.LOGOUT_CURRENT_USER,
});

export const refreshAccessToken = (token) => ({
  type: UserActionTypes.REFRESH_ACCESS_TOKEN,
  payload: token,
});

export const addToWishlist = (item) => ({
  type: UserActionTypes.ADD_WISHLIST_ITEM,
  payload: item,
});

export const removeFromWishlist = (item) => ({
  type: UserActionTypes.REMOVE_WISHLIST_ITEM,
  payload: item,
});
