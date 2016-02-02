

// ******************************************************** \\
// *************** DOM Manipulation Methods *************** \\
// ******************************************************** \\


function addDataToMoviePicks(data) {
    data.forEach(function(piece) {
        $('#moviePosters').append('<div class="col-lg-3 col-sm-12" id="'+piece.imdbID+'"><div class="homepage-hover imgButton"><img src="'+piece.Poster+'" height="300px" width="250px"><div class="caption text-center"><button type="submit" class="btn btn-success btn-block addCollection" id="'+piece.Title+'">Add to Collection</button><h3>'+piece.Title+'</h3><p>Release Year: '+piece.Year+'<br>IMDB Rating: '+piece.imdbRating+'<br>Genre: '+piece.Genre+'</p></div></div></div>');
    });
};

function appendDataToDom (response) {
    console.log(response);
    if ( !response.Search ) {
        for (var key in response) {
            if (key !== 'Poster' && key !== 'Writer') {
              $('#searchResults').append('<li class="list-group-item">' + key + ': ' + response[key] + '</li>');
            } else if (key === 'Poster') {
                $('#moviePoster').append('<div><img src="' + response[key] + '"><br><br><button type="submit" class="btn btn-success btn-block halfSize collectBtn">Add to Collection</button></div>');
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


function setSearchPlaceholderText () {
    $('input[name="optionsRadios"]').on('click', function() {
        if ($('input[name="optionsRadios"]:checked').val() === 'option1') {
            $('#titleSearch').attr('placeholder', 'Title');
        } else {
            $('#titleSearch').attr('placeholder', 'Keyword');
        }
    });
};


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
        appendDataToDom(response);
        $('.collectBtn').on('click', function() {
            $(this).addClass('btn-disabled');
            $(this).prop('disabled', true);
            $(this).text('Added');
            updateLocalStorage(response);
        });
    });
};



// ***************************************************** \\
// *************** Local Storage Methods *************** \\
// ***************************************************** \\


function seedDataToLocalStorage () {
    if(!JSON.parse(localStorage.getItem('movies'))) {
        localStorage.setItem('movies', JSON.stringify([]));
    };
};


function updateLocalStorage (movieObj) {
    var currentStateOfLocalStorage = JSON.parse(localStorage.getItem('movies'));

    var movieObjectAdd = checkObject(movieObj, currentStateOfLocalStorage);

    if (movieObjectAdd.length > 0) {
        console.log(movieObjectAdd);
        bootbox.alert('This item is already in your collection.');
    } else {
        currentStateOfLocalStorage.push(movieObj);
        localStorage.setItem('movies', JSON.stringify(currentStateOfLocalStorage));
    };
};


function removeDataFromLocalStorage (movieObj) {
    var currentStateOfLocalStorage = JSON.parse(localStorage.getItem('movies'));
    //currentStateOfLocalStorage is now an array of objects, we remove the object we dont want using filter, and return an array without that movie object
    var movieObjectRemoved = findObject(movieObj, currentStateOfLocalStorage);
    //then push array with movie object removed back into local storage
    localStorage.setItem('movies', JSON.stringify(movieObjectRemoved));
};

function findObject (movieObject, array) {
    return array.filter(function(el, ind) {
        return el.Title !== movieObject;
    });
};


function checkObject (movieObj, array) {
    return array.filter(function (el, index) {
        return el.Title === movieObj.Title && el.Year === movieObj.Year;
    });
};

function addDataFromLocalStorageToDom() {
    $('.movieCollection').text('');
    var allMovies = JSON.parse(localStorage.getItem('movies'));
    allMovies.forEach(function(obj) {
        $('.movieCollection').append('<div class="panel panel-info" id="'+obj.imdbID+'"><div class="panel-heading"><a href="#" class="searchHeading"><h3 class="panel-title">'+obj.Title+'</h3></a></div><div class="panel-body"><img class="posterImages" src="'+obj.Poster+'"><ul class="list-group col-lg-8 col-lg-offset-4 col-md-8 col-md-offset-4 col-sm-8 col-sm-offset-4"><li class="list-group-item">Release Year: '+obj.Year+'</li><li class="list-group-item">Genre: '+obj.Genre+'</li><li class="list-group-item">IMDB Rating: '+obj.imdbRating+'</li><li class="list-group-item">Media Type: '+obj.Type+'</li><br><br><br><button type="submit" class="btn btn-danger btn-block halfSize removeCollection" id="'+obj.Title+'" data-toggle="modal" data-target="#removeModal">Remove</button></ul></div></div>');
    });
};

function removeAllDataFromLocalStorage() {
    var removeAll = JSON.parse(localStorage.getItem('movies'));
    removeAll = [];
    localStorage.setItem('movies', JSON.stringify(removeAll));
};


function addToCollection () {
    var movieObj = $(this).attr('id');
        var thisTitle = data.filter(function (movie) {
            return movie.Title === movieObj;
        });
        var reducedMovie = thisTitle.reduce(function (movie, value, key) {
            movie[key] = value;
            return movie;
        });
        updateLocalStorage(reducedMovie);
        $(this).prop('disabled', true);
        $(this).text('Added');
};



// ******************************************************* \\
// *************** Collection Page Methods *************** \\
// ******************************************************* \\



function applyFilters (event) {
    event.preventDefault();
    addDataFromLocalStorageToDom();
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
            removeDataFromLocalStorage(movieObj);
            addDataFromLocalStorageToDom();
            createCounters();
            setEmptyContent();
        }
    }).find('.btn-primary').addClass('btn-info');
};

function confirmRemoveAllItems () {
    bootbox.confirm('Are you sure you want to remove all items from your collection? This cannot be undone.', function (result) {
        if (result) {
            removeAllDataFromLocalStorage();
            addDataFromLocalStorageToDom();
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
    addDataFromLocalStorageToDom();
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

