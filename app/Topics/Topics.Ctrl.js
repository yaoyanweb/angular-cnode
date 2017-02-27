angular.module('index_area').config(function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise("/topics/list");
    $stateProvider
        .state("/list", {
            url: "/topics/list",
            templateUrl: "Topics/list.html",
            controller: 'TopicslistCtrl'
        })
        .state("/detail", {
            url: "/topics/detail/{id:string}",
            templateUrl: "Topics/detail.html",
            controller: 'TopicsdetailCtrl'
        })
}).controller('TopicsCtrl', TopicsCtrl);
TopicsCtrl.$inject = ['$state', '$scope'];
function TopicsCtrl($state, $scope) {

}
