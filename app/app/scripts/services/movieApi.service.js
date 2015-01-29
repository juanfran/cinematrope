app.service('movieApiService', function ($http, api_key) {
  // Get Default reference movies
  var getMovies = function () {
    return $http({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/discover/movie',
      params: {
        api_key: api_key,
        'vote_average.gte': 8,
        'vote_count.gte': 500,
        sort_by: 'vote_average.desc'
      }
    }).then(function (result) {
      return result.data.results;
    });
  };

  // Get A selected Movie from form
  var getSelectedMovie = function (data) {
    return $http({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/discover/movie',
      params: {
        api_key: api_key,
        'with_genres': data.genre,
        'release_date.lte': data.releaselte,
        'release_date.gte': data.releasegte,
        'vote_average.lte': data.vote,
        'vote_count.gte': 30,
        sort_by: 'popularity.desc'
      }
    }).then(function (result) {
      return result.data.results;
    });
  };

  // Get Genres
  var getGenres = function () {
    return $http({
      url: 'http://api.themoviedb.org/3/genre/movie/list',
      method: 'GET',
      params: {
        api_key: api_key
      }
    }).then(function (result) {
      return result.data.genres;
    });
  };

  // Returned accesible functions
  return {
    getMovies: getMovies,
    getSelectedMovie: getSelectedMovie,
    getGenres: getGenres,
  };
});
