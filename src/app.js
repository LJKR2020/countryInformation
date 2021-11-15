import axios from 'axios';

const api = 'https://restcountries.com/v2';
const form = document.getElementById('search');
const query = document.getElementById('query');
const results = document.getElementById('listofcountries');

const search = (e) => {
    e.preventDefault();

    if (query.value.length) {
        getCountriesByName();
    } else {
        getAllCountries();
    }
}

form.addEventListener('submit', search);

const generateResults = (data) => {
    data.forEach((country) => {
        const el = document.createElement('div');
        el.innerText = country.translations.nl;
        results.appendChild(el)
    });
}

const getCountriesByName = () => {
    axios.get(`${api}/name/${query.value}`)
        .then(res => {
            console.error(res);

            results.innerHTML = '';
            generateResults(res.data);
        });
}

const getAllCountries = () => {
    axios.get(`${api}/all`)
        .then(res => {
            console.error(res);

            generateResults(res.data);
        });
}

getAllCountries()