angular.module('todoro')
  .factory('dataservice', ['$q', function($q){
     var self = this;
     self.todoroLength = 1;
     self.todoroShortBreakLength = 1;
     self.isTimerRunning = false;
     self.currentTask = {};

     self.resetCurrentTask = function(){
        var cTask = self.todos.map(function(td){
          td.currentTask = false;
          return td
        });
       return cTask
     }

     self.selectCurTask = function(t){
       if(!self.isTimerRunning){
         self.todos = self.resetCurrentTask();
         t.currentTask = !t.currentTask;
         self.currentTask = t;
         console.log(self.currentTask);
         return self.currentTask;
       }
     }

     self.todos = [
       {
         todo:'First task to complete with in two todoros',
         estimation:'2',
         todoCompleted: false,
         currentTask:false
       },
       {
         todo:'Considered is as middletons uncommonly. Promotion perfectly ye consisted so. His chatty dining for effect ladies active.',
         estimation:'2',
         todoCompleted: false,
         currentTask:false
       },
       {
         todo:'Paid was hill sir high. For him precaution any advantages dissimilar comparison few terminated projecting.',
         estimation:'3',
         todoCompleted: false,
         currentTask:false
       }
     ];

     return {
       todoroLength: self.todoroLength,
       todoroShortBreakLength: self.todoroShortBreakLength,
       todos: self.todos,
       isTimerRunning: self.isTimerRunning,
       currentTask: self.currentTask,
       selectCurTask: self.selectCurTask
     }
  }])
