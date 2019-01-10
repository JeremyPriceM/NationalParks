'use strict';

const apiKey = "4EoEVnYleGiGNyfg6anWbfAwH7qQlEyVJdOT73fM";
const searchURL = "https://developer.nps.gov/api/v1/parks";


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}


function getNationalParks(query, limit=10) {
  const params = {
    limit,
    q: query,
    api_key: apiKey,
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}


function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty('');
  let length = responseJson.data.length;
  for (let i = 0; i < length; i++){
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</P>
      <a href='${responseJson.data[i].url}'>${responseJson.data[i].url}</a>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
}



function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#stateName').val();
    const maxResults = $('#resultsNumber').val();
    getNationalParks(searchTerm, maxResults);
  });
}

$(watchForm);