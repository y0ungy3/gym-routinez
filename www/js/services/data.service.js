'use strict';

app.service('Data', function ($persist, C) {
  var data = {};
  var namespace = 'WorkoutApp';

  data.store = function (key, value) {
    return $persist.set(namespace, key, value)
  };

  data.fetch = function (key, fallback) {
    if (fallback == undefined) {
      fallback = null;
    }
    return $persist.get(namespace, key, fallback);
  };

  data.remove = function (key) {
    return $persist.remove(namespace, key)
  };

  data.clearAll = function clearAll() {
    data.remove(C.ROUTINES).then(function() {console.log("Removed routines");});
    data.remove(C.USERS).then(function() {console.log("Removed users");});
  };

  return data;
});
