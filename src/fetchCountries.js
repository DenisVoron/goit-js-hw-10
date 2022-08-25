import Notiflix from 'notiflix';

export default class CountriesApiService {
    constructor() {
        this.searchQuery = '';
    }

    fetchCountries() {
        const searchFilter = '?fields=name,name.official,capital,population,flags,languages';
        const url = `https://restcountries.com/v3.1/name/${this.searchQuery}${searchFilter}`;

        return fetch(url)
            .then(response => {

                if (!response.ok) {
                    throw new Error(response.status);
                }
                return response.json();
            })
            .then(name => {

                return name;
            }).catch(error => {
                Notiflix.Notify.failure('Oops, there is no country with that name');
            });
    }

    get query() {
        return this.query;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }

}