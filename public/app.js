(function(){
"use strict"
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

})();
(function(){
"use strict"
angular.module('index_area').controller('indexCtrl', indexCtrl);
indexCtrl.$inject = ['$state', '$scope','$stateParams'];
function indexCtrl($state, $scope,$stateParams) {
   $scope.name=$stateParams.name;

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
    $scope.content1 = 1212;
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
            $scope.Data = res.data.data;
            console.log(res.data.data,111);
        })
    }

    function get(id){
        TopicsResource.get(id).then(function(res){

        })
    }
    
    
}

})();
(function(){
"use strict"
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
    // function list(obj) {
    //     return $resource('https://cnodejs.org/api/v1/topics').get({
    //         pape:obj.page,
    //         tab:obj.tab,
    //         limit:obj.limit,
    //         mdrender :false
    //     }).$promise.then(function(data){
    //         return data.data;
    //     })
    // }
    function list(obj) {
      return  $http({
                    url:'https://cnodejs.org/api/v1/topics',
                    method:'GET',
                    params:{
                        pape:obj.page,
                        tab:obj.tab,
                        limit:obj.limit,
                        mdrender :false
                    }
                  }).success(function(data){

                    
                    return data.data;

              })

    }


    // function get(id){
    //     return $resource("https://cnodejs.org/api/v1/topic/"+id).get({
    //         mdrender:false
    //     })
    //     .$promise.then(function(data){
    //         return data.data;
    //     })
    // }
    function get(id){
    return  $http({
              url:'https://cnodejs.org/api/v1/topic/'+id,
              method:'GET',
              params:{mdrender:false}
            }).success(function(data){

              console.log(data.data.content,88888);
              return data.data;

            })
    }
}

})();