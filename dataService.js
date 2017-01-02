angular.module('todoro')
  .factory('dataservice', [function(){
     var self = this;
     self.todoroLength = 1;
     self.todoroShortBreakLength = 1;

     self.todos = [
       {
         todo:'First task to complete with in two todoros',
         estimation:'2',
         todoCompleted: false,
         currentTask:true
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
       todos: self.todos
     }
  }])
