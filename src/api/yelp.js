// import fakeData from './fake_results.json';

const terms = [
  'burgers',
  'candy',
  'comfortfood',
  'convenience',
  'diners',
  'hotdogs',
  'pubs',
  'sportsbars',
];

const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://filth-finder-go.herokuapp.com'
    : 'http://localhost:8080';

export const getYelpResults = async ({ longitude, latitude }) => {
  // return Promise.resolve(fakeData);
  const response = await fetch(
    `${API_URL}/custom?term=${terms}&longitude=${longitude}&latitude=${latitude}`
  );

  if (response.status >= 400 && response.status < 600) {
    throw new Error('Error retrieving results');
  }

  const json = await response.json();
  return json;
};
