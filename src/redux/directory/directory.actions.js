import DirectoryActionTypes from './directory.types';
import axios from 'axios';

export const fetchCardSetsStart = () => ({
  type: DirectoryActionTypes.FETCH_CARD_SETS_START,
});

export const fetchCardSetsSuccess = (collectionsMap) => ({
  type: DirectoryActionTypes.FETCH_CARD_SETS_SUCCESS,
  payload: collectionsMap,
});

export const fetchCardSetsFailure = (errorMessage) => ({
  type: DirectoryActionTypes.FETCH_CARD_SETS_FAILURE,
  payload: errorMessage,
});

export const fetchCardSetsStartAsync = () => {
  return async (dispatch) => {
    dispatch(fetchCardSetsStart());
    try {
      let response = await axios.get('/api/card-sets');
      if (response.status === 200) {
        dispatch(fetchCardSetsSuccess(response.data));
      }
    } catch (error) {
      dispatch(fetchCardSetsFailure(error.message));
    }
  };
};
