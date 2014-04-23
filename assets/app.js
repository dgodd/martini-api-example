var myApp = angular.module('albums', ['ui.router','restangular']);
myApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise("/albums");
  $stateProvider.state('albums', {
    url: '/albums',
    templateUrl: 'templates/albums/index.html',
    controller: 'AlbumsController' });
}]);

myApp.controller('AlbumsController', function($scope, Restangular) {
  var Album = Restangular.all('albums');
  $scope.albums = Album.getList().$object;
  $scope.newAlbum = {};
  $scope.add = function(){
    Album.post($scope.newAlbum).then(function(){
      $scope.albums = Album.getList().$object;
      $scope.newAlbum = {};
      $scope.focusTitle = true;
    });
  };
  $scope.update = function(album){
    album.put().then(function(){
      $scope.albums = Album.getList().$object;
    });
  };
});
