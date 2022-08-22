import './css/styles.css';
var debounce = require('lodash.debounce');
//console.log(debounce);
import countryItemTemplate from './templates/country-templates';
console.log(countryItemTemplate);

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
        const searchFilter = '?fields=name,name.official,capital,population,flags.svg,languages';
        const url = `https://restcountries.com/v3.1/name/${this.searchQuery}${searchFilter}`;


        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                renderMarkup(data);
            })
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

    countriesApiService.query = e.target.value;

    countriesApiService.fetchCountries();
}


function renderMarkup(data) {
    const list = (data) => countryItemTemplate({
        name: { official },
        capital,
        population,
        flags: { svg },
        languages,
    });

    refs.countryList.insertAdjacentHTML('beforeend', list);
}

