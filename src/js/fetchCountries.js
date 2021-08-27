import countryListTmpl from '../templates/country-list.hbs';
import countryCardTmpl from '../templates/country-card.hbs';
import refs from './refs';
import { info, error } from '../../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';

export default function fetchCountries(searchQuery) {
  fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
    .then(r => r.json())
    .then(result => {
      switch (true) {
        case result.length === 1:
          result.map(country => createCountryCard(country));
          break;
        case result.length > 1 && result.length < 11:
          createListCountryMarkup(result);
          break;
        case result.length > 10:
          refs.list.innerHTML = '';
          error({
            text: 'Too many matches found. Please enter a more specific query!',
            width: '350px',
          });
          break;
        default:
          refs.list.innerHTML = '';
          info({
            text: 'No matches',
            width: '350px',
          });
      }
    });
}

function createListCountryMarkup(arr) {
  refs.list.innerHTML = countryListTmpl(arr.map(({ name }) => name));
}

function createCountryCard(obj) {
  refs.list.innerHTML = countryCardTmpl(obj);
}
