import './css/styles.css';
var debounce = require('lodash.debounce');

import Notiflix from 'notiflix';

import countryTemplates from './templates/country-templates';

import CountriesApiService from './fetchCountries'

const DEBOUNCE_DELAY = 300;


const refs = {
    searchInput: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}

const countriesApiService = new CountriesApiService();

console.log(countriesApiService);

refs.searchInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
    console.log(e.target.value);

    countriesApiService.query = e.target.value.trim();

    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';

    countriesApiService.fetchCountries().then(name => {

        if (name.length === 1) {
            renderCountryInfoMarkup(name);
        } else if (name.length >= 2 && name.length <= 10) {
            renderCountryListMarkup(name);
        } else {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        }
    }).catch(error => {
        console.log(error);
    });
}

function renderCountryListMarkup(name) {

    const listEl = name.map(({
        name: { official },
        flags: { svg },
    }) => murckupForCountryList({
        name: { official },
        flags: { svg },
    }))
        .join('');


    refs.countryList.insertAdjacentHTML('beforeend', listEl);
}

function renderCountryInfoMarkup(name) {

    const countryEl = name.map(({
        name: { official },
        capital,
        population,
        flags: { svg },
        languages,
    }) => countryTemplates({
        name: { official },
        capital,
        population,
        flags: { svg },
        languages,
    }))
        .join('');

    refs.countryInfo.insertAdjacentHTML('beforeend', countryEl);
}

function murckupForCountryList({
    name: { official },
    flags: { svg },
}) {
    return `<li class="country-list__item">
             <img src="${svg}" alt="flag" width="30" height="30" class="country-list__img" />
             <span class="country-list__name">${official}</span>
            </li>`;
}
