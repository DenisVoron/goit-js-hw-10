import './css/styles.css';
var debounce = require('lodash.debounce');
//console.log(debounce);
import countryTemplates from './templates/country-templates';
console.log(countryTemplates);

const DEBOUNCE_DELAY = 300;

const refs = {
    searchInput: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
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


    countriesApiService.fetchCountries().then(name => {
        console.log(name.length);
        if (name.length === 1) {
            renderMarkup(name);
        }
    });
}


function renderMarkup(name) {
    //console.log(data);
    const list = name.map(({
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
        .join('');;

    refs.countryList.insertAdjacentHTML('beforeend', list);
}

