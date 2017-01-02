'use strict';
// Declare app level module which depends on views, and components
angular.module('todoro', ['ui.router', 'todoro.timer','todoro.todos'])
  .config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('home',{
        url:'/',
        views:{
          header:{
            templateUrl:'templates/header.tpl.html'
          },
          timerWrapper: {
            templateUrl:'components/timer/timer.tpl.html',
            controller: 'timerCtrl'
          },
          todos:{
            templateUrl:'components/todos/todos.tpl.html',
            controller:'todosCtrl'
          },
          todoinfo:{
            template:'<h4>Todo Info</h4>'
          },
          completedtodos:{
            template:'<h4>Completed Todo List</h4>'
          }
        }
      })
      .state('home.settings',{
        url:'settings',
        views:{
          'settings@':{
            template: 'settings'
          }
        }
      })
      .state('home.reports',{
        url:'reports',
        views:{
          'reports@':{
            template:'reports'
          }
        }
      })
    $urlRouterProvider.otherwise('/');
  }]);
