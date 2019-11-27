import React, { Fragment, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import ReactDOM from 'react-dom';

import { getYelpResults } from '../api/yelp';
import useCurrentLocationReducer from '../hooks/useCurrentLocationReducer';
import useResultsReducer from '../hooks/useResultsReducer';
import Header from './Header';
import Drawer from './Drawer';
import Marker from './Marker';
import MarkerPopup from './MarkerPopup';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const Map = () => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const { coords, updateLocationAction } = useCurrentLocationReducer();
  const { businesses, loading, error, actions } = useResultsReducer();
  const { fetchResultsRequest, fetchResultsSuccess, fetchResultsFailure } = actions;

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
    // on move end, fetch results for new map center coordinates
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

  // update map location when lat/lon change via current location finder
  // this will trigger the 'moveend' method on the map and fetch new results
  useEffect(() => {
    const { lat, lon } = coords;
    mapRef.current.flyTo({
      center: [lon, lat],
    });
  }, [coords]);

  // add markers to map when results are updated
  // TODO: use a layer instead of markers
  useEffect(() => {
    if (businesses.length) {
      businesses.forEach(business => {
        const { properties, geometry } = business;
        // create marker node
        const markerNode = document.createElement('div');
        ReactDOM.render(<Marker alias={properties.alias} />, markerNode);
        // create marker pop up node
        const popupNode = document.createElement('div');
        ReactDOM.render(<MarkerPopup result={business} />, popupNode);
        // add marker to map
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
      <Drawer loading={loading} businesses={businesses} error={error} />
    </Fragment>
  );
};

export default Map;
