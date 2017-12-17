angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    .state('add-exercise', {
      url: '/add-exercise/:id',
      templateUrl: 'js/components/exercise/addExerciseDetails.html',
      controller: 'ExerciseCtrl'
    })

    //adding exercises to a routine page
    .state('routine-detail', {
      url: '/routine/:id',
      templateUrl: 'js/components/routines/routineDetails.html',
      controller: 'RoutineDetailCtrl'
    })

    //list of all routines page
    .state('routines', {
      url: '/routines',
      templateUrl: 'js/components/routines/routineList.html',
      controller: 'RoutineCtrl'
    })

    //creating a routine page
    .state('add-routine', {
      url: '/add-routine',
      templateUrl: 'js/components/routines/addRoutine.html',
      controller: 'RoutineCtrl'
    })

    .state('edit-routine', {
      url: '/edit-routine/:id/:index',
      templateUrl: 'js/components/routines/editRoutine.html',
      controller: 'RoutineEditCtrl'
    })

    .state('view-exercise', {
      url: '/view-exercise/:id/:index',
      templateUrl: 'js/components/exercise/viewExercise.html',
      controller: 'ViewExerciseCtrl'
    })

    .state('edit-exercise', {
      url: '/edit-exercise/:id/:index',
      templateUrl: 'js/components/exercise/editExercise.html',
      controller: 'EditExerciseCtrl'
    })

    .state('edit-alternate-exercise', {
      url: '/edit-alternate-exercise/:id/:index',
      templateUrl: 'js/components/exercise/editAlternateExercise.html',
      controller: 'EditExerciseCtrl'
    })


    .state('timer-workout', {
      url: '/timer-workout/:id/:index',
      templateUrl: 'js/components/exercise/timerWorkout.html',
      controller: 'ViewExerciseCtrl'
    })

    .state('timer', {
      url: '/timer',
      templateUrl: 'js/components/timer/timer.html',
      controller: 'TimerCtrl'
    })

    .state('settings', {
      url: '/settings',
      templateUrl: 'js/components/settings/settings.html',
      controller: 'SettingsCtrl'
    })

    .state('alternate-routine-detail', {
      url: '/alternate-routine-detail/:id',
      templateUrl: 'js/components/routines/alternateRoutine.html',
      controller: 'RoutineDetailCtrl'
    })

    .state('add-alternate-exercise', {
      url: '/add-alternate-exercise/:id',
      templateUrl: 'js/components/exercise/addAlternateExercise.html',
      controller: 'AddAlternateExerciseCtrl'
    })

  ;

    // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/routines');

});
