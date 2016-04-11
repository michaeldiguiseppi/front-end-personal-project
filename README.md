# Mike's Personal Project


## Functions and Uses

This site is a multi-function movie search/collection management solution for the avid
movie watchers amongst us.  It will have a page to search for movies, as well as
the ability to add the movies to your own collection, or just view the IMDB information
about the movie.  In addition, it will have the ability to generate a random movie
from your collection, as a "What to Watch" function.

## Technologies used

It will utilize HTML and CSS along with Bootstrap to build the UI of the site.  In addition,
it will use jQuery and javascript to execute the movie search.  During the search,
it will communicate with the OMDB API to pull the movie data.  Once you select
to add the movie to your collection, it will create a localStorage database containing
each of the movies that you add.  The localStorage object will start with a few
"Best Picks by Mike" movies inside it.  Also, the "My Collection" page will list the
movies from localStorage and display the movie poster, along with some basic information
on each.



## Features

### Movie Search

The ability to search for movies from OMDB, either by specific title, or by a list
of multiple movies that match the searched keyword in their titles.


### Add to Collection

The ability to add a searched movie to your collection, to be stored for later use
as well as populating the array that the random movie generator pulls data from
to tell you what to watch.

### What to Watch

The ability to randomly generate a movie from your stored collection (localStorage).
Potentially use the Netflix API to generate a random movie that is currently available
on Netflix.


## Stretch Goals

The ability to implement another search that, when searching for a movie title on
the OMDB API, it also searches youtube for an official trailer for the selected
movie.  This would be a feature on the search page.

### Pivotal Tracker

Follow my project on [Pivotal Tracker Board](https://www.pivotaltracker.com/n/projects/1525201)

### Site Deployed

My project can be viewed at [on Firebase](https://MMDB-Movie-Database.firebaseapp.com)
or [on EC2](http://movies.mikedee.xyz) (I'm aware the images are not working and I'm currently working on a resolution.)
