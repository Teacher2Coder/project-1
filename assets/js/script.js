// This segment of code takes care oft he YouTube API
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;


function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
    height: '390',
    width: '640',
    // Whatever you do, DO NOT watch a YouTube video with this ID!!!!
    videoId: 'dQw4w9WgXcQ',
    playerVars: {
        'playsinline': 1
    },
    events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
    }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
    }
}
function stopVideo() {
    player.stopVideo();
}




// Custom JavaScript File
const videoBtns = $('video-buttons');

// This function collects information for each movie and diplay
function getContent(event) {
    youtubeID = event.target.getAttribute('data-youtube');
    imdbId = event.target.getAttribute('data-imdb');

    omdbUrl = `https://www.omdbapi.com/?i=${imdbId}&plot=full&apikey=6de910de&`;

    fetch(omdbUrl)
      .then (function (response) {
        if (response.ok) {
          response.json().then (function (data) {
            $('#movie-title').text(data.Title);
            $('#release-year').text(data.Year);
            $('#rating').text(data.Rated);
            $('#imdb-id').text(data.imdbID);
            $('#imdb-id').hide();
            $('#imdb-rating').text(`IMDb: ${data.Ratings[0].Value}`);
            $('#tomato-rating').text(`Rotten Tomatos: ${data.Ratings[1].Value}`);
            $('#runtime').text(`Runtime: ${data.Runtime}`);
            $('#director').text(`Directed by ${data.Director}`)
            $('#writer').text(`Writers: ${data.Writer}`);
            $('#actors').text(`Leading Actors: ${data.Actors}`);
            $('#plot').text(data.Plot);
            $('#movie-poster').attr('src', data.Poster);
          })
        }
      }
    )

    $('#player').attr('src', `https://www.youtube.com/embed/${youtubeID}?enablejsapi=1&origin=http://example.com`);

    $('#player').show();
    $('.omdb-data').show();
    $('.omdb-data')[0].scrollIntoView();
}

let favoriteStore = JSON.parse(localStorage.getItem('favorites'));

if (favoriteStore === null) {
  let newObject = {
    movieTitle: [],
    trailer: [],
    imdb: [],
  };
  localStorage.setItem('favorites', JSON.stringify(newObject))
};

let favList = document.querySelector('#favorite-movies');


// This function will display a list of your favorite Marvel Movies
function displayFavorites() {
  let movieList = JSON.parse(localStorage.getItem('favorites'));

  for (let i = 0; i < movieList.movieTitle.length; i++) {
    let favMovie = document.createElement('li')

    favMovie.textContent = movieList.movieTitle[i];
    favMovie.setAttribute('data-youtube', movieList.trailer[i]);
    favMovie.setAttribute('data-imdb', movieList.imdb[i]);
    favMovie.classList.add('button');
  
    favList.appendChild(favMovie);
  }

  if (movieList.movieTitle.length > 0) {
    $('#fav-list').show();
  }
}

// This function will allow the user to add movies to their favorites list
function addFavorite() {
  movie = $('#movie-title');
  embedURL = $('#player').attr('src');
  saveYouTube = embedURL.slice(30, -40);
  saveIMDB = $('#imdb-id').text();

  favoriteStore = JSON.parse(localStorage.getItem('favorites'));

  // Checks to see if the movie is already in the list
  if (Object.values(favoriteStore.movieTitle).indexOf(movie.text()) === -1) {

    favoriteStore.movieTitle.push(movie.text());
    favoriteStore.imdb.push(saveIMDB);
    favoriteStore.trailer.push(saveYouTube);

    localStorage.setItem('favorites', JSON.stringify(favoriteStore));

    while (favList.lastElementChild) {
      favList.removeChild(favList.lastElementChild)
    };

    embedURL = $('#player').attr('src');

    displayFavorites();
    $('#fav-list')[0].scrollIntoView();

  } else {
    // Displays this alert if the movie is already in the lists
    window.alert("This movie is already in your favorites");
  }
}

// This function clears the favorites list and the localStorage
function clearFavorites() {
  while (favList.lastElementChild) {
    favList.removeChild(favList.lastElementChild)
  };
  let blankObject = {
    movieTitle: [],
    trailer: [],
    imdb: [],
  };

  localStorage.setItem('favorites', JSON.stringify(blankObject));
  location.reload();
}

// Hides the Video player
$('#player').hide();
// Hides the Div containing the data
$('.omdb-data').hide();
// Hides the favorite's list by default
$('#fav-list').hide();

// Adds click events
$('.video-buttons').on('click', getContent);
$('#favorite-movies').on('click', getContent);
$('#favorite').on('click',addFavorite);
$('#clear-favs').on('click', clearFavorites);

// Displays favorites if there are favorites to display
displayFavorites();