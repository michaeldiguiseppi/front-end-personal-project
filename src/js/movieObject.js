var movieData = [
        {
            Poster: 'http://ia.media-imdb.com/images/M/MV5BMTgwMjI4MzU5N15BMl5BanBnXkFtZTcwMTMyNTk3OA@@._V1_SX300.jpg',
            Title: 'Toy Story',
            Year: '1995',
            Genre: 'Comedy',
            Type: 'Movie',
            imdbRating: '8.3'
        },
        {
            Poster: 'http://ia.media-imdb.com/images/M/MV5BMTQ0OTU0NTcyNl5BMl5BanBnXkFtZTcwOTk5Mjc4OA@@._V1_SX300.jpg',
            Title: 'Toy Story 2',
            Year: '1999',
            Genre: 'Comedy',
            Type: 'Movie',
            imdbRating: '7.9'
        },
        {
            Poster: 'http://ia.media-imdb.com/images/M/MV5BMTgxOTY4Mjc0MF5BMl5BanBnXkFtZTcwNTA4MDQyMw@@._V1_SX300.jpg',
            Title: 'Toy Story 3',
            Year: '2010',
            Genre: 'Comedy',
            Type: 'Movie',
            imdbRating: '8.4'
        },
        {
            Poster: 'http://ia.media-imdb.com/images/M/MV5BMTI2MDY0ODEwNF5BMl5BanBnXkFtZTYwMDI2NTk4._V1_SX300.jpg',
            Title: 'Cast Away',
            Year: '2000',
            Genre: 'Drama',
            Type: 'Movie',
            imdbRating: '7.7'
        },
        {
            Poster: 'http://ia.media-imdb.com/images/M/MV5BMTQ1MjQwMTE5OF5BMl5BanBnXkFtZTgwNjk3MTcyMDE@._V1_SX300.jpg',
            Title: 'Frozen',
            Year: '2013',
            Genre: 'Comedy',
            Type: 'Movie',
            imdbRating: '7.6'
        }
    ];





$(document).ready(function() {

    seedDataToLocalStorage();
    addDataFromLocalStorageToDom();

});




function seedDataToLocalStorage () {
    if(!JSON.parse(localStorage.getItem('movies'))) {
        localStorage.setItem('movies', JSON.stringify(movieData));
    };
}


function updateLocalStorage (movieObj) {
    var currentStateOfLocalStorage = JSON.parse(localStorage.getItem('movies'));

    currentStateOfLocalStorage.push(movieObj);
    localStorage.setItem('movies', JSON.stringify(currentStateOfLocalStorage));
    console.log(currentStateOfLocalStorage);
}



// function removeDataFromLocalStorage (movieObj) {
//     var currentStateOfLocalStorage = JSON.parse(localStorage.getItem('movies'));

//     currentStateOfLocalStorage.forEach(function (movie, index) {
//         if (movie.Title === movieObj.Title) {
//             console.log('do a splice at ', index);
//         }
//     });
//     console.log(movieObj);
//     console.log('do a splice at', 0);

//     // currentStateOfLocalStorage.splice(currentStateOfLocalStorage.indexOf(movieObj), 1);
//     // localStorage.setItem('movies', JSON.stringify(currentStateOfLocalStorage));
//     // console.log(currentStateOfLocalStorage);


// //     var myArray = [{ title: 'The Incredibles' }, { title: 'Castaway' }]
// // undefined
// // > myArray.forEach(function (movie, index) {
// // if ( movie.title === 'The Incredibles' ) {
// // console.log('do a splice at', index);
// // }
// // ... });
// // do a splice at 0
// }

function removeDataFromLocalStorage (movieObj) {
    var currentStateOfLocalStorage = JSON.parse(localStorage.getItem('movies'));
    //currentStateOfLocalStorage is now an array of objects, we remove the object we dont want using filter, and return an array without that movie object
    var movieObjectRemoved = findObject(movieObj, currentStateOfLocalStorage);
    //then push array with movie object removed back into local storage
    localStorage.setItem('movies', JSON.stringify(movieObjectRemoved));

}

function findObject (movieObject, array) {
    return array.filter(function(el, ind) {
        return el.Title !== movieObject;
    });
}

function addDataFromLocalStorageToDom() {
    $('.movieCollection').text('');
    var allMovies = JSON.parse(localStorage.getItem('movies'));
    allMovies.forEach(function(obj) {
        $('.movieCollection').append('<div class="panel panel-info"><div class="panel-heading"><h3 class="panel-title">'+obj.Title+'</h3></div><div class="panel-body"><img class="posterImages" src="'+obj.Poster+'"><ul class="list-group col-lg-8 col-lg-offset-4 col-md-8 col-md-offset-4 col-sm-8 col-sm-offset-4"><li class="list-group-item">Release Year: '+obj.Year+'</li><li class="list-group-item">Genre: '+obj.Genre+'</li><li class="list-group-item">IMDB Rating: '+obj.imdbRating+'</li><li class="list-group-item">Media Type: '+obj.Type+'</li><br><br><br><button type="submit" class="btn btn-danger btn-block halfSize removeCollection" id="'+obj.Title+'">Remove From Collection</button></ul></div></div>');
    });
}









