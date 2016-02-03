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



var Movie = function (poster, title, year, genre, type, imdbRating, imdbID) {
    this.poster = poster;
    this.title = title;
    this.year = year;
    this.genre = genre;
    this.type = type;
    this.imdbRating = imdbRating;
    this.imdbID = imdbID;
}


var MovieCollection = function (movieArr) {
    this.movieArr = [];
}


MovieCollection.prototype.addMovieToMovieCollection = function (movieObj) {
    this.movieArr.push(movieObj);
};


MovieCollection.prototype.addToCollection = function () {
    var movieObj = $(this).attr('id');
    var thisTitle = data.filter(function (movie) {
        return movie.Title === movieObj;
    });
    var reducedMovie = thisTitle.reduce(function (movie, value, key) {
        movie[key] = value;
        return movie;
    });
    myMovieCollection.updateLocalStorage(reducedMovie);
    $(this).prop('disabled', true);
    $(this).text('Added');
};

MovieCollection.prototype.addDataToMoviePicks = function (data) {
    data.forEach(function(piece) {
        $('#moviePosters').append('<div class="col-lg-3 col-sm-12" id="'+piece.imdbID+'"><div class="homepage-hover imgButton"><img src="'+piece.Poster+'" height="300px" width="250px"><div class="caption text-center"><button type="submit" class="btn btn-success btn-block addCollection" id="'+piece.Title+'">Add to Collection</button><h3>'+piece.Title+'</h3><p>Release Year: '+piece.Year+'<br>IMDB Rating: '+piece.imdbRating+'<br>Genre: '+piece.Genre+'</p></div></div></div>');
    });
};

MovieCollection.prototype.addMovieToDom = function (movie) {
        $('.movieCollection').append('<div class="panel panel-info" id="'+movie.imdbID+'"><div class="panel-heading"><a href="#" class="searchHeading"><h3 class="panel-title">'+movie.title+'</h3></a></div><div class="panel-body"><img class="posterImages" src="'+movie.poster+'"><ul class="list-group col-lg-8 col-lg-offset-4 col-md-8 col-md-offset-4 col-sm-8 col-sm-offset-4"><li class="list-group-item">Release Year: '+movie.year+'</li><li class="list-group-item">Genre: '+movie.genre+'</li><li class="list-group-item">IMDB Rating: '+movie.imdbRating+'</li><li class="list-group-item">Media Type: '+movie.type+'</li><br><br><br><button type="submit" class="btn btn-danger btn-block halfSize removeCollection" id="'+movie.Title+'" data-toggle="modal" data-target="#removeModal">Remove</button></ul></div></div>');
};


MovieCollection.prototype.addMovieToLocalStorage = function() {
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



MovieCollection.prototype.removeAllFromLocalStorage = function() {
    var removeAll = JSON.parse(localStorage.getItem('movies'));
    removeAll = [];
    localStorage.setItem('movies', JSON.stringify(removeAll));
};



MovieCollection.prototype.addDataFromLocalStorageToDom = function() {
    $('.movieCollection').text('');
    var allMovies = JSON.parse(localStorage.getItem('movies'));
    allMovies.forEach(function(obj) {
        $('.movieCollection').append('<div class="panel panel-info" id="'+obj.imdbID+'"><div class="panel-heading"><a href="#" class="searchHeading"><h3 class="panel-title">'+obj.Title+'</h3></a></div><div class="panel-body"><img class="posterImages" src="'+obj.Poster+'"><ul class="list-group col-lg-8 col-lg-offset-4 col-md-8 col-md-offset-4 col-sm-8 col-sm-offset-4"><li class="list-group-item">Release Year: '+obj.Year+'</li><li class="list-group-item">Genre: '+obj.Genre+'</li><li class="list-group-item">IMDB Rating: '+obj.imdbRating+'</li><li class="list-group-item">Media Type: '+obj.Type+'</li><br><br><br><button type="submit" class="btn btn-danger btn-block halfSize removeCollection" id="'+obj.Title+'" data-toggle="modal" data-target="#removeModal">Remove</button></ul></div></div>');
    });
};



MovieCollection.prototype.removeItemFromLocalStorage = function(movieObj) {
    var currentStateOfLocalStorage = JSON.parse(localStorage.getItem('movies'));
    //currentStateOfLocalStorage is now an array of objects, we remove the object we dont want using filter, and return an array without that movie object
    var movieObjectRemoved = myMovieCollection.findObject(movieObj, currentStateOfLocalStorage);
    //then push array with movie object removed back into local storage
    localStorage.setItem('movies', JSON.stringify(movieObjectRemoved));
};


MovieCollection.prototype.updateLocalStorage = function(movieObj) {
    var currentStateOfLocalStorage = JSON.parse(localStorage.getItem('movies'));
    var movieObjectAdd = myMovieCollection.checkObject(movieObj, currentStateOfLocalStorage);
    if (movieObjectAdd.length > 0) {
        console.log(movieObjectAdd);
        bootbox.alert('This item is already in your collection.');
    } else {
        currentStateOfLocalStorage.push(movieObj);
        localStorage.setItem('movies', JSON.stringify(currentStateOfLocalStorage));
    };
};


MovieCollection.prototype.seedDataToLocalStorage = function() {
    if(!JSON.parse(localStorage.getItem('movies'))) {
        localStorage.setItem('movies', JSON.stringify([]));
    };
};


MovieCollection.prototype.findObject = function(movieObject, array) {
    return array.filter(function(el, ind) {
        return el.Title !== movieObject;
    });
};

MovieCollection.prototype.checkObject = function(movieObj, array) {
    return array.filter(function (el, index) {
        return el.Title === movieObj.Title && el.Year === movieObj.Year;
    });
};


MovieCollection.prototype.appendDataToDom = function (response) {
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


MovieCollection.prototype.addRandomMovieToDom = function (obj) {
    $('.randomMovie').append('<div class="panel panel-info"><div class="panel-heading"><h3 class="panel-title">'+obj.Title+'</h3></div><div class="panel-body"><img class="posterImages" src="'+obj.Poster+'"><ul class="list-group col-lg-8 col-lg-offset-4 col-md-8 col-md-offset-4 col-sm-8 col-sm-offset-4"><li class="list-group-item">Release Year: '+obj.Year+'</li><li class="list-group-item">Genre: '+obj.Genre+'</li><li class="list-group-item">IMDB Rating: '+obj.imdbRating+'</li><li class="list-group-item">Media Type: '+obj.Type+'</li><br><br><br></ul></div></div>');
};





