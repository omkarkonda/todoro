'use strict';
// Declare app level module which depends on views, and components
angular.module('todoro', [
  'ui.router',
  'todoro.timer',
  'todoro.todos',
  'todoro.completedtodos',
  'todoro.todoinfo',
  'todoro.settings'
]).config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider){
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
            templateUrl:'components/todoinfo/todoinfo.tpl.html',
            controller:'todoinfoCtrl'
          },
          completedtodos:{
            templateUrl:'components/completedTodos/completedTodos.tpl.html',
            controller: 'completedTodosCtrl'
          }
        }
      })
      .state('home.settings',{
        url:'settings',
        views:{
          'settings@':{
            templateUrl: 'components/settings/settings.tpl.html',
            controller:'settingsCtrl'
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
