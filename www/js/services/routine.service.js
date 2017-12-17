//contains all the routines
app.service('RoutineService', function ($log, GUID, C, Data) {
  var service = {};
  var routines = [];

  init();

  function init() {
    console.log("Fetching routines");
    Data.fetch(C.ROUTINES, []).then(function (val) {
      routines = val;
    })
  }

  service.get = function (id) {
    // find routine r by using id
    for (var i = 0; i < routines.length; i++) {
      if (routines[i].id === id) {
        var r = routines[i];
        return r;
      }
    }
  }

  service.saveRoutine = function (routine) {
    var index = indexOf(routine, routines);
    //if not exist yet, then push
    if (index === -1) {
      routines.push(routine);
    } else {
      routines[index] = routine;
    }
    Data.store(C.ROUTINES, routines).then(function() {
      $log.info("Save of routines completed");
    })
    $log.info("About to save routines");
  }


  service.getAllRoutines = function () {
    console.log("Returning the array of routines");
    return routines;
  }

  service.addExercise = function (object, array) {
    var index = indexOf(object, array.exercises);
    if(index === -1){
      array.exercises.push(object);
    }
    else{
      array.exercises[index] = object;
    }
    service.saveRoutine;
  }

  service.Routine = function (name, desc, exercises) {
    return {
      id: GUID(),
      name: (name != null ? name : ''),
      description: (desc != null ? desc : ''),
      exercises: (exercises != null ? exercises : []),
      alternate: false
    }
  }

  function indexOf(object, array) {
    var newID = object.id;
    for (var i = 0; i < array.length; i++) {
      //if already exist, returns the index
      if (newID == array[i].id)
        return i;
    }
    return -1;
  }

  return service;
})
