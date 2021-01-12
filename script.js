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
function getStats(e) {
  let username = document.getElementById('username').value;
  let platform = document.getElementById('platforms').value;
  fetch(
    `https://call-of-duty-modern-warfare.p.rapidapi.com/warzone/${username}/${platform}`,
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
      // calling updateui
      updateUI(obj.br_all, username);
    })
    .catch((err) => {
      console.error(err);
    });
  e.preventDefault();
}

// update ui with table of stats. will eventually add button to remove stats and hide table again.
function updateUI(obj, username) {
  console.log(obj);

  let content = `
  <tr>
    <th scope="row">${username}</th>
    <td>${obj.wins}</td>
    <td>${obj.kdRatio.toFixed(2)}</td>
    <td>${obj.kills}</td>
    <td>${obj.downs}</td>
  </tr>`;
  document.getElementById('table').removeAttribute('hidden');
  document.getElementById('stats').innerHTML = content;
}

// adding a event listener when submiting form

document.getElementById('submit').addEventListener('click', getStats);

// How i'd get value of platform
// console.log(document.getElementById('platforms').value);
