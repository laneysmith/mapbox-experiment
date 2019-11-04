import { useReducer } from "react";

const UPDATE_LOCATION = "UPDATE_LOCATION";

const initialState = {
  lon: -104.9876,
  lat: 39.7405
};

function reducer(state, action) {
  const { event, payload } = action;
  switch (event) {
    case UPDATE_LOCATION:
      return payload.coords;
    default:
      throw new Error();
  }
}

export default function useLocationReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const updateLocationAction = coords =>
    dispatch({ event: UPDATE_LOCATION, payload: { coords } });

  return {
    ...state,
    updateLocationAction,
    dispatch
  };
}
