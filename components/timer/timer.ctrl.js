angular.module('todoro.timer',[])
  .controller('timerCtrl',[
    '$scope',
    'dataservice',
    '$interval',
    '$element',
    function($scope, dataservice, $interval, $element){

    //initialize all timer variables
    $scope.tdMins = ("00" + dataservice.todoroLength).slice(-2);
    $scope.tdSecs = '00';
    $scope.tdShortBreakMins = ("00" + dataservice.todoroShortBreakLength).slice(-2);
    $scope.tdShortBreakSecs = '00';
    $scope.timerCounter = 0;
    var todoroTimer, breakTimer;

    //Get Current Task fn
    $scope.getCurrentTask = function(){
      var tasks = dataservice.todos;
       var cTask = tasks.filter(function(t){
          if(t.currentTask && t.todoCompleted === false){
            return true
          }
      })
      return cTask
    }

    //Get Current Task
    $scope.currentTask = $scope.getCurrentTask();
    if(!$scope.currentTask.length <= 0){
      $scope.tdCount = $scope.currentTask[0].estimation;
    }else{
      $scope.currentTask.push({todo:'Task not selected', estimation:0})
    }

    //This function will run in $interval
    //have to make this function DRY

    $scope.tick = function(){
        if($scope.tdSecs > 0 || $scope.tdMins > 0){
          if($scope.tdSecs == 0){
            $scope.tdMins--;
            $scope.tdSecs = 59;
          }else{
            $scope.tdSecs--;
          }

          if($scope.tdMins < 10 ){
            $scope.tdMins = ("00" + $scope.tdMins).slice(-2)
          }

          if($scope.tdSecs < 10){
            $scope.tdSecs = ("00" + $scope.tdSecs).slice(-2)
          }

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
        if($scope.tdShortBreakMins < 10 ){
          $scope.tdShortBreakMins = ("00" + $scope.tdShortBreakMins).slice(-2)
        }

        if($scope.tdShortBreakSecs < 10){
          $scope.tdShortBreakSecs = ("00" + $scope.tdShortBreakSecs).slice(-2)
        }

        if($scope.tdShortBreakMins == 0 && $scope.tdShortBreakSecs == 0){
           $scope.stopTicking(breakTimer);
           console.log($scope.timerCounter);
           // Reset Break time to default
           $scope.tdShortBreakMins = dataservice.todoroShortBreakLength;

           //increment timer counter
           $scope.timerCounter++;

           if($scope.timerCounter < $scope.tdCount){
             // Reset todoro time to default
             $scope.tdMins = dataservice.todoroLength;
             $scope.startTodoroTimer();
           }
           if($scope.tdCount - $scope.timerCounter  == 0){
             $scope.tdShortBreakMins = '00';
             $scope.isTimerRunning = false;
             console.log('timer stopped');

             //re-initialize all timer variables
             $scope.timerCounter = 0;
             $scope.tdMins = ("00" + dataservice.todoroLength).slice(-2);
             $scope.tdShortBreakMins = ("00" + dataservice.todoroShortBreakLength).slice(-2);
           }
        }
      }
    }

    // Start timer button action
    $scope.startTodoroTimer = function(){
      if($scope.tdCount){
        todoroTimer = $interval($scope.tick, 1000);
        $scope.isTimerRunning = true;
      }else{
        alert('current task is not defined')
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
  }])
