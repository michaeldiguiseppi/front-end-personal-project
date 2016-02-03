$(document).ready(function() {

    console.log('DOM.js loaded');

    addDataToMoviePicks(data)

    $(this).find('.imgButton button').hide();

    /* Set placeholder text */
    setSearchPlaceholderText();
    resetForm();

    seedDataToLocalStorage();

    var currentStateOfLocalStorage = JSON.parse(localStorage.getItem('movies'));
    if (currentStateOfLocalStorage.toString() !== "") {
        addDataFromLocalStorageToDom();
    };

    createCounters();

    var random = findRandomMovie();
    addHeaderForRandomMovie();
    addMovieToDom(random);

});


$(document).on('mouseenter', '.imgButton', function() {
    var button = $(this).find('button');
    button.show();
});



$(document).on('mouseleave', '.imgButton', function() {
    var button = $('.imgButton').find('button');
    button.hide();
})

$(document).on('click', '.addCollection', addToCollection);

/* Set URL, then run API call with it */
$('.submit').on('click', runApiQueryFromInput);

 /* Allow the user to click the links to search the individual movie */

$(document).on('click', '.resultLink', runApiQueryFromResultLink);

$('#reset').on('click', function() {
    resetForm();
 });

$('.backButton').on('click', runApiQueryFromBackButton);

$('#apply-filters').on('click', applyFilters);

$(document).on('click', '.removeCollection', confirmRemoval);

$('.removeAll').on('click', confirmRemoveAllItems);

$('.showAll').on('click', showAllItems);


// ******************************************************** \\
// *************** DOM Manipulation Methods *************** \\
// ******************************************************** \\


function addDataToMoviePicks(data) {
    data.forEach(function(piece) {
        $('#moviePosters').append('<div class="col-lg-3 col-sm-12" id="'+piece.imdbID+'"><div class="homepage-hover imgButton"><img src="'+piece.Poster+'" height="300px" width="250px"><div class="caption text-center"><button type="submit" class="btn btn-success btn-block addCollection" id="'+piece.Title+'">Add to Collection</button><h3>'+piece.Title+'</h3><p>Release Year: '+piece.Year+'<br>IMDB Rating: '+piece.imdbRating+'<br>Genre: '+piece.Genre+'</p></div></div></div>');
    });
};

function appendDataToDom (response) {
    console.log(response);
    if ( !response.Search ) {
        for (var key in response) {
            if (key !== 'Poster' && key !== 'Writer') {
              $('#searchResults').append('<li class="list-group-item">' + key + ': ' + response[key] + '</li>');
            } else if (key === 'Poster') {
                $('#moviePoster').append('<div><img src="' + response[key] + '"><br><br><button type="submit" class="btn btn-success btn-block halfSize collectBtn">Add to Collection</button></div>');
            };
        };
    } else {
        response.Search.forEach(function(obj) {
            $('#searchResults').append('<li><a href="#" class="resultLink" id="' + obj.Title + '" value="'+obj.Year+'">' + obj.Title + '</a>&nbsp;-&nbsp;' + obj.Year + '</li>');
        });
    };
};

/* Reset the form back to the default states */

function resetForm () {
  $('#searchResults').text('');
  $('#moviePoster').text('');
  $('input[id="titleSearch"]').attr('placeholder', 'Title');
};


function setSearchPlaceholderText () {
    $('input[name="optionsRadios"]').on('click', function() {
        if ($('input[name="optionsRadios"]:checked').val() === 'option1') {
            $('#titleSearch').attr('placeholder', 'Title');
        } else {
            $('#titleSearch').attr('placeholder', 'Keyword');
        }
    });
};



