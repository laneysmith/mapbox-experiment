import { useReducer } from 'react';

const UPDATE_RESULTS = 'UPDATE_RESULTS';

const FETCH_RESULTS_REQUEST = 'FETCH_RESULTS_REQUEST';
const FETCH_RESULTS_SUCCESS = 'FETCH_RESULTS_SUCCESS';
const FETCH_RESULTS_FAILURE = 'FETCH_RESULTS_FAILURE';

const initialState = {
  results: {},
  loading: false,
};

function resultsReducer(state, action) {
  const { event, payload } = action;
  switch (event) {
    case FETCH_RESULTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_RESULTS_SUCCESS:
    case FETCH_RESULTS_FAILURE:
      return {
        results: payload && payload.results ? payload.results : {},
        loading: false,
      };
    default:
      throw new Error();
  }
}

export default function useResultsReducer() {
  const [{ results, loading }, dispatch] = useReducer(resultsReducer, initialState);
  const fetchResultsRequest = () => dispatch({ event: FETCH_RESULTS_REQUEST });
  const fetchResultsSuccess = results =>
    dispatch({ event: FETCH_RESULTS_SUCCESS, payload: { results } });
  const fetchResultsFailure = () => dispatch({ event: FETCH_RESULTS_FAILURE });

  return {
    results,
    loading,
    actions: {
      fetchResultsRequest,
      fetchResultsSuccess,
      fetchResultsFailure,
    },
  };
}
