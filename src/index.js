import './sass/main.scss';
import fetchCountries from './js/fetchCountries';
import refs from './js/refs.js';
import debounce from 'lodash.debounce';

refs.input.addEventListener('input', debounce(handlerChangeInput, 500));

function handlerChangeInput(e) {
  const queryCountry = e.target.value;
  fetchCountries(queryCountry);
}
