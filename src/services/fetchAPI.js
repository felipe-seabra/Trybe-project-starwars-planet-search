const END_POINT = 'https://swapi.dev/api/planets';

function fetchAPI() {
  return fetch(END_POINT)
    .then((response) => response.json())
    .then((data) => data);
}

export default fetchAPI;
