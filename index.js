'use strict'

const apiUrl = 'https://developer.nps.gov/api/v1/parks';
const apiKey = 'ZTxAxb3ljD6QPXSqoidY7AMKb8FWxPbjd0KNYj0W';

function formatParams(params){
  //sets default limit to 10
  if(params.limit === ''){
    params.limit = 10;
  }

  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  const queryString = queryItems.join('&');

  if(queryString.includes('%2C%20')){
    return queryString.replace('%2C%20', '%2C');
    } else if(queryString.includes('%20')){
      return queryString.replace('%20', '%2C');
    } else {
      return queryString;
  }
}  

function displayParks(stateParks, state) {
  // clear any existing results
  $('#parkResults').empty();

  //Create header
  const capState = state.toUpperCase();
  $('#searchTitle').html(`Showing Parks In ${capState}`);

  for(let i = 0; i < stateParks.data.length; i++) {
    $('#parkResults').append(
      `<li class="parkItem">
        <h3 class="parkTitle">${stateParks.data[i].fullName}</h3>
        <p class="parkDescription">${stateParks.data[i].description}</p>
        <p class="parkAddress"><span>Address: </span>${stateParks.data[i].addresses[1].line1} ${stateParks.data[i].addresses[1].city}, ${stateParks.data[i].addresses[1].stateCode} ${stateParks.data[i].addresses[1].postalCode}</p>
        <a href='${stateParks.data[i].url}'><button class="parkBtn">More Details</button></a>
        <a href='${stateParks.data[i].directionsUrl}'><button class="parkBtn">Get Directions</button></a>
      </li>`
    )
  }

  $('#parkResultsContainer').removeClass('hidden');

}

function getParks(state, maxResults) {

    const params = {
      fields: 'addresses',
      api_key: apiKey,
      stateCode: state,
      limit: maxResults
    };

    const queryString = formatParams(params);
    const url = apiUrl + '?' + queryString;

    const fetchParks = async () => {
      try {
        const parksRes = await fetch(url);

        if(!parksRes.ok) {
          throw new Error(parksRes.statusText);
        }
        const stateParks = await parksRes.json();

        displayParks(stateParks, state);

      } catch(e) {
        $('#errorMessage').empty()
        .html('Something went wrong:' + e);

        $('#errorMessageContainer').removeClass('hidden');
      }
    }

    fetchParks();
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();

        const state = $('#state').val();
        const maxResults = $('#maxResults').val();

        getParks(state, maxResults);
    })
}

$(watchForm);