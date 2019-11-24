import { useReducer } from 'react';

import yelpResultsToMapBoxFeatures from '../utils/yelpResultsToMapBoxFeatures';

const FETCH_RESULTS_REQUEST = 'FETCH_RESULTS_REQUEST';
const FETCH_RESULTS_SUCCESS = 'FETCH_RESULTS_SUCCESS';
const FETCH_RESULTS_FAILURE = 'FETCH_RESULTS_FAILURE';

const initialState = {
  businesses: [],
  total: null,
  loading: false,
  error: false,
};

function resultsReducer(state, action) {
  const { event, payload } = action;
  switch (event) {
    case FETCH_RESULTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_RESULTS_SUCCESS: {
      const { businesses, total } = payload.results;
      return {
        businesses: yelpResultsToMapBoxFeatures(businesses),
        total,
        loading: false,
        error: false,
      };
    }
    case FETCH_RESULTS_FAILURE:
      return {
        ...initialState,
        error: false,
      };
    default:
      throw new Error();
  }
}

export default function useResultsReducer() {
  const [{ businesses, total, loading, error }, dispatch] = useReducer(
    resultsReducer,
    initialState
  );
  const fetchResultsRequest = () => dispatch({ event: FETCH_RESULTS_REQUEST });
  const fetchResultsSuccess = results =>
    dispatch({ event: FETCH_RESULTS_SUCCESS, payload: { results } });
  const fetchResultsFailure = () => dispatch({ event: FETCH_RESULTS_FAILURE });

  return {
    businesses,
    total,
    loading,
    error,
    actions: {
      fetchResultsRequest,
      fetchResultsSuccess,
      fetchResultsFailure,
    },
  };
}
