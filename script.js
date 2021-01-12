// // importing credentials
// let credentials;
// let xhr = new XMLHttpRequest();
// xhr.open('GET', 'apikeys.json', true);
// xhr.onload = function () {
//   if (this.status === 200) {
//     credentials = JSON.parse(this.responseText);
//     // console.log(credentials);
//   }
// };
// xhr.send();

// // needed to add time out in order to get credentials in time before http request
// setTimeout(getStats, 2000);

// import { apikeys } from './apikeys.js';

// console.log(apikeys);

// Forgot to add .js to import apikeys and can get credentials synchronously now instead of method above

import { apikeys as credentials } from './apikeys.js';

// Using fetch api to make requests to call of duty api
function getStats() {
  fetch(
    'https://call-of-duty-modern-warfare.p.rapidapi.com/warzone/Chob%252321309/battle',
    {
      method: 'GET',
      headers: {
        'x-rapidapi-key': credentials.key,
        'x-rapidapi-host': credentials.host
      }
    }
  )
    .then((response) => {
      // console.log(response.json());
      return response.json();
    })
    .then((obj) => {
      console.log(obj.br);
    })
    .catch((err) => {
      console.error(err);
    });
}

getStats();
