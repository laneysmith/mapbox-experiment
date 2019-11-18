export default function yelpResultsToMapBoxFeatures(results) {
  return results.map(business => {
    const { id, alias, name, coordinates, location, is_closed } = business;
    const { longitude, latitude } = coordinates;
    return {
      id,
      alias,
      name,
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [longitude, latitude],
      },
      address: location.display_address,
      isClosed: is_closed,
    };
  });
}
