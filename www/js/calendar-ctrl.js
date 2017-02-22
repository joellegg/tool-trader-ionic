controllerModule.controller('CalendarCtrl', function($scope, $location, MessageFactory, AuthFactory, $q) {
  console.log('CalendarCtrl activated');

  $scope.calendar = {};

  $scope.changeMode = function(mode) {
    $scope.calendar.mode = mode;
    console.log($scope.calendar)
  };

  $scope.loadEvents = function() {
    $scope.calendar.eventSource = createRandomEvents();
  };

  $scope.onEventSelected = function(event) {
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
  };

  $scope.onViewTitleChanged = function(title) {
    $scope.viewTitle = title;
    console.log($scope.viewTitle)
  };

  $scope.today = function() {
    $scope.calendar.currentDate = new Date();
  };

  $scope.isToday = function() {
    var today = new Date();
    var currentCalendarDate = new Date($scope.calendar.currentDate);

    today.setHours(0, 0, 0, 0);
    currentCalendarDate.setHours(0, 0, 0, 0);
    return today.getTime() === currentCalendarDate.getTime();
  };

  $scope.onTimeSelected = function(selectedTime, events, disabled) {

  };

})
