import React, { Fragment, useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import ReactDOM from 'react-dom';

import { getYelpResults } from '../api/yelp';
import Header from './Header';
import Drawer from './Drawer';
import Marker from './Marker';
import MarkerPopup from './MarkerPopup';
import useLocationReducer from './useLocationReducer';
import useResultsReducer from './useResultsReducer';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const Map = () => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const { coords, updateLocationAction } = useLocationReducer();
  const { businesses, loading, error, actions } = useResultsReducer();
  const { fetchResultsRequest, fetchResultsSuccess, fetchResultsFailure } = actions;
  // const [selectedIndex, setSelectedIndex] = useState(null);

  // initialize map when component mounts
  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [coords.lon, coords.lat],
      zoom: 12.5,
    });
    // add navigation control (zoom buttons)
    mapRef.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
    // update center coordinates on move end & fetch new results
    mapRef.current.on('moveend', () => {
      const { lng, lat } = mapRef.current.getCenter();
      fetchResultsRequest();
      getYelpResults({
        longitude: lng,
        latitude: lat,
      })
        .then(response => fetchResultsSuccess(response))
        .catch(() => fetchResultsFailure());
    });

    // remove map on unmount
    return () => mapRef.current.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // update map location when lat/lon change via location finder
  useEffect(() => {
    const { lat, lon } = coords;
    mapRef.current.flyTo({
      center: [lon, lat],
    });
  }, [coords]);

  // add markers to map when results are updated
  useEffect(() => {
    if (businesses.length) {
      businesses.forEach(business => {
        const { alias, geometry } = business;
        const markerNode = document.createElement('div');
        ReactDOM.render(<Marker alias={alias} />, markerNode);
        const popupNode = document.createElement('div');
        ReactDOM.render(<MarkerPopup result={business} />, popupNode);
        new mapboxgl.Marker(markerNode)
          .setLngLat(geometry.coordinates)
          .setPopup(new mapboxgl.Popup({ offset: 15 }).setDOMContent(popupNode))
          .addTo(mapRef.current);
      });
    }
  }, [businesses]);

  return (
    <Fragment>
      <Header updateLocationAction={updateLocationAction} />
      <div className="map-container" ref={mapContainerRef} />
      <Drawer
        loading={loading}
        businesses={businesses}
        error={error}
        // selectedIndex={selectedIndex}
      />
    </Fragment>
  );
};

export default Map;
