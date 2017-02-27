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