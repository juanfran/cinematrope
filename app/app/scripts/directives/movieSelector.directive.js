app
  .controller('SelectMovieController', function (movieApiService, movieSelectedService) {
    var vm = this;

    vm.fields = {};
    vm.genres = [];

    movieSelectedService(vm, 'movieSelected');

    movieApiService
      .getGenres()
      .then(function (result) {
        vm.genres = result;
      });

    vm.submit = function() {
        vm.movieSelected = vm.fields;
    };
  })
  .directive('movieSelector', function() {
    return {
      scope: {},
      restrict: 'E',
      templateUrl: 'views/components/nav.html',
      controller: 'SelectMovieController',
      controllerAs: 'vm'
    }
  });
