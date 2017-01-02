angular.module('todoro.todos', [])
  .controller('todosCtrl',[
    '$scope',
    'dataservice',
    function($scope, dataservice){
      $scope.todos = dataservice.todos;
      $scope.selectCurTask = dataservice.selectCurTask;
      $scope.addTodo = function(){
        var obj = {
          todo: $scope.todo,
          estimation: $scope.estimation,
          todoCompleted: false,
          currentTask:false
        }
        dataservice.todos.push(obj);
        $scope.todo = '';
        $scope.estimation = '';
      }
  }])
