$(document).on('ready', function() {

    /* Set placeholder text */
    setSearchPlaceholderText();

    /* Set URL, then run API call with it */
     $('.submit').on('click', function(event) {
        event.preventDefault();
        var inputSearchFieldText = $('#titleSearch').val();
        /* Set the URL, then use it as an argument to make API call */
        var url = setUrl(inputSearchFieldText)
        queryAPIForResults(url);

     });

});

/*  Set the placeholder text in the search box, depending on search type */

function setSearchPlaceholderText () {
    $('input[name="optionsRadios"]').on('click', function() {
        if ($('input[name="optionsRadios"]:checked').val() === 'option1') {
            $('#titleSearch').attr('placeholder', 'Title');
        } else {
            $('#titleSearch').attr('placeholder', 'Keyword');
        }
    });
}

/* Set the url to be used for the API call based on which radio button is checked */

function setUrl (searchTerm) {
     var baseUrl = 'https://www.omdbapi.com/?';
     var keyWords = '';
     if ($('input[name="optionsRadios"]:checked').val() === 'option1') {
        keyWords = 't=' + searchTerm;
     } else {
        keyWords = 's=' + searchTerm;
     }

     url = baseUrl + keyWords;
     console.log('Keywords: ', keyWords, 'Full url: ', url);
     return url;
};

/* Run the API call using the above URL */

function queryAPIForResults (url) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "GET",
    }

    $.ajax(settings).done(function (response) {
        appendDataToDom(response);
    });
}

/* Add API data to the DOM once retrieved from API call */

function appendDataToDom (movieObj) {
    $('#searchResults').text('');
 for (var key in movieObj) {
        if (key !== 'Poster')
            console.log('Key: ', key);
          $('#searchResults').append('<li>' + key + ': ' + movieObj[key] + '</li>');
      };
}









