app.service('SettingsService', function (C, Data) {
  var service = {};
  var color = {};
  init();

  function init() {
    console.log("fetching color");
    Data.fetch(C.SETTINGS, []).then(function (val) {
      if(val == null || val == ""){
        color = "Lime";
      }
      else
        color = val;
    })
  }

  service.saveColor = function (color) {
    Data.store(C.SETTINGS, color).then(init());
  }

  service.getColor = function () {
    return color;
  }

  return service;
})
