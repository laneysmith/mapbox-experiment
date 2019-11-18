import { useReducer } from 'react';

const UPDATE_LOCATION = 'UPDATE_LOCATION';

const initialState = {
  lon: -104.9876,
  lat: 39.7405,
};

function coordinatesReducer(state, action) {
  const { event, payload } = action;
  switch (event) {
    case UPDATE_LOCATION:
      return payload.coords;
    default:
      throw new Error();
  }
}

export default function useLocationReducer() {
  const [coords, dispatch] = useReducer(coordinatesReducer, initialState);
  const updateLocationAction = coords => dispatch({ event: UPDATE_LOCATION, payload: { coords } });

  return {
    coords,
    updateLocationAction,
  };
}
