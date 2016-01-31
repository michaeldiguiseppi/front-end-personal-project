



$(document).on('ready', function() {
  console.log('Collection!');
  $('.sortAnchor').on('click', function(event) {
    event.preventDefault();
  });

  $('.comedy').on('click', function() {

    });

  $(document).on('click', '.removeCollection', function() {
    var movieObj = $(this).find('.panel-title');
    var movieTitle = movieObj.text();
    debugger;
    removeDataFromLocalStorage(movieObj);
  })

});


