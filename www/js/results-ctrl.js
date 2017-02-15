controllerModule.controller('ResultsSearchCtrl', function($scope, $location, availableTools, AuthFactory, ToolsFactory) {
  $scope.availableTools = availableTools;
  let userKey = ToolsFactory.getUserKey();

  if ($scope.availableTools.length === 0) {
    alert('No tools match your search')
    $location.url('/search')
  }

  $scope.reserve = (toolKey) => {
    let searchParams = ToolsFactory.getSearchParams();

    let reservation = {
      "pickup": searchParams.pickup,
      "dropoff": searchParams.dropoff
    };
    // post reservation dates to the tool
    ToolsFactory.toolAddReservation(toolKey, reservation);
    // post tool and dates to user profile
    let userRes = {
      "tool": toolKey,
      "pickup": searchParams.pickup,
      "dropoff": searchParams.dropoff
    }
    ToolsFactory.userNewReservation(userKey, userRes);
    $location.url('/tab/home')
  }
});
