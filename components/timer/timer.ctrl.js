angular.module('todoro.timer',[])
  .controller('timerCtrl',[
    '$scope',
    '$rootScope',
    'dataservice',
    '$interval',
    '$element',
    function($scope, $rootScope, dataservice, $interval, $element){

    //initialize all timer variables
    $scope.tdMins = ("00" + dataservice.todoroLength).slice(-2);
    $scope.tdSecs = '00';
    $scope.tdShortBreakMins = ("00" + dataservice.todoroShortBreakLength).slice(-2);
    $scope.tdShortBreakSecs = '00';
    $scope.timerCounter = 0;
    $scope.totalTimerCounter = 0;
    $scope.isTimerRunning = dataservice.isTimerRunning;
    $scope.tdCount = 0

    $rootScope.$on('taskSelected', function(){
      if(!$scope.isTimerRunning){
        $scope.currentTask = dataservice.currentTask;
        $scope.tdCount = $scope.currentTask.estimation;
      }
    });

    var todoroTimer, breakTimer;

    $scope.addZeros = function(time) {
      if(time < 10 ){
        time = ("00" + time).slice(-2)
      }
      return time
    }

    $scope.resetTimer = function(){
      $scope.tdMins = ("00" + dataservice.todoroLength).slice(-2);
      $scope.tdSecs = '00';
      $scope.tdShortBreakMins = ("00" + dataservice.todoroShortBreakLength).slice(-2);
      $scope.tdShortBreakSecs = '00';
    }

    //This function will run in $interval
    //have to make tick function DRY

    $scope.tick = function(){
        if($scope.tdSecs > 0 || $scope.tdMins > 0){
          if($scope.tdSecs == 0){
            $scope.tdMins--;
            $scope.tdSecs = 59;
          } else{
            $scope.tdSecs--;
          }

          $scope.tdMins = $scope.addZeros($scope.tdMins);
          $scope.tdSecs = $scope.addZeros($scope.tdSecs);

          if($scope.tdMins == 0 && $scope.tdSecs == 0){
            $scope.stopTicking(todoroTimer)
            // Break timer start
            $scope.startTodoroBreakTimer();
          }
        }
      }

    $scope.breakTicker = function(){
      if($scope.tdShortBreakSecs > 0 || $scope.tdShortBreakMins > 0){
        if($scope.tdShortBreakSecs == 0){
          $scope.tdShortBreakMins--;
          $scope.tdShortBreakSecs = 59;
        }else{
          $scope.tdShortBreakSecs--;
        }

        //prefix 0 if min or secs less than 10
        $scope.tdShortBreakMins = $scope.addZeros($scope.tdShortBreakMins);
        $scope.tdShortBreakSecs = $scope.addZeros($scope.tdShortBreakSecs);

        if($scope.tdShortBreakMins == 0 && $scope.tdShortBreakSecs == 0){
           $scope.stopTicking(breakTimer);
           // Reset Break time to default
           $scope.tdShortBreakMins = dataservice.todoroShortBreakLength;

           //increment timer counter
           $scope.timerCounter++;
           $scope.totalTimerCounter++;

           if($scope.timerCounter < $scope.tdCount){
             // Reset todoro time to default
             $scope.tdMins = dataservice.todoroLength;
             $scope.startTodoroTimer();
           }

           if($scope.tdCount - $scope.timerCounter  == 0){
             $scope.tdShortBreakMins = '00';
             dataservice.isTimerRunning = false;
             console.log('timer stopped');

             //re-initialize all timer variables
             $scope.timerCounter = 0;
             $scope.resetTimer()
           }
        }
      }
    }

    // Start timer button action
    $scope.startTodoroTimer = function(){
      if($scope.tdCount && $scope.currentTask){
        todoroTimer = $interval($scope.tick, 1000);
        dataservice.isTimerRunning = true;
      }
    }
    // Start break timer
    $scope.startTodoroBreakTimer = function(){
      breakTimer = $interval($scope.breakTicker, 1000);
    }

    // cancel interval
    $scope.stopTicking = function(t){
      $interval.cancel(t);
      t = undefined;
    }

    $scope.removeTask = function() {
      $scope.currentTask = null;
      $scope.resetTimer();
      $scope.stopTicking(todoroTimer);
      $scope.stopTicking(breakTimer);
      dataservice.isTimerRunning = false;
    }

    $scope.$watch(function(){return dataservice.isTimerRunning}, function(oldval, newval){
      if(oldval !== newval){
        $scope.isTimerRunning = dataservice.isTimerRunning
      }
    })

  }])
