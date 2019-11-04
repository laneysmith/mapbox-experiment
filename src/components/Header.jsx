import React from "react";
import { ReactComponent as LocationIcon } from "../svg/location.svg";

const Header = ({ location }) => {
  const onClickUseLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        var coords = {
          lon: position.coords.longitude,
          lat: position.coords.latitude
        };
        console.log("coords :", coords);
        location.updateLocationAction(coords);
      });
    }
  };

  return (
    <header>
      <div className="title">
        <h1>MAP-EXPERIMENT</h1>
        <span className="subtitle">subtitle</span>
      </div>
      <div className="location-finder" onClick={onClickUseLocation}>
        <span className="bounce-text">use your location</span>
        <LocationIcon />
      </div>
    </header>
  );
};

export default Header;
