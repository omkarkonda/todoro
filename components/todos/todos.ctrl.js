angular.module('todoro.todos', [])
  .controller('todosCtrl',[
    '$scope',
    '$rootScope',
    'dataservice',
    function($scope, $rootScope, dataservice){
      $scope.todos = dataservice.todos;
      $scope.resetCurrentTask = dataservice.resetCurrentTask;

      $scope.resetCurrentTask = function(){
         var cTask = $scope.todos.map(function(td){
           td.currentTask = false;
           return td;
         });
        return cTask;
      }

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
          currentTask:false,
          id: Math.floor(Math.random()*100) + 1
        }
        dataservice.todos.push(obj);
        $scope.todo = '';
        $scope.estimation = '';
        $rootScope.$emit('taskAdded');
        console.log(dataservice.todos);
      }

      $rootScope.$on('taskAdded', function(){
        $scope.todos = dataservice.todos;
      })
  }])
