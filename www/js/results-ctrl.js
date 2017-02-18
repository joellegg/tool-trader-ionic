controllerModule.controller('ResultsSearchCtrl', function($scope, $location, $ionicPopup, $q, availableTools, AuthFactory, ToolsFactory, MessageFactory) {
  $scope.availableTools = availableTools;
  let userUID = AuthFactory.getUserId();

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
          messageOwner(toolOwner, toolKey);
        }
      }, {
        text: 'cancel',
        type: 'button-dark'
      }]
    });
  };

  function reserve(toolKey) {
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

    AuthFactory.getUserKey(userUID).then((key) => {
      ToolsFactory.userNewReservation(key, userRes).then(() => {
        $location.url('/tab/home')
      });
    })
  };

  function messageOwner(toolOwner, toolKey) {
    // variables
    let subject = {};
    let timeStamp = new Date();
    let groupID = "";


    // get tool name as the subject
    ToolsFactory.getToolName(toolKey)
      .then((res) => {
        subject = res;
      }).then(() => {
        // console.log("new message subject", subject)
        let newGroup = {
          "subject": subject,
          "toolKey": toolKey,
          "timeStamp": timeStamp
        };
        MessageFactory.makeNewGroup(newGroup).then((res) => {
          groupID = res.data.name;
        }).then(() => {
          let userMember = {
            "member": userUID
          };
          let ownerMember = {
            "member": toolOwner
          };
          MessageFactory.addUserToGroup(groupID, userMember);
          MessageFactory.addUserToGroup(groupID, ownerMember);
        })
      })
    // switch to message view and pass in variables
  }
});
