



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

    $('.sortAnchor.year').on('click', function() {
        var myCollection = JSON.parse(localStorage.getItem('movies'));
        var filterClicked = $(this).text();
        console.log(filterClicked);

        if (filterClicked === '2011 and Newer') {
            var minYear = filterClicked.substr(0, 4);
            var maxYear = new Date().getFullYear();
            console.log('MinYear: ', minYear, 'MaxYear: ', maxYear);
        } else if (filterClicked.indexOf('-') === -1) {
            var maxYear = filterClicked.substr(filterClicked.indexOf(' ')+1, 4);
            var minYear = '1900';
            console.log('Minimum: ', minYear, 'Maximum: ', maxYear);
        } else {
            var minYear = filterClicked.substr(0, 4);
            var maxYear = filterClicked.substr(filterClicked.indexOf('-')+1, 4);
            console.log('Min: ', minYear, 'Max: ', maxYear);
        };


        var hideMovies = myCollection.filter(function (movie) {
            var movieYear = movie.Year;
            return movieYear < minYear || movieYear > maxYear;
        });

        console.log(hideMovies);

        addDataFromLocalStorageToDom();
        hideMovies.forEach(function (movieObj) {
            $('#'+movieObj.imdbID).addClass('hiddenPanel');
        });
    });

$('.sortAnchor.rating').on('click', function() {
        var myCollection = JSON.parse(localStorage.getItem('movies'));
        var filterClicked = $(this).text();
        console.log(filterClicked);

        if (filterClicked.indexOf('-') === -1) {
            var maxRating = filterClicked.substr(filterClicked.indexOf(' ')+1, 1);
            var minRating = '0';
            console.log('Minimum: ', minRating, 'Maximum: ', maxRating);
        } else {
            var minRating = filterClicked.substr(0, 3);
            var maxRating = filterClicked.substr(filterClicked.indexOf('-')+1, 4);
            console.log('Min: ', minRating, 'Max: ', maxRating);
        };


        var hideMovies = myCollection.filter(function (movie) {
            var movieRating = movie.imdbRating;
            return movieRating < minRating || movieRating > maxRating;
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

  $('.removeAll').on('click', function() {
    bootbox.confirm('Are you sure you want to remove all items from your collection? This cannot be undone.', function (result) {
            if (result) {
                removeAllDataFromLocalStorage();
                addDataFromLocalStorageToDom();
            };
        });

  });

  $('.showAll').on('click', function() {
    addDataFromLocalStorageToDom();
  });


});



