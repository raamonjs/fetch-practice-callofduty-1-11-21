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

// Forgot to add .js to import apikeys and can get credentials synchronously now instead of method above
import { apikeys as credentials } from './apikeys.js';

// Using fetch api to make requests to call of duty api
function getPlayerStats(e) {
  let username = document.getElementById('username').value;
  let platform = document.getElementById('platforms').value;
  // fetching player stats
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
      updateUIWithPlayer(obj.br_all, username);
    })
    .catch((err) => {
      console.error(err);
    });

  // // fetching match stats
  // // too many requests at once (even though it's just 2)
  // fetch(
  // `https://call-of-duty-modern-warfare.p.rapidapi.com/warzone-matches/${username}/${platform}`,
  //   {
  //     method: 'GET',
  //     headers: {
  //       'x-rapidapi-key': credentials.key,
  //       'x-rapidapi-host': credentials.host
  //     }
  //   }
  // )
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((obj) => {
  //     updateUIWithMatches(obj.matches);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });

  e.preventDefault();
}

// update ui with table of stats of player. will eventually add button to remove stats and hide table again.
function updateUIWithPlayer(obj, username) {
  // console.log(obj);

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

// // update ui with table of stats of matches. will eventually add button to remove stats and hide table again.
// function updateUIWithMatches(matches) {
//   console.log(matches);
// }

// adding a event listener when submiting form
document.getElementById('submit').addEventListener('click', getPlayerStats);

//////////////////////////////////////////////////////////////////////////////////

// feature to include a list of latest matches

/*
  stats wanted
  array
  element.playerStats.teamPlacement
  element.playerStats.kills
  element.playerStats.damageDone
  // get time and date of match
  time = element.utcStartSeconds
  let date = new Date(1609823801 * 1000)
  date.toDateString()
  */
