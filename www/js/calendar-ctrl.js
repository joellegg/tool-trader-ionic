controllerModule.controller('CalendarCtrl', function($scope, $location, MessageFactory, AuthFactory, ToolsFactory, $q) {
  'use strict';
  $scope.calendar = {};
  // $scope.events = [];
  $scope.calendar.eventSource = []


  // get reservations from users profile
  AuthFactory.getUserKey(AuthFactory.getUserId()).then((userKey) => {
    let userReservations = userRef.child(userKey + '/reservations');
    userReservations.on('child_added', (snapshot, prevChildKey) => {
      // get tool name
      ToolsFactory.getTool(snapshot.val().tool).then((tool) => {
        // console.log(tool.tool)
        $scope.calendar.eventSource.push({
          startTime: new Date(snapshot.val().pickup),
          endTime: new Date(snapshot.val().pickup),
          title: "Pickup " + tool.tool,
          allDay: true
        })
        $scope.calendar.eventSource.push({
            startTime: new Date(snapshot.val().dropoff),
            endTime: new Date(snapshot.val().dropoff),
            title: "Dropoff " + tool.tool,
            allDay: true
          })
          // console.log('scope events', $scope.calendar.eventSource);
        $scope.$broadcast('eventSourceChanged', $scope.calendar.eventSource)
        // $scope.$apply()
      })
    })
  })

  // get tool reservation and add to owners calendar
  // change the event names in each template
  // get tool name

  $scope.changeMode = function(mode) {
    $scope.calendar.mode = mode;
  };

  $scope.onEventSelected = function(event) {
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
  };

  $scope.onViewTitleChanged = function(title) {
    $scope.viewTitle = title;
  };

  $scope.today = function() {
    $scope.calendar.currentDate = new Date();
  };

  $scope.isToday = function() {
    var today = new Date(),
      currentCalendarDate = new Date($scope.calendar.currentDate);

    today.setHours(0, 0, 0, 0);
    currentCalendarDate.setHours(0, 0, 0, 0);
    return today.getTime() === currentCalendarDate.getTime();
  };

  $scope.onTimeSelected = function(selectedTime, events, disabled) {
    console.log('Selected time: ' + selectedTime + ', hasEvents: ' + (events !== undefined && events.length !== 0) + ', disabled: ' + disabled);
  };

})
