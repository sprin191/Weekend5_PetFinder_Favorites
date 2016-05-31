myApp.controller('PetController', ['$scope', '$http', function($scope, $http) {
    $scope.animal = '';
    $scope.pet = {};
    $scope.hidden = true;
    $scope.allFavs = [];

//Immediately retrieves favorited pet data at page load.
    getFavorites();

    function getFavorites() {
    $http.get('/favorite')
    .then(function (response) {
     $scope.allFavs = response.data;
      console.log('GET /favorite ', response.data);

    });
    }

//Calls getRandomPet function when user selects a type of animal.
    $scope.changeAnimal = function() {
        console.log($scope.animal);

        if($scope.animal !== '') {
            $scope.getRandomPet();
        }
    };

//Retrieves a random pet from the API database based on the user's selected animal type.
    $scope.getRandomPet = function() {
        // API key
        var key = 'b900e0d5e332753a460a64eaa8de00fd';
        $scope.hidden = false;
        var baseURL = 'http://api.petfinder.com/';
        var query = 'pet.getRandom';
        query += '?key=' + key;
        query += '&animal=' + $scope.animal;
        query += '&output=basic';
        query += '&format=json';

        var request = baseURL + encodeURI(query) + '&callback=JSON_CALLBACK';
        console.log(request);

        $http.jsonp(request).then(
            function(response) {
                $scope.pet = response.data.petfinder.pet;
                console.log($scope.pet);
            }
        );
    };

//Submits/saves the user's favorited animal.
    $scope.submitFavorite = function () {
        $scope.favInfo = {
          petID: $scope.pet.id.$t,
          name: $scope.pet.name.$t,
          image: $scope.pet.media.photos.photo[2].$t,
          description: $scope.pet.description.$t.substring(0, 100),
          city: $scope.pet.contact.city.$t,
          state: $scope.pet.contact.state.$t
        };
        var data = $scope.favInfo;
        console.log(data);
        $http.post('/favorite', data)
          .then(function () {
            console.log('POST /favorite');
            getFavorites();
          });
      };

}]);
