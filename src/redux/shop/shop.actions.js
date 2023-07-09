import ShopActionTypes from './shop.types';
import axios from 'axios';

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
});

export const fetchCollectionsFailure = (errorMessage) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage,
});

export const fetchCollectionsStartAsync = () => {
  return async (dispatch) => {
    dispatch(fetchCollectionsStart());
    try {
      let response = await axios.get('/api/shop');
      if (response.status === 200) {
        dispatch(fetchCollectionsSuccess(response.data));
      }
    } catch (error) {
      dispatch(fetchCollectionsFailure(error.message));
    }
  };
};
