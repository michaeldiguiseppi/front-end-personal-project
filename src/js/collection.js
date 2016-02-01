



$(document).on('ready', function() {
  console.log('Collection!');
  $('.sortAnchor').on('click', function(event) {
    event.preventDefault();
  });

  $('.comedy').on('click', function() {
        var myCollection = JSON.parse(localStorage.getItem('movies'))
        myCollection.forEach(function (movie) {
            var allGenres = movie.Genre.split(', ');
            return allGenres.filter(function (genre) {
                return genre === 'Comedy';
            });

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
});



