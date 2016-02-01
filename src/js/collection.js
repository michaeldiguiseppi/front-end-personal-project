



$(document).on('ready', function() {
  console.log('Collection!');
  $('.sortAnchor').on('click', function(event) {
    event.preventDefault();
  });

    $('.sortAnchor.genre').on('click', function() {
        var myCollection = JSON.parse(localStorage.getItem('movies'))
        var filterClicked = $(this).text();
        console.log(filterClicked);
        var hideMovies = myCollection.filter(function (movie) {
            var allGenres = movie.Genre.split(', ');
            return allGenres.indexOf(filterClicked) === -1
        });


        addDataFromLocalStorageToDom();
        hideMovies.forEach(function (movieObj) {

            $('#'+movieObj.imdbID).addClass('hiddenPanel');
        });
    });

    $('.sortAnchor.type').on('click', function() {
        var myCollection = JSON.parse(localStorage.getItem('movies'));
        var filterClicked = $(this).text();
        console.log(filterClicked);
        var hideMovies = myCollection.filter(function (movie) {
            var movieType = movie.Type;
            return movieType !== filterClicked.toLowerCase();
        });

        console.log(hideMovies);

        addDataFromLocalStorageToDom();
        hideMovies.forEach(function (movieObj) {
            $('#'+movieObj.imdbID).addClass('hiddenPanel');
        });
    });

  $(document).on('click', '.removeCollection', function() {
        var movieObj = $(this).attr('id');
        bootbox.confirm('Are you sure you want to remove this from your collection?', function (result) {
            if (result) {
                removeDataFromLocalStorage(movieObj);
                addDataFromLocalStorageToDom();
            }
        }).find('.btn-primary').addClass('btn-info');
    });

  $(document).on('click', '.removeAll', function() {
    bootbox.confirm('Are you sure you want to remove all items from your collection? This cannot be undone.', function (result) {
            if (result) {
                removeAllDataFromLocalStorage();
                addDataFromLocalStorageToDom();
            };
        });

  });


});



