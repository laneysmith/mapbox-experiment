import fakeData from './fake_results.json';

const terms = [
  'burgers',
  // 'candy',
  // 'comfortfood',
  // 'convenience',
  // 'diners',
  // 'hotdogs',
  // 'pubs',
  // 'sportsbars',
];

const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://filth-finder-go.herokuapp.com'
    : 'http://localhost:8080';

export function getYelpResults({ longitude, latitude }) {
  return Promise.resolve(fakeData);
}
