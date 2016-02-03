// $(document).ready(function() {
//     var random = findRandomMovie();
//     addHeaderForRandomMovie();
//     addMovieToDom(random);
// });

// function addHeaderForRandomMovie () {
//     $('.randomMovie').append('<h2 class="text-center">Don\'t know what to watch?  Try this random movie from your collection!</h2><br><br>');
// }

// function findRandomMovie() {
//     var movieTotal = JSON.parse(localStorage.getItem('movies'));
//     var randomNum = Math.floor((Math.random()*movieTotal.length-1)+1);

//     console.log('Length: ', movieTotal.length, 'Random Num: ', randomNum);
//     console.log(movieTotal[randomNum]);
//     return movieTotal[randomNum];
// };


// function addMovieToDom(obj) {
// $('.randomMovie').append('<div class="panel panel-info"><div class="panel-heading"><h3 class="panel-title">'+obj.Title+'</h3></div><div class="panel-body"><img class="posterImages" src="'+obj.Poster+'"><ul class="list-group col-lg-8 col-lg-offset-4 col-md-8 col-md-offset-4 col-sm-8 col-sm-offset-4"><li class="list-group-item">Release Year: '+obj.Year+'</li><li class="list-group-item">Genre: '+obj.Genre+'</li><li class="list-group-item">IMDB Rating: '+obj.imdbRating+'</li><li class="list-group-item">Media Type: '+obj.Type+'</li><br><br><br></ul></div></div>');
// }