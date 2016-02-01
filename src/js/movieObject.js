

$(document).ready(function() {

    seedDataToLocalStorage();
    var currentStateOfLocalStorage = JSON.parse(localStorage.getItem('movies'));
    if (currentStateOfLocalStorage.toString() !== "") {
        addDataFromLocalStorageToDom();
    }



});




function seedDataToLocalStorage () {
    if(!JSON.parse(localStorage.getItem('movies'))) {
        localStorage.setItem('movies', JSON.stringify([]));
    };
}


function updateLocalStorage (movieObj) {
    var currentStateOfLocalStorage = JSON.parse(localStorage.getItem('movies'));

    var movieObjectAdd = checkObject(movieObj, currentStateOfLocalStorage);

    if (movieObjectAdd.length > 0) {
        console.log(movieObjectAdd);
        bootbox.alert('This item is already in your collection.');
    } else {
        currentStateOfLocalStorage.push(movieObj);
        localStorage.setItem('movies', JSON.stringify(currentStateOfLocalStorage));
    };
};


function removeDataFromLocalStorage (movieObj) {
    var currentStateOfLocalStorage = JSON.parse(localStorage.getItem('movies'));
    //currentStateOfLocalStorage is now an array of objects, we remove the object we dont want using filter, and return an array without that movie object
    // var test = confirm('Are you sure you want to remove this title from your collection?  This cannot be undone.');


    // if (test) {
        var movieObjectRemoved = findObject(movieObj, currentStateOfLocalStorage);
        //then push array with movie object removed back into local storage
        localStorage.setItem('movies', JSON.stringify(movieObjectRemoved));
    // }


}

function findObject (movieObject, array) {
    return array.filter(function(el, ind) {
        return el.Title !== movieObject;
    });
}


function checkObject (movieObj, array) {
    return array.filter(function (el, index) {
        return el.Title === movieObj.Title;
    });
};

function addDataFromLocalStorageToDom() {
    $('.movieCollection').text('');
    var allMovies = JSON.parse(localStorage.getItem('movies'));
    allMovies.forEach(function(obj) {
        $('.movieCollection').append('<div class="panel panel-info" id="'+obj.imdbID+'"><div class="panel-heading"><h3 class="panel-title">'+obj.Title+'</h3></div><div class="panel-body"><img class="posterImages" src="'+obj.Poster+'"><ul class="list-group col-lg-8 col-lg-offset-4 col-md-8 col-md-offset-4 col-sm-8 col-sm-offset-4"><li class="list-group-item">Release Year: '+obj.Year+'</li><li class="list-group-item">Genre: '+obj.Genre+'</li><li class="list-group-item">IMDB Rating: '+obj.imdbRating+'</li><li class="list-group-item">Media Type: '+obj.Type+'</li><br><br><br><button type="submit" class="btn btn-danger btn-block halfSize removeCollection" id="'+obj.Title+'" data-toggle="modal" data-target="#removeModal">Remove</button></ul></div></div>');
    });

}

function removeAllDataFromLocalStorage() {
    var removeAll = JSON.parse(localStorage.getItem('movies'));
    removeAll = [];
    localStorage.setItem('movies', JSON.stringify(removeAll));
}









