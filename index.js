const apiUrl = 'https://developer.nps.gov/api/v1/parks';
const apiKey = 'ZTxAxb3ljD6QPXSqoidY7AMKb8FWxPbjd0KNYj0W';

  function getParks() {
    console.log('Parks are being generated...')

    const url = apiUrl + '?stateCode=CO&limit=10&api_key=' + apiKey;

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
        const maxResults = $('maxResults').val();

        getParks();
        //getParks(state, maxResults);
    })
}

$(watchForm);