app.controller('TimerCtrl', function($scope, $state, $timeout, $ionicHistory) {
  var myTime;
  $scope.counter = 0;
  $scope.finish = finish;


  $scope.$on('$ionicView.enter', function(){ //This is fired twice in a row
    timer();
  });

  function timer() {
    var onTimeout = function () {
      if($scope.counter < 356400) {
        $scope.counter++;
        myTime = $timeout(onTimeout, 1000);
      }
      else {
        $timeout.cancel(myTime);
      }
    }
    myTime = $timeout(onTimeout, 1000);
  }

  function finish() {
    $timeout.cancel(myTime);
    $scope.counter = 0;
    $ionicHistory.goBack();
  }
})


app.filter('secondsToDateTime', [function() {
  return function(seconds) {
    return new Date(1970, 0, 1).setSeconds(seconds);
  };
}])
