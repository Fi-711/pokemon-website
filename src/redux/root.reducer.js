import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import directoryReducer from './directory/directory.reducer';
import cartReducer from './cart/cart.reducer';
import userReducer from './user/user.reducer';
import shopReducer from './shop/shop.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'cart'],
};

const rootReducer = combineReducers({
  directory: directoryReducer,
  shop: shopReducer,
  user: userReducer,
  cart: cartReducer,
});

export default persistReducer(persistConfig, rootReducer);
