angular
    .module("index_area", ["ui.router", 'LocalStorageModule','ngResource','ngSanitize'])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        $urlRouterProvider.otherwise("/topics");
        $httpProvider.defaults.transformRequest = function (obj) {
            var str = [];
            for (var p in obj) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
            return str.join("&");
        }

        $httpProvider.defaults.headers.post = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        $stateProvider
            .state("/topics", {                                                             
                url: "/topics",
                controller: 'TopicsCtrl'
            })
        //去掉#号  
        
    })
    .run(run);
run.$inject = ['$rootScope', '$state', '$location', 'localStorageService']
function run($rootScope, $state, $location, localStorageService, PublicResource) {
    

}
