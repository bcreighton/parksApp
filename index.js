const apiKey = 'ZTxAxb3ljD6QPXSqoidY7AMKb8FWxPbjd0KNYj0W';

  function getParks() {
    console.log('Parks are being generated...')

    const searchUrl = '';

    const options = {
        headers: new Headers({
          "X-Api-Key": apiKey})
      };
}

function watchFrom() {
    $('form').submit(event => {
        event.preventDefault();
        const parkID = $('#parkField').val();
        const state = $('#stateSelect').val();
        const maxResults = $('maxResults').val();
    })
}