import './css/styles.css';
var debounce = require('lodash.debounce');

import Notiflix from 'notiflix';

import countryTemplates from './templates/country-templates';
console.log(countryTemplates);

const DEBOUNCE_DELAY = 300;

const refs = {
    searchInput: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}


class CountriesApiService {
    constructor() {
        this.searchQuery = '';
    }

    fetchCountries() {
        const searchFilter = '?fields=name,name.official,capital,population,flags,languages';
        const url = `https://restcountries.com/v3.1/name/${this.searchQuery}${searchFilter}`;

        return fetch(url)
            .then(response => response.json())
            .then(name => {
                console.log(name);
                return name;
            }).then((result) => {
                throw new Error("Ошибка!");
            }).catch(error => {
                console.log(error);
            });
    }

    get query() {
        return this.query;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }

}

const countriesApiService = new CountriesApiService(arguments);

console.log(countriesApiService);

refs.searchInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
    console.log(e.target.value);
    ///console.log(e);

    countriesApiService.query = e.target.value.trim();
    //console.log(countriesApiService);
    ///countriesApiService.fetchCountries();
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';

    countriesApiService.fetchCountries().then(name => {
        console.log(name.length);
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
    console.log(name);
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
    //console.log(data);
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