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

const currencies = (currencies) => {
    if (currencies.length > 1) {
        let curString = '';
        for (i = 0; i < currencies.length; i++) {
            if (currencies.length - 1 === i) {
                curString += currencies[i].name;
            } else {
                curString +=  `${currencies[i].name} and `;
            }
        }
        return curString;
    }

    return `${currencies[0].name}'s`
};

const generateResults = (data) => {
    data.forEach((country) => {
        const el = document.createElement('div');
        const img = document.createElement('img');
        img.src = country.flag;
        el.appendChild(img);

        const title = document.createElement('h2');
        title.textContent = country.name;
        el.appendChild(title);

        const description = document.createElement('p');
        el.appendChild(description);
        description.textContent = `${country.translations.nl} is situated in ${country.subregion}.
      It has a population of ${country.population} people.
      The capital is ${country.capital} and you can pay with ${currencies(country.currencies)}`;

        results.appendChild(el);
    });
}

const getCountriesByName = (term = query.value) => {
    axios.get(`${api}/name/${term}`)
        .then(res => {
            console.error(res);
            if (res.data.status === 404) {
                results.textContent = `No results found`
            } else {
                results.innerHTML = '';
                generateResults(res.data);
            }
        })
        .catch(err => {
            results.textContent = `Something went wrong: ${err}`
        })
        .finally(() => {
            query.value = '';
        });
}

const getAllCountries = () => {
    axios.get(`${api}/all`)
        .then(res => {
            console.error(res);

            generateResults(res.data);
        });
}

// getAllCountries();
getCountriesByName('Nederland');