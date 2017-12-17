app.controller('SettingsCtrl', function($ionicHistory, $scope, $state, SettingsService) {

  $scope.save = save;
  $scope.color = SettingsService.getColor();
  $scope.getSelectVal = getSelectVal;

  function save() {
    SettingsService.saveColor($scope.color);
    $ionicHistory.clearCache();
    $state.go('routines');
  }

  function getSelectVal(color) {
    $scope.color = color;
  }
})
