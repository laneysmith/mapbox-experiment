import React, { Fragment, useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import ReactDOM from 'react-dom';

import { getYelpResults } from '../api/yelp';
import useCurrentLocationReducer from '../hooks/useCurrentLocationReducer';
import useResultsReducer from '../hooks/useResultsReducer';

import Header from './Header';
import Drawer from './Drawer';
import MarkerPopup from './MarkerPopup';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const RESULTS_DATA_SOURCE = 'results';
const PLACES_LAYER = 'places';

const Map = () => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }));
  const { coords, updateLocationAction } = useCurrentLocationReducer();
  const { featureCollection, loading, actions } = useResultsReducer();
  const { fetchResultsRequest, fetchResultsSuccess, fetchResultsFailure } = actions;
  const [highlightedFeatureId, setHighlightedFeatureId] = useState(null);

  // functions for showing/hiding popup on map
  const showFeaturePopup = feature => {
    const popupNode = document.createElement('div');
    ReactDOM.render(<MarkerPopup feature={feature} />, popupNode);
    popUpRef.current
      .setLngLat(feature.geometry.coordinates)
      .setDOMContent(popupNode)
      .addTo(mapRef.current);
  };
  const hideFeaturePopup = () => popUpRef.current.remove();

  // initialize map when component mounts
  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      // there is a streets-v11 style, but for some reason not all sprites
      // (e.g., the 'marker' sprite) are available for versions >8
      // https://github.com/mapbox/mapbox-gl-styles
      style: 'mapbox://styles/mapbox/streets-v8',
      center: [coords.lon, coords.lat],
      zoom: 12.5,
    });

    // add navigation control (zoom buttons)
    mapRef.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    // add 'places' layer to which we'll append our feature collection data
    // after it is retrieved
    mapRef.current.on('load', () => {
      mapRef.current.addSource(RESULTS_DATA_SOURCE, {
        type: 'geojson',
        data: featureCollection,
      });

      mapRef.current.addLayer({
        id: PLACES_LAYER,
        source: RESULTS_DATA_SOURCE,
        type: 'symbol',
        layout: {
          // full list of icons here:  https://labs.mapbox.com/maki-icons/
          'icon-image': 'marker-15',
          'icon-padding': 0,
          'icon-allow-overlap': true,
        },
      });
    });

    // add popup to map when hovering over a result
    mapRef.current.on('mousemove', PLACES_LAYER, e => {
      if (e.features.length) {
        mapRef.current.getCanvas().style.cursor = 'pointer';
        const feature = e.features[0];
        showFeaturePopup(feature);
        setHighlightedFeatureId(feature.properties.id);
      }
    });

    // remove popup on mouseleave
    mapRef.current.on('mouseleave', PLACES_LAYER, () => {
      mapRef.current.getCanvas().style.cursor = '';
      hideFeaturePopup();
      setHighlightedFeatureId(null);
    });

    // update center coordinates on move end & fetch new results
    mapRef.current.on('moveend', () => {
      const { lng, lat } = mapRef.current.getCenter();
      fetchResultsRequest();
      getYelpResults({
        longitude: lng,
        latitude: lat,
      })
        .then(newFeatureCollection => {
          fetchResultsSuccess(newFeatureCollection);
          // append feature collection data to 'places' layer
          mapRef.current.getSource(RESULTS_DATA_SOURCE).setData(newFeatureCollection);
        })
        .catch(() => fetchResultsFailure());
    });

    // remove map on unmount
    return () => mapRef.current.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // update map location when lat/lon change via current location finder (the
  // flyTo action will trigger the 'moveend' method on the map and fetch new results)
  const onClickUseCurrentLocation = currentLocation => {
    updateLocationAction(currentLocation);
    const { lat, lon } = currentLocation;
    mapRef.current.flyTo({
      center: [lon, lat],
    });
  };

  return (
    <Fragment>
      <Header onClickUseCurrentLocation={onClickUseCurrentLocation} />
      <div className="map-container" ref={mapContainerRef} />
      <Drawer
        loading={loading}
        results={featureCollection.features}
        highlightedFeatureId={highlightedFeatureId}
        showFeaturePopup={showFeaturePopup}
        hideFeaturePopup={hideFeaturePopup}
      />
    </Fragment>
  );
};

export default Map;
