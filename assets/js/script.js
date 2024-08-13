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
            $('#imdb-rating').text(`IMDb: ${data.Ratings[0].Value}`);
            $('#tomato-rating').text(`Rotten Tomatos: ${data.Ratings[1].Value}`);
            $('#runtime').text(`Runtime: ${data.Runtime}`);
            $('#director').text(`Directed by ${data.Director}`)
            $('#writer').text(`Writers: ${data.Writer}`);
            $('#actors').text(`Leading Actors: ${data.Actors}`);
            $('#plot').text(data.Plot);
            // $('.omdb-data').css("background-image", 'url(' + data.Poster + ')');
            $('#movie-poster').attr('src', data.Poster);
            // localStorage.setItem('current-movie', data.Title);
          })
        }
      }
    )

    $('#player').attr('src', `https://www.youtube.com/embed/${youtubeID}?enablejsapi=1&origin=http://example.com`);

    $('#player').show();
    $('.omdb-data').show();
}

let favoriteStore = JSON.parse(localStorage.getItem('favorites'));

if (favoriteStore === null) {
  let newArray = [];
  localStorage.setItem('favorites', JSON.stringify(newArray))
};

let favList = document.querySelector('#favorite-movies');

function displayFavorites() {
  let movieList = JSON.parse(localStorage.getItem('favorites'));

  for (let i = 0; i < movieList.length; i++) {
    let favMovie = document.createElement('li')

    favMovie.textContent = movieList[i];

    favList.appendChild(favMovie);
  }

  if (movieList.length > 0) {
    $('#favorite-movies').show();
    $('#clear-favs').show();
  }
}

function addFavorite() {
  movie = $('#movie-title');

  favoriteStore.push(movie.text());

  localStorage.setItem('favorites', JSON.stringify(favoriteStore));

  while (favList.lastElementChild) {
    favList.removeChild(favList.lastElementChild)
  };
  displayFavorites();
}

function clearFavorites() {
  while (favList.lastElementChild) {
    favList.removeChild(favList.lastElementChild)
  };
  let blankArray = [];

  localStorage.setItem('favorites', JSON.stringify(blankArray));
  location.reload();
}

$('#player').hide();
$('.omdb-data').hide();
$('#favorite-movies').hide();
$('#clear-favs').hide();

$('.video-buttons').on('click', getContent);
$('#favorite').on('click',addFavorite);
$('#clear-favs').on('click', clearFavorites);

displayFavorites();