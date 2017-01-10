angular.module('todoro')
  .factory('dataservice', ['$rootScope', function($rootScope){
     var self = this;
     self.todoroLength = 1;
     self.todoroShortBreakLength = 1;
     self.isTimerRunning = false;
     self.currentTask;

     self.todos = [
       {
         id:Math.floor(Math.random()*100) + 1,
         todo:'Add settings view',
         estimation:'1',
         todoCompleted: true,
         currentTask:false
       },
       {
         id:Math.floor(Math.random()*100) + 1,
         todo:'Add Ticker sound when the interval is running, also an option to play pause',
         estimation:'1',
         todoCompleted: true,
         currentTask:false
       },
       {
         id:Math.floor(Math.random()*100) + 1,
         todo:'when timer stops ask user whether the current task is completed',
         estimation:'1',
         todoCompleted: true,
         currentTask:false
       },
       {
         id:Math.floor(Math.random()*100) + 1,
         todo:'implement localstorage to presist tasks',
         estimation:'1',
         todoCompleted: false,
         currentTask:false
       }
     ];

     return {
       todos: self.todos,
       todoroLength: self.todoroLength,
       todoroShortBreakLength: self.todoroShortBreakLength,
       isTimerRunning: self.isTimerRunning
     }
  }])
