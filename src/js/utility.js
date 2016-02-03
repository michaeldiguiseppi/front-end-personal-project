



// ***************************************** \\
// *************** API Calls *************** \\
// ***************************************** \\

function runApiQueryFromInput (event) {
    event.preventDefault();
    var inputSearchFieldText = $('#titleSearch').val();
    /* Set the URL, then use it as an argument to make API call */
    massUrl = setUrl(inputSearchFieldText)
    queryAPIForResults(massUrl);
};

function runApiQueryFromResultLink (event) {
    event.preventDefault();
    $('#reset').click();
    var url = setUrl($(this).attr('id'));
    var urlYear = '&y=' + $(this).attr('value');
    url = url + urlYear;
    queryAPIForResults(url);
    $('.backButton').prop('disabled', false);
};

function runApiQueryFromBackButton (event) {
    event.preventDefault();
    queryAPIForResults(massUrl);
    $(this).prop('disabled', true);
};


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
    };

    $.ajax(settings).done(function (response) {
        resetForm();
        myMovieCollection.appendDataToDom(response);
        $('.collectBtn').on('click', function() {
            $(this).addClass('btn-disabled');
            $(this).prop('disabled', true);
            $(this).text('Added');
            myMovieCollection.updateLocalStorage(response);
        });
    });
};






// ******************************************************* \\
// *************** Collection Page Methods *************** \\
// ******************************************************* \\



function applyFilters (event) {
    event.preventDefault();
    myMovieCollection.addDataFromLocalStorageToDom();
    var selectedFilters = {};
    selectedFilters.Genre = $('option[data-name="genre"]:selected').val();
    selectedFilters.Type = $('option[data-name="type"]:selected').val();
    if ($('option[data-name="year"]:selected').val() !== "") {
        selectedFilters.Years = $('option[data-name="year"]:selected').val().split('-');
    } else {
        selectedFilters.Years = "";
    }
    if ($('option[data-name="rating"]:selected').val() !== "") {
        selectedFilters.imdbRating = $('option[data-name="rating"]:selected').val().split('-');
    } else {
        selectedFilters.imdbRating = "";
    }
    var movies = JSON.parse(localStorage.getItem('movies'));

    var hideMovies = filterData(movies, selectedFilters) // array of new data


    movies.forEach(function (movieObj) {
        $('#'+movieObj.imdbID).addClass('hiddenPanel');
    });
    hideMovies.forEach(function (movieObj) {
        $('#'+movieObj.imdbID).removeClass('hiddenPanel');
    });
};

function confirmRemoval () {
    var movieObj = $(this).attr('id');
    bootbox.confirm('Are you sure you want to remove this from your collection?', function (result) {
        if (result) {
            myMovieCollection.removeItemFromLocalStorage(movieObj);
            myMovieCollection.addDataFromLocalStorageToDom();
            createCounters();
            setEmptyContent();
        }
    }).find('.btn-primary').addClass('btn-info');
};

function confirmRemoveAllItems () {
    bootbox.confirm('Are you sure you want to remove all items from your collection? This cannot be undone.', function (result) {
        if (result) {
            myMovieCollection.removeAllFromLocalStorage();
            myMovieCollection.addDataFromLocalStorageToDom();
            setEmptyContent();
            createCounters();
        };
    });
};

function filterData(movies, filters) {
    return movies.filter(function (movie) {
        var allGenres = movie.Genre.split(', ');
        var thisGenre = allGenres.filter(function (genre) {
            return genre === filters.Genre;
        });
        return thisGenre[0] === filters.Genre || !filters.Genre;
    }).filter(function (movie) {
        return movie.Type === filters.Type || !filters.Type;
    }).filter(function (movie) {
        if (filters.Years === "") {
            return !filters.Years;
        } else {
            return (movie.Year >= filters.Years[0] && movie.Year <= filters.Years[1])
        };
    }).filter(function (movie) {
        if (filters.imdbRating === "") {
            return !filters.imdbRating;
        } else {
            return (movie.imdbRating >= filters.imdbRating[0] && movie.imdbRating <= filters.imdbRating[1]);
        };
    });
};

function showAllItems () {
    myMovieCollection.addDataFromLocalStorageToDom();
    $('option[value=""]').prop('selected', true);
};


function createCounters () {
    var collection = JSON.parse(localStorage.getItem('movies'));
    $('#collectionCount').text('Total Items in Your Collection: ' + collection.length);
};

function setEmptyContent () {
    $('#emptyContent').text('Oops!  Looks like your collection is empty.  Please use the search page to add items to your collection.');
};




// ****************************************************** \\
// *************** Randomize Page Methods *************** \\
// ****************************************************** \\



function addHeaderForRandomMovie () {
    $('.randomMovie').append('<h2 class="text-center">Don\'t know what to watch?  Try this random movie from your collection!</h2><br><br>');
};


function findRandomMovie() {
    var movieTotal = JSON.parse(localStorage.getItem('movies'));
    var randomNum = Math.floor((Math.random()*movieTotal.length-1)+1);

    console.log('Length: ', movieTotal.length, 'Random Num: ', randomNum);
    console.log(movieTotal[randomNum]);
    return movieTotal[randomNum];
};


function addMovieToDom(obj) {
$('.randomMovie').append('<div class="panel panel-info"><div class="panel-heading"><h3 class="panel-title">'+obj.Title+'</h3></div><div class="panel-body"><img class="posterImages" src="'+obj.Poster+'"><ul class="list-group col-lg-8 col-lg-offset-4 col-md-8 col-md-offset-4 col-sm-8 col-sm-offset-4"><li class="list-group-item">Release Year: '+obj.Year+'</li><li class="list-group-item">Genre: '+obj.Genre+'</li><li class="list-group-item">IMDB Rating: '+obj.imdbRating+'</li><li class="list-group-item">Media Type: '+obj.Type+'</li><br><br><br></ul></div></div>');
};

