import fakeData from './fake_results.json';

const terms = [
  // 'burgers',
  'candy',
  // 'comfortfood',
  'convenience',
  'diners',
  // 'hotdogs',
  'pubs',
  'sportsbars',
];

const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://filth-finder-go.herokuapp.com'
    : 'http://localhost:8080';

/**
 * Fetches the business results from the Yelp api.
 * @param {object} coordinates
 * @param {string} coordinates.longitude - longitude of map center
 * @param {string} coordinates.latitude - latitude of map center
 * @return {results} Yelp results
 */
export const getYelpResults = async ({ longitude, latitude }) => {
  return Promise.resolve(fakeData);
  // const url = `${API_URL}/custom?term=${terms}&longitude=${longitude}&latitude=${latitude}`;
  // const response = await fetch(url);
  //
  // if (response.status >= 400 && response.status < 600) {
  // throw new Error('Error retrieving results');
  // }
  //
  // const json = await response.json();
  // return json;
};
