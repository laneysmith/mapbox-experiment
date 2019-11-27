/**
 * Converts the business list returned from the Yelp result into an
 * array of geojson features that mapbox can consume.
 * @param {array} businesses - the businesses property of the Yelp result
 * @return {array} array of geojson features
 */
export default function yelpResultsToMapBoxFeatures(businesses) {
  return businesses.map(business => {
    const { id, alias, name, coordinates, location, is_closed } = business;
    const { longitude, latitude } = coordinates;
    return {
      id,
      alias,
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [longitude, latitude],
      },
      properties: {
        name,
        address: location.display_address,
        isClosed: is_closed,
      },
    };
  });
}
