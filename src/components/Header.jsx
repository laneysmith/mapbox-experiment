import React, { useState } from 'react';
import { ReactComponent as LocationIcon } from '../svg/location.svg';

const Header = ({ updateLocationAction }) => {
  const [loadingLocation, setLoadingLocation] = useState(false);

  const onClickUseLocation = () => {
    setLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const coords = {
          lon: position.coords.longitude,
          lat: position.coords.latitude,
        };
        updateLocationAction(coords);
      });
      setLoadingLocation(false);
    }
  };

  return (
    <header>
      <div className="title">
        <h1>FILTH FINDER 2.0</h1>
        <h2>find junk food near you</h2>
      </div>
      <div className="location-finder" onClick={onClickUseLocation}>
        {loadingLocation ? <span>Finding your location...</span> : <LocationIcon />}
      </div>
    </header>
  );
};

export default Header;
