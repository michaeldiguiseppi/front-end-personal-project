// var data = [
//     {
//         Poster: 'http://ia.media-imdb.com/images/M/MV5BMjAyOTUzMTcxN15BMl5BanBnXkFtZTgwMjkyOTc1MDE@._V1_SX300.jpg',
//         Title: 'RoboCop',
//         Year: '2014',
//         Genre: 'Action',
//         Type: 'movie',
//         imdbRating: '6.2',
//         imdbID: 'tt1234721'

//     },
//     {
//         Poster: 'http://ia.media-imdb.com/images/M/MV5BMTI2MDY0ODEwNF5BMl5BanBnXkFtZTYwMDI2NTk4._V1_SX300.jpg',
//         Title: 'Cast Away',
//         Year: '2000',
//         Genre: 'Drama',
//         Type: 'movie',
//         imdbRating: '7.7',
//         imdbID: 'tt0162222'
//     },
//     {
//         Poster: 'http://ia.media-imdb.com/images/M/MV5BMTUxMjQ5NzgyOF5BMl5BanBnXkFtZTcwNDg0ODYyMQ@@._V1_SX300.jpg',
//         Title: 'The Aviator',
//         Year: '2004',
//         Genre: 'Drama',
//         Type: 'movie',
//         imdbRating: '7.5',
//         imdbID: 'tt0338751'
//     },
//     {
//         Poster: 'http://ia.media-imdb.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg',
//         Title: 'Iron Man',
//         Year: '2008',
//         Genre: 'Action',
//         Type: 'movie',
//         imdbRating: '7.9',
//         imdbID: 'tt0371746'
//     }
// ];



// $(document).on('ready', function() {


//     addDataToMoviePicks(data)

//     $(this).find('.imgButton button').hide();

//     $(document).on('mouseenter', '.imgButton', function() {
//         var button = $(this).find('button');
//         button.show();
//     });



//     $(document).on('mouseleave', '.imgButton', function() {
//         var button = $(this).find('button');
//         button.hide();
//     })

//     $(document).on('click', '.addCollection', addToCollection);

// });



// function addDataToMoviePicks(data) {
//     data.forEach(function(piece) {
//         $('#moviePosters').append('<div class="col-lg-3 col-sm-12" id="'+piece.imdbID+'"><div class="homepage-hover imgButton"><img src="'+piece.Poster+'" height="300px" width="250px"><div class="caption text-center"><button type="submit" class="btn btn-success btn-block addCollection" id="'+piece.Title+'">Add to Collection</button><h3>'+piece.Title+'</h3><p>Release Year: '+piece.Year+'<br>IMDB Rating: '+piece.imdbRating+'<br>Genre: '+piece.Genre+'</p></div></div></div>');
//     });
// };


// function addToCollection () {
//     var movieObj = $(this).attr('id');
//         var thisTitle = data.filter(function (movie) {
//             return movie.Title === movieObj;
//         });
//         var reducedMovie = thisTitle.reduce(function (movie, value, key) {
//             movie[key] = value;
//             return movie;
//         });
//         updateLocalStorage(reducedMovie);
//         $(this).prop('disabled', true);
//         $(this).text('Added');
//     };








