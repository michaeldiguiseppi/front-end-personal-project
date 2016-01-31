


$(document).on('ready', function() {
    var data = [
    {
        poster: 'http://ia.media-imdb.com/images/M/MV5BMjAyOTUzMTcxN15BMl5BanBnXkFtZTgwMjkyOTc1MDE@._V1_SX300.jpg',
        title: 'RoboCop',
        year: '2014',
        genre: 'Action',
        type: 'movie',
        imdbRating: '6.2'

    },
    {
        poster: 'http://ia.media-imdb.com/images/M/MV5BMTI2MDY0ODEwNF5BMl5BanBnXkFtZTYwMDI2NTk4._V1_SX300.jpg',
        title: 'Cast Away',
        year: '2000',
        genre: 'Drama',
        type: 'movie',
        imdbRating: '7.7'
    },
    {
        poster: 'http://ia.media-imdb.com/images/M/MV5BMTUxMjQ5NzgyOF5BMl5BanBnXkFtZTcwNDg0ODYyMQ@@._V1_SX300.jpg',
        title: 'The Aviator',
        year: '2004',
        genre: 'Drama',
        type: 'movie',
        imdbRating: '7.5'
    },
    {
        poster: 'http://ia.media-imdb.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg',
        title: 'Iron Man',
        year: '2008',
        genre: 'Action',
        type: 'movie',
        imdbRating: '7.9'
    }
];

    addDataToMoviePicks(data)

    $(document).on('hover', '.imgButton', function() {
        var button = $(this).find('button');
        button.toggleClass('hiddenButton');
    });




});



function addDataToMoviePicks(data) {
    data.forEach(function(piece) {
        $('#moviePosters').append('<div class="col-lg-3 col-sm-12"><div class="homepage-hover imgButton"><img src="'+piece.poster+'" height="300px" width="250px"><div class="caption text-center"><button type="submit" class="btn btn-success btn-block hiddenButton">Add to Collection</button><h3>'+piece.title+'</h3><p>'+piece.year+'<br>'+piece.imdbRating+'<br>'+piece.genre+'</p></div></div></div>');
    });
};











