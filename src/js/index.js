$(document).on('ready', function() {
    $('.imgButton').hover(function() {
        var button = $(this).find('button');
        button.toggleClass('hiddenButton');
    });
});
