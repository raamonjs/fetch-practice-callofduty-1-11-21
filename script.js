// // Old method retreiving API Keys before finally figuring out how to import js file.
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
// setTimeout(getPlayerStats, 2000);

// Had trouble importing js file but needed to add '.js' extention to allow import
import { apikeys as credentials } from './apikeys.js';

// Declaring variables outside of getPlayerStats() to be used in getPlayerMatches()
let username, platform, URL;

// Using fetch to make request and pass in object to updateUIWithPlayerStats()
function getPlayerStats(e) {
  username = document.getElementById('username').value;
  platform = document.getElementById('platforms').value;
  URL = 'https://call-of-duty-modern-warfare.p.rapidapi.com';
  // fetching player stats
  fetch(`${URL}/warzone/${username}/${platform}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': credentials.key,
      'x-rapidapi-host': credentials.host
    }
  })
    .then((response) => {
      // console.log(response.json());
      return response.json();
    })
    .then((obj) => {
      // calling updateui
      updateUIWithPlayerStats(obj.br_all, username);
    })
    .catch((err) => {
      console.error(err);
    });

  e.preventDefault();
}

// Using fetch to make request and pass in object to updateUIWithPlayerMatches()
function getPlayerMatches(e) {
  // fetching match stats
  // too many requests at once (even though it's just 2) <-- before moving outside of getPlayerStats()
  fetch(`${URL}/warzone-matches/${username}/${platform}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': credentials.key,
      'x-rapidapi-host': credentials.host
    }
  })
    .then((response) => {
      return response.json();
    })
    .then((obj) => {
      updateUIWithPlayerMatches(obj.matches);
    })
    .catch((err) => {
      console.error(err);
    });

  e.preventDefault();
}

// update ui with table of stats of player. will eventually add button to remove stats and hide table again.
function updateUIWithPlayerStats(obj, username) {
  // console.log(obj);

  let content = `
  <tr>
    <th scope="row">${username}</th>
    <td>${obj.wins}</td>
    <td>${obj.kdRatio.toFixed(2)}</td>
    <td>${obj.kills}</td>
    <td>${obj.downs}</td>
  </tr>`;
  document.getElementById('table-stats').removeAttribute('hidden');
  document.getElementById('stats-player').innerHTML = content;
}

// // update ui with table of stats of matches. will eventually add button to remove stats and hide table again.
function updateUIWithPlayerMatches(matches) {
  let content = '';
  console.log(matches);
  matches.forEach((match) => {
    content += `
    <tr>
      <th scope="row">${match.playerStats.teamPlacement}</th>
      <td>${match.playerStats.kills}</td>
      <td>${match.playerStats.damageDone}</td>
      <td>${new Date(match.utcStartSeconds * 1000).toLocaleString()}</td>
    </tr>`;
  });
  document.getElementById('table-matches').removeAttribute('hidden');
  document.getElementById('stats-matches').innerHTML = content;
  document.getElementById('load-matches').style.visibility = 'hidden';
}

// adding a event listener when submiting playerId and gaming platform
document.getElementById('submit').addEventListener('click', getPlayerStats);

// button appears after loading playerStats and can be clicked to show last 20 matches
document
  .getElementById('load-matches')
  .addEventListener('click', getPlayerMatches);

//////////////////////////////////////////////////////////////////////////////////

// feature to include a list of latest matches

/*
  stats wanted
  array
  element.playerStats.teamPlacement // placement
  element.playerStats.kills // kills
  element.playerStats.damageDone // damage
  // get time and date of match // time (code to get date below)
  // time = element.utcStartSeconds
  // let date = new Date(1609823801 * 1000) // or new Date(time * 1000)
  // toLocaleString returns the date and time
  // date.toLocaleString()
  */

/////////////// UPDATE, FEATURE HAS BEEN ADDED ///////////////////////////////////
