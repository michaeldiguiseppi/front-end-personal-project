var data = [
    {
        Poster: 'http://ia.media-imdb.com/images/M/MV5BMjAyOTUzMTcxN15BMl5BanBnXkFtZTgwMjkyOTc1MDE@._V1_SX300.jpg',
        Title: 'RoboCop',
        Year: '2014',
        Genre: 'Action',
        Type: 'movie',
        imdbRating: '6.2',
        imdbID: 'tt1234721'

    },
    {
        Poster: 'http://ia.media-imdb.com/images/M/MV5BMTI2MDY0ODEwNF5BMl5BanBnXkFtZTYwMDI2NTk4._V1_SX300.jpg',
        Title: 'Cast Away',
        Year: '2000',
        Genre: 'Drama',
        Type: 'movie',
        imdbRating: '7.7',
        imdbID: 'tt0162222'
    },
    {
        Poster: 'http://ia.media-imdb.com/images/M/MV5BMTUxMjQ5NzgyOF5BMl5BanBnXkFtZTcwNDg0ODYyMQ@@._V1_SX300.jpg',
        Title: 'The Aviator',
        Year: '2004',
        Genre: 'Drama',
        Type: 'movie',
        imdbRating: '7.5',
        imdbID: 'tt0338751'
    },
    {
        Poster: 'http://ia.media-imdb.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg',
        Title: 'Iron Man',
        Year: '2008',
        Genre: 'Action',
        Type: 'movie',
        imdbRating: '7.9',
        imdbID: 'tt0371746'
    }
];


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
        $('.movieCollection').append('<div class="panel panel-info" id="'+obj.imdbID+'"><div class="panel-heading"><h3 class="panel-title">'+obj.Title+'</h3></div><div class="panel-body"><img class="posterImages" src="'+obj.Poster+'"><ul class="list-group col-lg-8 col-lg-offset-4 col-md-8 col-md-offset-4 col-sm-8 col-sm-offset-4"><li class="list-group-item">Release Year: '+obj.Year+'</li><li class="list-group-item">Genre: '+obj.Genre+'</li><li class="list-group-item">IMDB Rating: '+obj.imdbRating+'</li><li class="list-group-item">Media Type: '+obj.Type+'</li><br><br><br><button type="submit" class="btn btn-danger btn-block halfSize removeCollection" id="'+obj.Title+'" data-toggle="modal" data-target="#removeModal">Remove</button></ul></div></div>');
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
