var myMovieCollection = new MovieCollection();

$(document).ready(function() {

    myMovieCollection.addDataToMoviePicks(data);

    $(this).find('.imgButton button').hide();

    /* Set placeholder text */
    setSearchPlaceholderText();
    resetForm();

    myMovieCollection.seedDataToLocalStorage();

    var currentStateOfLocalStorage = JSON.parse(localStorage.getItem('movies'));
    if (currentStateOfLocalStorage.toString() !== "") {
        myMovieCollection.addDataFromLocalStorageToDom();
    };

    createCounters();


});


$(document).on('mouseenter', '.imgButton', function() {
    var button = $(this).find('button');
    button.show();
});



$(document).on('mouseleave', '.imgButton', function() {
    var button = $('.imgButton').find('button');
    button.hide();
})

$(document).on('click', '.addCollection', myMovieCollection.addToCollection);

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

function addRandom() {
        var random = findRandomMovie();
        addHeaderForRandomMovie();
        myMovieCollection.addRandomMovieToDom(random);
    };



