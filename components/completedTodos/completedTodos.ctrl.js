angular.module('todoro.completedtodos',[])
  .controller('completedTodosCtrl', [
    '$scope',
    '$rootScope',
    'dataservice',
    function($scope, $rootScope, dataservice){
      $scope.todos = dataservice.todos;
      $rootScope.$on('taskCompleted', function(){
        $scope.todos = dataservice.todos;
      })
  }])
