myApp.controller('FavoritesController', ['$scope', '$http', function($scope, $http) {

$scope.allFavs = [];

getFavorites();

function getFavorites() {
$http.get('/favorite')
.then(function (response) {
 $scope.allFavs = response.data;
  console.log('GET /favorite ', response.data);

});
}

}]);
