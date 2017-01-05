angular.module('todoro.todos', [])
  .controller('todosCtrl',[
    '$scope',
    '$rootScope',
    'dataservice',
    function($scope, $rootScope, dataservice){
      $scope.todos = dataservice.todos;
      //$scope.selectCurTask = dataservice.selectCurTask;
      $scope.resetCurrentTask = dataservice.resetCurrentTask;
      $scope.isTimerRunning = dataservice.isTimerRunning

      $scope.selectCurTask = function(t){
        $scope.todos = $scope.resetCurrentTask();
        t.currentTask = true;
        dataservice.currentTask = t;
        $rootScope.$emit('taskSelected');
      }

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
