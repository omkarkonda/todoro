angular.module('todoro.todoinfo', [])
  .controller('todoinfoCtrl', [
    '$scope',
    '$rootScope',
    'dataservice',
    function($scope, $rootScope, dataservice){
      $scope.todos = dataservice.todos;
      $scope.totalTasks = $scope.todos.length;
      $scope.completedTasks = $scope.todos.filter(function(task){
        if(task.todoCompleted === true){
          return true;
        }
      });

      $rootScope.$on('taskAdded', function(){
        $scope.todos = dataservice.todos;
        $scope.totalTasks = $scope.todos.length;
      })

      $rootScope.$on('taskCompleted', function(){
        $scope.todos = dataservice.todos;
        $scope.completedTasks = $scope.todos.filter(function(task){
          if(task.todoCompleted === true){
            return true;
          }
        })
      })

  }]);
