app
  .controller('MovieController', function (movieSelectedService) {
    var vm = this;

    vm.movies = [];

    movieSelectedService(vm, 'movieSelected');
  })
  .directive('moviesList', function(movieApiService) {
    function statLoading(element) {
      element.find('.movie-shot').fadeOut();
      element.find('.spinner').show();
    }

    function endLoading(element) {
      element.find('.spinner').hide();

      setTimeout(function () {
        element.find('.movie-shot').fadeIn();
      }, 100);
    }

    return {
      restrict: 'E',
      templateUrl: 'views/modules/movie-list.html',
      controller: 'MovieController',
      controllerAs: 'vm',
      bindToController: true,
      link: function(scope, element, attrs, ctrl) {
        scope.$watch('vm.movieSelected', function(movieSelected, old) {
          if (movieSelected === old) return;

          statLoading(element);

          movieApiService.getSelectedMovie(movieSelected)
            .then(function (moviesResponse) {
              scope.vm.movies = moviesResponse;
              endLoading(element);
            });
        });

        movieApiService.getMovies()
          .then(function (moviesResponse) {
            scope.vm.movies = moviesResponse;
            endLoading(element);
          });
      }
    }
  });
