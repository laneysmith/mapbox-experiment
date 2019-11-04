import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const Map = ({ location }) => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  // instantiate map when component mounts
  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v9",
      center: [location.lon, location.lat],
      zoom: 12.3
    });
    mapRef.current.addControl(new mapboxgl.NavigationControl(), "bottom-right");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // update map location when lat/lon change
  useEffect(() => {
    console.log("updating :", location.lon, location.lat);
    mapRef.current.flyTo({
      center: [location.lon, location.lat]
    });
  }, [location.lat, location.lon]);

  return <div className="map-container" ref={mapContainerRef} />;
};

export default Map;
