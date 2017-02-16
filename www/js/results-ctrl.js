controllerModule.controller('ResultsSearchCtrl', function($scope, $location, $ionicPopup, availableTools, AuthFactory, ToolsFactory) {
  $scope.availableTools = availableTools;

  let userKey = ToolsFactory.getUserKey();

  if ($scope.availableTools.length === 0) {
    alert('No tools match your search')
    $location.url('/search')
  }

  // Triggered on a button click, or some other target
  $scope.showPopup = function(toolKey, owner) {
    console.log(toolKey, owner);
    let clickedToolKey = toolKey;
    let toolOwner = owner;
    $scope.data = {};

    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      title: 'Please confirm',
      cssClass: "popup-vertical-buttons",
      scope: $scope,
      buttons: [{
        text: 'reserve',
        type: 'button-stable',
        onTap: function() {
          // console.log('toolkey', clickedToolKey);
          reserve(clickedToolKey);
        }
      }, {
        text: 'message owner',
        type: 'button-energized',
        onTap: function() {
          messageOwner();
        }
      }, {
        text: 'cancel',
        type: 'button-dark'
      }]
    });
  };

  function reserve (toolKey) {
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
