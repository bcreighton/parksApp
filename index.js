const apiUrl = 'https://developer.nps.gov/api/v1/parks';
const apiKey = 'ZTxAxb3ljD6QPXSqoidY7AMKb8FWxPbjd0KNYj0W';

function formatParams(params){
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}  

function getParks(state, maxResults) {
    console.log('Parks are being generated...')

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
        const stateParks = await parksRes.json();

        console.log(stateParks);

      } catch(e) {
        console.log('something went wrong');
      }
    }

    fetchParks();
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();

        console.log('Parks form has been submitted...');

        const state = $('#stateSelect').val();
        const maxResults = $('#maxResults').val();

        getParks(state, maxResults);
    })
}

$(watchForm);