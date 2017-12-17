app.controller('RoutineCtrl', function($scope, SettingsService, ExerciseService, RoutineService, $log, $state, Popup) {
  $scope.allRoutines = RoutineService.getAllRoutines();
  $scope.r = RoutineService.Routine();
  $scope.reorder = reorder;
  $scope.save = save;
  $scope.view = view;
  $scope.editRoutine = editRoutine;
  $scope.showReorderButton = showReorderButton;
  $scope.moveItem = moveItem;
  $scope.gotoAddRoutine = gotoAddRoutine;
  $scope.gotoSettings = gotoSettings;
  $scope.toggleChange = toggleChange;
  $scope.showTimer = showTimer;
  $scope.color = SettingsService.getColor();

  function showTimer() {
    $state.go('timer');
  }

  function toggleChange(val) {
    $scope.r.alternate = val;
  }

  function showReorderButton() {
    if($scope.allRoutines.length <= 1){
      return false;
    } else
      return true;
  }

  //$scope.$on('$ionicView.enter', function(){ //This is fired twice in a row
  //  $scope.color = SettingsService.getColor();
  //});

  function moveItem(routine, fromIndex, toIndex) {
    $scope.allRoutines.splice(fromIndex, 1);
    $scope.allRoutines.splice(toIndex, 0, routine);
  };

  function reorder(){
    $scope.showReorder = !$scope.showReorder;
  }

  function view(id, mode) {
    // display the routine-detail page with the right ID
    //create the page url with the id, which comes from when
    //user taps on the link item
    if(mode == true) {
      //console.log("alternate mode");
      $state.go('alternate-routine-detail', {id: id});
    }
    else {
      //console.log("normal routine");
      $state.go('routine-detail', {id: id});
    }
  }

  //when press the "add" button when adding a new routine
  function save() {
      //save routine into an array of routines
      RoutineService.saveRoutine($scope.r);

      //create a new routine for scope for the next routine
      $scope.r = RoutineService.Routine();

      //get the array of routines and put that into scope object
      $scope.allRoutines = RoutineService.getAllRoutines();
      Popup('Added!','Click on a routine to add exercises.');
      $state.go('routines');
  }

  function editRoutine(id){
    $state.go('edit-routine', {id: id});
  }

  function gotoAddRoutine() {
    $state.go('add-routine');
  }

  function gotoSettings() {
    $state.go('settings');
  }
})




app.controller('RoutineDetailCtrl', function($ionicHistory, $scope, SettingsService, ExerciseService, RoutineService, $log, $state, $stateParams) {

  $scope.r = RoutineService.get($stateParams.id); //routine ID
  $scope.addExercise = addExercise;
  $scope.viewExercise = viewExercise;
  $scope.editExercise = editExercise;
  $scope.showReorderButton = showReorderButton;
  $scope.moveItem = moveItem;
  $scope.reorder = reorder;
  $scope.color = SettingsService.getColor();
  $scope.showTimer = showTimer;
  $scope.clearCache = clearCache;

  function clearCache() {
    $ionicHistory.clearCache();
  }

  function addExercise(id, alternate) {
    if(alternate == false) {
      $state.go('add-exercise', {id: id}); //routine ID to add exercise to
    }
    else if(alternate == true){
      $state.go('add-alternate-exercise', {id: id});
    }
  }

  function viewExercise(index, id, timer) {
    if (timer == null) {
      $state.go('view-exercise', {index: index, id: id});
    } else {
      $state.go('timer-workout', {index: index, id: id});
    }
  }

  function showReorderButton() {
    if($scope.r.exercises.length <= 1){
      return false;
    } else
      return true;
  }

  function moveItem(exercise, fromIndex, toIndex) {
    $scope.r.exercises.splice(fromIndex, 1);
    $scope.r.exercises.splice(toIndex, 0, exercise);
  };

  function reorder(){
    $scope.showReorder = !$scope.showReorder;
  }

  function editExercise(index, id, alternate)
  {
    if(alternate){
      $state.go('edit-alternate-exercise', {index: index, id: id});
    }else {
      $state.go('edit-exercise', {index: index, id: id});
    }
  }

  function showTimer(){
    //console.log("show timer func is called");
    $state.go('timer');
  }

})

app.controller('RoutineEditCtrl', function($ionicHistory, $scope, RoutineService, $state, $stateParams, Popup) {
  $scope.r = angular.copy(RoutineService.get($stateParams.id));
  $scope.save = save;

  function save()
  {
    //save routine into an array of routines
    RoutineService.saveRoutine($scope.r);
    Popup('Updated', '');
    $ionicHistory.clearCache();
    $state.go('routines');
  }
})

