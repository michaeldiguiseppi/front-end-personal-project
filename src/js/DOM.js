$(document).ready(function() {
    console.log('DOM.js loaded');

    addDataToMoviePicks(data)

    $(this).find('.imgButton button').hide();

    $(document).on('mouseenter', '.imgButton', function() {
        var button = $(this).find('button');
        button.show();
    });



    $(document).on('mouseleave', '.imgButton', function() {
        var button = $('.imgButton').find('button');
        button.hide();
    })

    $(document).on('click', '.addCollection', addToCollection);


    /* Set placeholder text */
    setSearchPlaceholderText();
    resetForm();

    /* Set placeholder text */
    setSearchPlaceholderText();
    resetForm();

    /* Set URL, then run API call with it */
    $('.submit').on('click', runApiQueryFromInput);

     /* Allow the user to click the links to search the individual movie */

    $(document).on('click', '.resultLink', runApiQueryFromResultLink);

    $('#reset').on('click', function() {
        resetForm();
     });

    $('.backButton').on('click', runApiQueryFromBackButton);

    seedDataToLocalStorage();

    var currentStateOfLocalStorage = JSON.parse(localStorage.getItem('movies'));
    if (currentStateOfLocalStorage.toString() !== "") {
        addDataFromLocalStorageToDom();
    };

    createCounters();

    $('#apply-filters').on('click', applyFilters);

    $(document).on('click', '.removeCollection', confirmRemoval);

    $('.removeAll').on('click', confirmRemoveAllItems);

    $('.showAll').on('click', showAllItems);

    var random = findRandomMovie();
    addHeaderForRandomMovie();
    addMovieToDom(random);

});




