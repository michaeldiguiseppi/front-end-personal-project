var massUrl = '';


$(document).on('ready', function() {



    /* Set placeholder text */
    setSearchPlaceholderText();
    resetForm();

    /* Set URL, then run API call with it */
     $('.submit').on('click', function(event) {
        event.preventDefault();
        var inputSearchFieldText = $('#titleSearch').val();
        /* Set the URL, then use it as an argument to make API call */
        massUrl = setUrl(inputSearchFieldText)
        queryAPIForResults(massUrl);

     });

     /* Allow the user to click the links to search the individual movie */

     $(document).on('click', '.resultLink', function(event) {
        event.preventDefault();
        $('#reset').click();
        var url = setUrl($(this).attr('id'));
        var urlYear = '&y=' + $(this).attr('value');
        url = url + urlYear;
        queryAPIForResults(url);
        console.log(url);
        $('.backButton').prop('disabled', false);
     });

     $('#reset').on('click', function() {
        resetForm();
     });

     $('.backButton').on('click', function(event) {
        event.preventDefault();
        queryAPIForResults(massUrl);
        $(this).prop('disabled', true);
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
        resetForm();
        appendDataToDom(response);
        $('.collectBtn').on('click', function() {
            $(this).addClass('btn-disabled');
            $(this).prop('disabled', true);
            $(this).text('Added');
            updateLocalStorage(response);
        });
    });
}

/* Add API data to the DOM once retrieved from API call */

function appendDataToDom (response) {
    console.log(response);
    if ( !response.Search ) {
        for (var key in response) {
            if (key !== 'Poster' && key !== 'Writer') {
              $('#searchResults').append('<li class="list-group-item">' + key + ': ' + response[key] + '</li>');
            } else if (key === 'Poster') {
                $('#moviePoster').append('<div class="imgButton"><img src="' + response[key] + '"><br><br><button type="submit" class="btn btn-success btn-block halfSize collectBtn">Add to Collection</button></div>');
            };
        };
    } else {
        response.Search.forEach(function(obj) {
            $('#searchResults').append('<li><a href="#" class="resultLink" id="' + obj.Title + '" value="'+obj.Year+'">' + obj.Title + '</a>&nbsp;-&nbsp;' + obj.Year + '</li>');
        });
    };
};

/* Reset the form back to the default states */

function resetForm () {
  $('#searchResults').text('');
  $('#moviePoster').text('');
  $('input[id="titleSearch"]').attr('placeholder', 'Title');
};















