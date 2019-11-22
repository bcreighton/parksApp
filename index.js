const apiUrl = 'https://developer.nps.gov/api/v1/parks';
const apiKey = 'ZTxAxb3ljD6QPXSqoidY7AMKb8FWxPbjd0KNYj0W';

function formatParams(params){
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}  

function displayParks(stateParks, state) {
  // clear any existing results
  $('#parkResults').empty();

  //Create header
  $('#searchTitle').html(`Showing Parks In ${state}`);

  for(let i = 0; i < stateParks.data.length; i++) {
    $('#parkResults').append(
      `<li class="parkItem">
        <h3 class="parkTitle">${stateParks.data[i].fullName}</h3>
        <p class="parkDescription">${stateParks.data[i].description}</p>
        <a href='${stateParks.data[i].url}'><button class="parkBtn">More Details</button></a>
        <a href='${stateParks.data[i].directionsUrl}'><button class="parkBtn">Get Directions</button></a>
      </li>`
    )
  }

  $('#parkResultsContainer').removeClass('hidden');

}

function getParks(state, maxResults) {

    const params = {
      api_key: apiKey,
      stateCode: state,
      limit: maxResults
    };

    const queryString = formatParams(params);
    const url = apiUrl + '?' + queryString;

    // header code not working...
    /* const options = {
        headers: new Headers({
          "X-Api-Key": apiKey})
      }; */

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

        $('#errorMessageContainer').removeClass(hidden);
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