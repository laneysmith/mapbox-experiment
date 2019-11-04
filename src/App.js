import React, { Fragment } from "react";

import Header from "./components/Header";
import Map from "./components/Map";
import useLocationReducer from "./useLocationReducer";
import "./App.css";

const App = () => {
  const location = useLocationReducer();
  return (
    <Fragment>
      <Header location={location} />
      <Map location={location} />
    </Fragment>
  );
};

export default App;
