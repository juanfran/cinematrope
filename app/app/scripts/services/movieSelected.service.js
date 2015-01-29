app.factory('movieSelectedService', function () {
  var movieSelected = {};

  return function(obj, name) {
    Object.defineProperty(obj, 'movieSelected', {
      enumerable: true,
      configurable: false,
      set: function (value) {
        movieSelected = {
          genre: value.genre,
          releaselte: value.year ? value.year + '-01-01' : null,
          releasegte: value.year ? (value.year - 10) + '-01-01' : null,
          vote: value.vote
        }
      },
      get: function () {
        return movieSelected;
      }
    });
  };
});
