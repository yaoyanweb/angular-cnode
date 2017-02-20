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
