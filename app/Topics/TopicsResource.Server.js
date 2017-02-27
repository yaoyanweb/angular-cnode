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