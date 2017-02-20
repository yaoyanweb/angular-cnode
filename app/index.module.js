angular
    .module("index_area", ["ui.router", 'LocalStorageModule','ngResource'])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        $urlRouterProvider.otherwise("/topics/topicslist");

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
            .state("/topics/topicslist", {                                                              //订单管理
                url: "/topics/topicslist",
                templateUrl: "Topics/topicslist.html",
                controller: 'TopicslistCtrl'
            })
            .state("/topics/index", {                                                              //订单管理
                url: "/topics/index/{name:json}",
                templateUrl: "Topics/index.html",
                params:{'name':null},
                controller: 'indexCtrl'
            })

              
        //去掉#号  
        /*$locationProvider.html5Mode(true);*/

    })
    .run(run);
run.$inject = ['$rootScope', '$state', '$location', 'localStorageService']
function run($rootScope, $state, $location, localStorageService, PublicResource) {
    

}
