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
