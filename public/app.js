(function(){
"use strict"
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

})();
(function(){
"use strict"
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

})();
(function(){
"use strict"
angular.module('index_area').controller('TopicsdetailCtrl', TopicsdetailCtrl);
TopicsdetailCtrl.$inject = ['$state', '$scope','TopicsResource','$stateParams'];
function TopicsdetailCtrl($state, $scope,TopicsResource,$stateParams) {
    $scope.id = $stateParams.id;
    $scope.data = new Object();
    get($scope.id)

    //根据id获取文章内容
    function get(id){
        TopicsResource.get(id).then(function(res){
            $scope.data = res;
            console.log(res)
        })
    }
}
})();
(function(){
"use strict"
angular.module('index_area').controller('TopicslistCtrl', TopicslistCtrl);
TopicslistCtrl.$inject = ['$state', '$scope','TopicsResource'];
function TopicslistCtrl($state, $scope,TopicsResource) {
    $scope.name='cw';
    $scope.params = new Object();
    $scope.params.pape=0;
    $scope.params.tab = 'job';
    $scope.params.limit=10;
    $scope.tablist=[
        {name:'问答',type:'ask'},
        {name:'分享',type:'share'},
        {name:'招聘',type:'job'},
        {name:'精华',type:'good'},
    ]

    $scope.Tablist = function(type){
        $scope.params.tab = type;
        list($scope.params);
    }

    $scope.Change_Limit = function(type){
        $scope.params.limit = type;
        list($scope.params);
    }

    $scope.TopicDetail = function(id){
        get(id);
    }

    list($scope.params)
    function list(obj){
        if(typeof obj!=='object'){
            return false;
        }
        TopicsResource.list(obj).then(function(res){
            $scope.Data = res;
            console.log($scope.Data)    
        })
    }

    function get(id){
        TopicsResource.get(id).then(function(res){
            console.log(res);
        })
    }
}

})();
(function(){
"use strict"
/**
 * 提供功能API封装
 */
angular.module('index_area').factory('TopicsResource', TopicsResource);
TopicsResource.$inject = ['$http','$resource'];
function TopicsResource($http,$resource) {
    return {
        list: list,
        get:get
    };


    /**
     * list
     * 获取订单列表
     */
    function list(obj) {
        return $resource('https://cnodejs.org/api/v1/topics').get({
            pape:obj.page,
            tab:obj.tab,
            limit:obj.limit,
            mdrender :false
        }).$promise.then(function(data){
            return data.data;
        })
    }

    function get(id){
        return $resource("https://cnodejs.org/api/v1/topic/"+id).get({
            mdrender:true
        })
        .$promise.then(function(data){
            return data.data;
        })
    }
}
})();