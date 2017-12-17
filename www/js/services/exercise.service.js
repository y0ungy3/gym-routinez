
app.service('ExerciseService', function(GUID) {
  var service = {};
  var exercises = [];

  service.Exercise = function(name, sets, reps, desc, weight, timer) {
    return {
      id: GUID(),
      name: (name != null ? name : ''),
      sets: (sets != null ? sets : null),
      reps: (reps != null ? reps : null),
      description: (desc != null ? desc : null),
      weight: (weight != null ? weight : null),
      timer: null,
      restTime: null
    }
  }

  return service;
})
