var movieData = [
        {
            Poster: 'http://ia.media-imdb.com/images/M/MV5BMTgwMjI4MzU5N15BMl5BanBnXkFtZTcwMTMyNTk3OA@@._V1_SX300.jpg',
            Title: 'Toy Story',
            Year: '1995',
            Genre: 'Comedy',
            Type: 'Movie',
            Rating: '8.3'
        },
        {
            Poster: 'http://ia.media-imdb.com/images/M/MV5BMTQ0OTU0NTcyNl5BMl5BanBnXkFtZTcwOTk5Mjc4OA@@._V1_SX300.jpg',
            Title: 'Toy Story 2',
            Year: '1999',
            Genre: 'Comedy',
            Type: 'Movie',
            Rating: '7.9'
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

    localStorage.setItem('movies', JSON.stringify(movieObj));
    console.log(movieObj);
}


function removeDataFromLocalStorage () {

}

function addDataFromLocalStorageToDom() {
    $('.myCollection').empty();
    var allMovies = JSON.parse(localStorage.getItem('movies'));
    allMovies.forEach(function(obj) {
        $('.movieCollection').append('<div class="panel panel-info"><div class="panel-heading"><h3 class="panel-title">'+obj.Title+'</h3></div><div class="panel-body"><img class="posterImages" src="'+obj.Poster+'"><ul class="list-group col-lg-8 col-lg-offset-4 col-md-8 col-md-offset-4 col-sm-8 col-sm-offset-4"><li class="list-group-item">Release Year: '+obj.Year+'</li><li class="list-group-item">Genre: '+obj.Genre+'</li><li class="list-group-item">IMDB Rating: '+obj.Rating+'</li><li class="list-group-item">Media Type: '+obj.Type+'</li></ul></div></div>');
    });
}









