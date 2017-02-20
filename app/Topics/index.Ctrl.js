angular.module('index_area').controller('indexCtrl', indexCtrl);
indexCtrl.$inject = ['$state', '$scope','$stateParams'];
function indexCtrl($state, $scope,$stateParams) {
   $scope.name=$stateParams.name;

}

