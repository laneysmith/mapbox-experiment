import { useReducer } from 'react';

const FETCH_RESULTS_REQUEST = 'FETCH_RESULTS_REQUEST';
const FETCH_RESULTS_SUCCESS = 'FETCH_RESULTS_SUCCESS';
const FETCH_RESULTS_FAILURE = 'FETCH_RESULTS_FAILURE';

const initialState = {
  featureCollection: {
    type: 'FeatureCollection',
    features: [],
  },
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
      const { featureCollection } = payload;
      return {
        featureCollection,
        loading: false,
        error: false,
      };
    }
    case FETCH_RESULTS_FAILURE:
      return {
        ...initialState,
        error: true,
      };
    default:
      throw new Error();
  }
}

export default function useResultsReducer() {
  const [{ featureCollection, total, loading, error }, dispatch] = useReducer(
    resultsReducer,
    initialState
  );
  const fetchResultsRequest = () => dispatch({ event: FETCH_RESULTS_REQUEST });
  const fetchResultsSuccess = featureCollection =>
    dispatch({ event: FETCH_RESULTS_SUCCESS, payload: { featureCollection } });
  const fetchResultsFailure = () => dispatch({ event: FETCH_RESULTS_FAILURE });

  return {
    featureCollection,
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
