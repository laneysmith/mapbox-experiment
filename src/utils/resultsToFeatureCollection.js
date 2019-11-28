/**
 * Converts the business list returned from the Yelp result into a
 * geojson feature collection that mapbox can consume.
 * @param {array} businesses - the businesses property of the Yelp result
 * @return {object} geojson feature collection
 */
export default function resultsToFeatureCollection(businesses = []) {
  let features = [];
  if (businesses.length) {
    features = businesses.map(business => {
      const { id, alias, name, coordinates, location, is_closed } = business;
      const { longitude, latitude } = coordinates;
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
        properties: {
          id,
          alias,
          name,
          isClosed: is_closed,
          address: location.display_address.join(', '),
        },
      };
    });
  }
  return {
    type: 'FeatureCollection',
    features,
  };
}
