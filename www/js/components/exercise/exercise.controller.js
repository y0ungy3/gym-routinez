app.controller('ExerciseCtrl', function($scope, ExerciseService, RoutineService, $log, $state, $stateParams, Popup) {
  $scope.myRoutine = RoutineService.get($stateParams.id);
  $scope.e = ExerciseService.Exercise();
  $scope.save = save;
  $scope.myExercise;
  $scope.goToList = goToList;
  $scope.toggleChange = toggleChange;
  $scope.timerInput = false;
  $scope.repsInput = false;
  $scope.restTimer = false;


  $scope.showRepsInput = showRepsInput;
  $scope.showTimerInput = showTimerInput;

  function showRepsInput() {
    $scope.repsInput = true;
    $scope.timerInput = false;
  }

  function showTimerInput() {
    $scope.repsInput = false;
    $scope.timerInput = true;
  }

  function toggleChange() {
    if ($scope.restTimer == false){
      $scope.restTimer = true;
    } else {
      $scope.restTimer = false;
    }
  }

  function save() {
    if($scope.e.sets > 25) {
      Popup('Oops', 'Too many sets, you can only have 25 sets sorry.');
    } else if($scope.e.reps > 9999) {
      Popup('Oops', 'Too many reps, please enter a real amount.');
    } else if($scope.restTimer == true && ($scope.e.restTime == null || $scope.e.restTime == "")){
        Popup('Oops', 'You forgot to enter the rest time');
    } else if($scope.e.timer > 999){
      Popup('Oops', '999 is the longest timer. You can use the watch timer instead!');
    }
    else {
      //make sure only 1 input is taken
      //if user checked the reps, then set timer input to null
      if($scope.repsInput == true){
        $scope.e.timer = null;
      }
      //else if user checked time, then set reps input to null
      else if($scope.timerInput == true){
        $scope.e.reps = null;
      }
      //if toggle is off but something was enter, then there should be no rest time
      if($scope.restTimer == false && $scope.e.restTime != null) {
        $scope.e.restTime = null;
      }
      RoutineService.addExercise($scope.e, $scope.myRoutine);
      $scope.e = ExerciseService.Exercise();
      Popup('Added!', '');
      goToList();
    }
  }

  //go to the page with all the exercises listed for a routine
  function goToList(){
    $state.go('routine-detail', {id: $stateParams.id});
    $scope.message = "";
  }
})


app.controller('ViewExerciseCtrl', function($scope, SettingsService, ExerciseService, RoutineService, $log, $state, $stateParams, $timeout, Popup) {
  //index is the index of the exercises array
  //id is the unique id of a routine
  $scope.color = SettingsService.getColor();

  $scope.myExercise = getExercise($stateParams.index, $stateParams.id);
  $scope.finish = finish;
  $scope.displaySets = $scope.myExercise.sets;
  $scope.getSets = getSets;
  $scope.updateSets = updateSets;
  $scope.setList = [];
  $scope.restCounter;
  $scope.counter = $scope.myExercise.timer;
  $scope.startTimer = startTimer;
  $scope.timeUpAlert = timeUpAlert;
  $scope.showSets = true;
  $scope.showRest = false;

  $scope.$on('$ionicView.enter', function(){
    $scope.color = SettingsService.getColor();
  });

  var mytimeout;
  var restTimeout;

  $scope.$on('$ionicView.enter', function(){
    if($scope.myExercise.timer != null) {
      $scope.disableStart = false;
      $scope.counter = $scope.myExercise.timer;
      $scope.displaySets = $scope.myExercise.sets;
    }
  });

  function getExercise(index, routineID) {
    var routine = RoutineService.get(routineID);
    var exercises = routine.exercises;
    var myExercise = exercises[index];
    return myExercise;
  }

  function finish() {
    var id =  $stateParams.id;
    $scope.showRest = false;
    $scope.showSets = true;
    $scope.a = false;

    $state.go('routine-detail', {id: id});
    $timeout.cancel(mytimeout);
    $timeout.cancel(restTimeout);
  }

  function getSets() {
    $scope.setList = new Array($scope.myExercise.sets);
    return $scope.setList;
  }

  function updateSets(isChecked)
  {
    //check
    if(isChecked){
      $timeout.cancel(mytimeout);
      $scope.displaySets = $scope.displaySets - 1;
      if($scope.myExercise.restTime != 0 && $scope.myExercise.restTime != null ) {
        $scope.showSets = false;
        $scope.showRest = true;
        restTimer();
      }
    }
    else{ //uncheck
      if($scope.displaySets < $scope.myExercise.sets) {
        $scope.displaySets = $scope.displaySets + 1;
        $scope.showSets = true;
        $scope.showRest = false;
      }
    }
  }

  function restTimer() {
    $timeout.cancel(restTimeout);
    $scope.restCounter = $scope.myExercise.restTime;
    var onTimeout = function(){
      if ($scope.restCounter > 1) {
        $scope.restCounter--;
        restTimeout = $timeout(onTimeout,1000);
      }
      else {
        $scope.showRest = false;
        $scope.showSets = true;
      }
    }
     restTimeout = $timeout(onTimeout,1000);
  }


  function startTimer(){

    $scope.showRest = false;
    $scope.showSets = true;
    $timeout.cancel(restTimeout);
    $timeout.cancel(mytimeout);

    //disable the start button
    $scope.disableStart = true;
    var onTimeout = function(){
      if ($scope.counter > 1) {
        $scope.counter--;
        mytimeout = $timeout(onTimeout,1000);
      }
      else {
        $scope.displaySets--;
        if($scope.displaySets > 0){
          timeUpAlert(true);
          //reset the timer to original
          $scope.counter = $scope.myExercise.timer;

          if($scope.myExercise.restTime != null) {
            $scope.showRest = true;
            $scope.showSets = false;
            restTimer();
          }
        }
        else{
          timeUpAlert(false); //finished all sets
        }
      }
    }
     mytimeout = $timeout(onTimeout,1000);
  }

  function timeUpAlert(val) {
    if (val) {
      $scope.disableStart = false;
    }else{
      $scope.counter = 0;
    }
  }

})


app.controller('EditExerciseCtrl', function($ionicHistory, $scope, ExerciseService, RoutineService, $state, $stateParams, Popup) {
  var routine = RoutineService.get($stateParams.id);
  var exercises = routine.exercises;
  $scope.e = angular.copy(exercises[$stateParams.index]);
  $scope.update = update;
  $scope.cancel = cancel;
  $scope.restTimer = false;
  $scope.toggleChange = toggleChange;
  $scope.timerInput = false;
  $scope.repsInput = false;
  $scope.showRepsInput = showRepsInput;
  $scope.showTimerInput = showTimerInput;
  init();

  //turn the toggle to on if these inputs are available
  function init() {
    if ($scope.e.restTime != null) {
      $scope.restTimer = true;
    }
    if($scope.e.reps != null){
      $scope.repsInput = true;
    }
    else if($scope.e.timer != null){
      $scope.timerInput = true;
    }
  }
  function toggleChange() {
    if ($scope.restTimer == false){
      $scope.restTimer = true;
    } else {
      $scope.restTimer = false;
    }
  }

  function update(alternate) {

    if($scope.e.sets > 25) {
      Popup('Oops', 'Too many sets, you can only have 25 sets sorry.');
    } else if($scope.e.reps > 100) {
      Popup('Oops', 'Too many reps, please enter a real amount.');
    }else if($scope.restTimer == true && ($scope.e.restTime == null || $scope.e.restTime == "")){
      Popup('Oops', 'You forgot to enter the rest time');
    }else if($scope.e.timer > 999) {
      Popup('Oops', '999 is the longest timer. You can use the watch timer instead!');
    }
    else {
      //make sure only 1 input is taken
      //if user checked the reps, then set timer input to null
      if($scope.repsInput == true){
        $scope.e.timer = null;
      }
      //else if user checked time, then set reps input to null
      else if($scope.timerInput == true){
        $scope.e.reps = null;
      }
      if($scope.restTimer == false && $scope.e.restTime != null) {
        $scope.e.restTime = null;
      }
      RoutineService.addExercise($scope.e, routine);
      Popup('Updated!', '');

      $ionicHistory.clearCache();

      if(alternate == true){
        //console.log('going back to altenate list');
        $state.go('alternate-routine-detail', {id: $stateParams.id});
      }else {
        //console.log('going to normal list');
        $state.go('routine-detail', {id: $stateParams.id});
      }
    }
  }

  function showRepsInput() {
    $scope.repsInput = true;
    $scope.timerInput = false;
  }

  function showTimerInput() {
    $scope.repsInput = false;
    $scope.timerInput = true;
  }

  function cancel()
  {
    $state.go('routine-detail', {id: $stateParams.id});
  }
})



app.controller('AddAlternateExerciseCtrl', function($scope, Popup, ExerciseService, RoutineService, $log, $state, $stateParams) {
  $scope.myRoutine = RoutineService.get($stateParams.id);
  $scope.e = ExerciseService.Exercise();
  $scope.save = save;
  $scope.myExercise;
  $scope.goToList = goToList;
  $scope.toggleChange = toggleChange;
  $scope.timerInput = false;
  $scope.repsInput = false;
  $scope.restTimer = false;

  $scope.showRepsInput = showRepsInput;
  $scope.showTimerInput = showTimerInput;

  function showRepsInput() {
    $scope.repsInput = true;
    $scope.timerInput = false;
  }

  function showTimerInput() {
    $scope.repsInput = false;
    $scope.timerInput = true;
  }

  function toggleChange() {
    if ($scope.restTimer == false){
      $scope.restTimer = true;
    } else {
      $scope.restTimer = false;
    }
  }

  function save() {
    if ($scope.restTimer == true && ($scope.e.restTime == null || $scope.e.restTime == "")) {
      console.log('No rest time entered');
      Popup('Oops', 'You forgot to enter the rest time');
    }
    else {
      //make sure only 1 input is taken
      //if user checked the reps, then set timer input to null
      if ($scope.repsInput == true) {
        $scope.e.timer = null;
      }
      //else if user checked time, then set reps input to null
      else if ($scope.timerInput == true) {
        $scope.e.reps = null;
      }
      //if toggle is off but something was enter, then there should be no rest time
      if ($scope.restTimer == false && $scope.e.restTime != null) {
        $scope.e.restTime = null;
      }
      RoutineService.addExercise($scope.e, $scope.myRoutine);
      $scope.e = ExerciseService.Exercise();
      Popup('Added!', '');
      goToList();
    }
  }

  //go to the page with all the exercises listed for a routine
  function goToList(){
    $state.go('alternate-routine-detail', {id: $stateParams.id});
    $scope.message = "";
  }

})
