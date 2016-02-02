



// $(document).on('ready', function() {
//     console.log('Collection!');

//     createCounters();

//     $('#apply-filters').on('click', applyFilters);

//     $(document).on('click', '.removeCollection', confirmRemoval);

//     $('.removeAll').on('click', confirmRemoveAllItems);

//     $('.showAll').on('click', showAllItems);

// });

// function applyFilters (event) {
//     event.preventDefault();
//     addDataFromLocalStorageToDom();
//     var selectedFilters = {};
//     selectedFilters.Genre = $('option[data-name="genre"]:selected').val();
//     selectedFilters.Type = $('option[data-name="type"]:selected').val();
//     if ($('option[data-name="year"]:selected').val() !== "") {
//         selectedFilters.Years = $('option[data-name="year"]:selected').val().split('-');
//     } else {
//         selectedFilters.Years = "";
//     }
//     if ($('option[data-name="rating"]:selected').val() !== "") {
//         selectedFilters.imdbRating = $('option[data-name="rating"]:selected').val().split('-');
//     } else {
//         selectedFilters.imdbRating = "";
//     }
//     var movies = JSON.parse(localStorage.getItem('movies'));

//     var hideMovies = filterData(movies, selectedFilters) // array of new data


//     movies.forEach(function (movieObj) {
//         $('#'+movieObj.imdbID).addClass('hiddenPanel');
//     });
//     hideMovies.forEach(function (movieObj) {
//         $('#'+movieObj.imdbID).removeClass('hiddenPanel');
//     });
// }

// function confirmRemoval () {
//     var movieObj = $(this).attr('id');
//     bootbox.confirm('Are you sure you want to remove this from your collection?', function (result) {
//         if (result) {
//             removeDataFromLocalStorage(movieObj);
//             addDataFromLocalStorageToDom();
//             createCounters();
//             setEmptyContent();
//         }
//     }).find('.btn-primary').addClass('btn-info');
// }

// function confirmRemoveAllItems () {
//     bootbox.confirm('Are you sure you want to remove all items from your collection? This cannot be undone.', function (result) {
//         if (result) {
//             removeAllDataFromLocalStorage();
//             addDataFromLocalStorageToDom();
//             setEmptyContent();
//             createCounters();
//         };
//     });
// }

// function filterData(movies, filters) {
//     return movies.filter(function (movie) {
//         var allGenres = movie.Genre.split(', ');
//         var thisGenre = allGenres.filter(function (genre) {
//             return genre === filters.Genre;
//         });
//         return thisGenre[0] === filters.Genre || !filters.Genre;
//     }).filter(function (movie) {
//         return movie.Type === filters.Type || !filters.Type;
//     }).filter(function (movie) {
//         if (filters.Years === "") {
//             return !filters.Years;
//         } else {
//             return (movie.Year >= filters.Years[0] && movie.Year <= filters.Years[1])
//         };
//     }).filter(function (movie) {
//         if (filters.imdbRating === "") {
//             return !filters.imdbRating;
//         } else {
//             return (movie.imdbRating >= filters.imdbRating[0] && movie.imdbRating <= filters.imdbRating[1]);
//         };
//     });
// };

// function showAllItems () {
//     addDataFromLocalStorageToDom();
//     $('option[value=""]').prop('selected', true);
// }


// function createCounters () {
//     var collection = JSON.parse(localStorage.getItem('movies'));
//     $('#collectionCount').text('Total Items in Your Collection: ' + collection.length);
// };

// function setEmptyContent () {
//     $('#emptyContent').text('Oops!  Looks like your collection is empty.  Please use the search page to add items to your collection.');
// }


