import DirectoryActionTypes from './directory.types';

const INITIAL_STATE = {
  sections: null,
  isFetching: false,
  errorMessage: undefined,
};

const directoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DirectoryActionTypes.FETCH_CARD_SETS_START:
      return {
        ...state,
        isFetching: true,
      };
    case DirectoryActionTypes.FETCH_CARD_SETS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        sections: action.payload,
      };
    case DirectoryActionTypes.FETCH_CARD_SETS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default directoryReducer;
