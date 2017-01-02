angular.module('todoro.todos', [])
  .controller('todosCtrl',[
    '$scope',
    'dataservice',
    function($scope, dataservice){
      $scope.todos = dataservice.todos;
      $scope.addTodo = function(){
        var obj = {
          todo: $scope.todo,
          estimation: $scope.estimation,
          todoCompleted: false
        }
        dataservice.todos.push(obj);
        $scope.todo = '';
        $scope.estimation = '';
      }
  }])
