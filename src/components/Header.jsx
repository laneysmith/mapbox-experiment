import React, { useState, useEffect } from 'react';
import { ReactComponent as LocationIcon } from '../svg/location.svg';

const Header = ({ onClickUseCurrentLocation }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const onClickUseLocation = () => onClickUseCurrentLocation(currentLocation);

  // try to get user's current location from the browser on mount.
  // do this upfront instead of onClick because getCurrentPosition is slooow.
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const coords = {
        lon: position.coords.longitude,
        lat: position.coords.latitude,
      };
      setCurrentLocation(coords);
    });
  }, []);

  return (
    <header>
      <div className="title">
        <h1>FILTH FINDER 2.0</h1>
        <h2>find junk food near you</h2>
      </div>
      <div className="location-finder" onClick={onClickUseLocation}>
        {currentLocation && <LocationIcon />}
      </div>
    </header>
  );
};

export default Header;
