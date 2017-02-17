controllerModule.controller('AddToolCtrl', function($scope, $ionicModal, $location, $cordovaCamera, $cordovaImagePicker, $cordovaFile, tools, user, ToolsFactory, AuthFactory, $q) {
  $scope.tools = tools;
  $scope.currentUsersTools = [];
  $scope.userRentals = [];
  let currentUser;

  //////////////////////////////////////////////////////////
  //////  get current users id and assign them their tools  ////
  //////////////////////////////////////////////////////////

  let uid = AuthFactory.getUserId();
  // assign user their tools
  ToolsFactory.getUsersTools(uid).then((res) => {
    console.log('response', res)
  });

  AuthFactory.getUser()
    .then((res) => {
      currentUser = res
    })
    // assign user their tools
    .then(() => {
      for (key in $scope.tools) {
        if (currentUser === $scope.tools[key].owner) {
          $scope.tools[key].toolKey = key;
          $scope.currentUsersTools.push($scope.tools[key]);
        }
      }
    })
    // get users reservations
    .then(() => {
      ToolsFactory.getUsers()
        .then((users) => {
          // loop through all users to find the current user's key
          for (key in users) {
            if (currentUser === users[key].uid) {
              // loop through each reservation to get the toolKey
              for (key1 in users[key].reservations) {
                // loop through each tool to get the toolKey
                for (key2 in $scope.tools) {
                  // if there is a match between the toolKeys then push the tool into an array
                  if (users[key].reservations[key1].tool === key2) {
                    $scope.userRentals.push($scope.tools[key2]);
                  }
                }
              }
            }
          }
          // console.log("users rentals", $scope.userRentals)
        })
    })
    // console.log('userTools', $scope.currentUsersTools)


  /////////////////////////////////////
  //////  TAKE OR GET PICTURES  ///////
  /////////////////////////////////////
  let fileName;
  let imageBlob;

  $scope.doGetPicture = function() {
    let options = {
      maximumImagesCount: 1,
      width: 200,
      height: 200,
      quality: 80
    };

    $cordovaImagePicker.getPictures(options)
      .then(function(results) {
          // read the image into an array buffer since firebase likes blobs so get one with the cordova file plugin
          fileName = results[0].replace(/^.*[\\\/]/, '');
          // straight from cordova docs
          $cordovaFile.readAsArrayBuffer(cordova.file.tempDirectory, fileName)
            .then(function(success) {
              // success - get blob data
              imageBlob = new Blob([success], { type: "image/jpeg" });
              alert('image successfully added')
            }, function(error) {
              // error
              alert('error uploading', error)
            });
        },
        function(error) {
          // error getting photos
          alert('error getting photo', error)
        });
  };

  $scope.takePicture = function() {
    let options = {
      quality: 100,
      destinationType: Camera.DestinationType.NATIVE_URI,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 100,
      targetHeight: 100,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };

    $cordovaCamera.getPicture(options)
      .then(function(results) {
          // read the image into an array buffer since firebase likes blobs so get one with the cordova file plugin
          fileName = results.replace(/^.*[\\\/]/, '');
          // straight from cordova docs
          $cordovaFile.readAsArrayBuffer(cordova.file.tempDirectory, fileName)
            .then(function(success) {
              // success - get blob data
              imageBlob = new Blob([success], { type: "image/jpeg" });
              alert('Image successfully added!');
            }, function(error) {
              // error
              alert('error taking photo', error)
            });
        },
        function(error) {
          // error getting photos
          alert('error getting photo', error)
        });
  };

  ////////////////////////////////////
  ////////  UPLOAD TO FIREBASE  //////
  ////////////////////////////////////

  // create root reference to firebase storage
  let storageRef = firebase.storage().ref();

  function uploadImage() {
    // console.log($scope)
    return $q(function(resolve, reject) {
      // if there is no image tell the user to add one
      if (fileName === undefined) {
        return alert("Please upload or take an image of the tool.")
      } else {
        let uploadTask = storageRef.child(fileName).put(imageBlob);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', function(snapshot) {
          // Observe state change events such as progress, pause, and resume
        }, function(error) {
          // Handle unsuccessful uploads
          alert(error.message)
          _callback(null)
        }, function() {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          let toolImage = uploadTask.snapshot.downloadURL;
          resolve(imageResponse = toolImage)
        })
      }
    })
  };

  $scope.addTool = function() {
    uploadImage()
      .then(() => {
        let newTool = {
          "category": $scope.modal1.category,
          "condition": $scope.modal1.condition,
          "price": $scope.modal1.price,
          "toolImage": imageResponse,
          "owner": currentUser,
          "tool": $scope.modal1.tool
        };
        $scope.currentUsersTools.push(newTool);
        ToolsFactory.newTool(newTool);
      })
      .then(() => {
        $scope.modal1.hide();
      })
      .catch(() => {
        alert('there must have been a problem')
      });
  }

  /////////////////////////////////////
  /////////  EDIT TOOL  ///////////////
  /////////////////////////////////////
  $scope.editingTool;

  // update the image on firebase if the user chooses to update the image
  function updateImage() {
    // console.log($scope)
    return $q(function(resolve, reject) {
      // if there is no image tell the user to add one
      if (fileName === undefined) {
        return alert("Please upload or take an image of the tool.")
      } else {
        let uploadTask = storageRef.child(fileName).put(imageBlob);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', function(snapshot) {
          // Observe state change events such as progress, pause, and resume
        }, function(error) {
          // Handle unsuccessful uploads
          alert(error.message)
          _callback(null)
        }, function() {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          let toolImage = uploadTask.snapshot.downloadURL;
          alert(toolImage)
          resolve(imageResponse = toolImage)

          // when done pass back information on the saved image
          // _callback(uploadTask.snapshot)
        })
      }
    })
  };

  // show the edit modal with the correct tool content
  $scope.editThisTool = function(toolsKey) {
    // console.log(toolsKey);
    $scope.modal2.show();

    // use the toolsKey to find which tool to edit
    for (let i = 0; i < $scope.currentUsersTools.length; i++) {
      if (toolsKey === $scope.currentUsersTools[i].toolKey) {
        // console.log('This is the tool you shall edit', toolsKey, $scope.currentUsersTools[i].toolKey)
        // make sure current user matches the tool owner
        if (currentUser === $scope.currentUsersTools[i].owner) {
          // get the tool specs and load to the page
          $scope.editingTool = $scope.currentUsersTools[i];
          // console.log('editingTool', $scope.editingTool);
        } else {
          alert('There seems to be an error. Is this your tool?');
        }
      }
    }
  };
  // patch the updates to firebase
  $scope.editTool = function(toolsKey) {
    console.log('push tool specs to firebase', toolsKey);
    console.log($scope.editingTool);
    ToolsFactory.updateTool(toolsKey, $scope.editingTool)
      // switch back to home page
      .then(() => {
        $scope.modal2.hide();
      });
  };
  // if user presses delete button then delete from firebase
  $scope.deleteTool = function(toolsKey) {
    // get index of the tool in current users tools array and remove it
    let pos = $scope.currentUsersTools.indexOf($scope.editingTool);
    $scope.currentUsersTools.splice(pos, 1);
    // remove the tool from firebase
    ToolsFactory.removeTool(toolsKey)
      // switch back to home page
      .then(() => {
        $scope.modal2.hide();
      });
  }


  /////////////////////////////////////
  /////////  MODALS  //////////////////
  /////////////////////////////////////
  $ionicModal.fromTemplateUrl('partials/add-tool-modal.html', {
    id: 1,
    scope: $scope
  }).then(function(modal) {
    $scope.modal1 = modal;
  });
  $ionicModal.fromTemplateUrl('partials/edit-tool-modal.html', {
    id: 2,
    scope: $scope
  }).then(function(modal) {
    $scope.modal2 = modal;
  });


  $scope.showAddToolModal = () => {
    $scope.modal1.show()
  };
  $scope.hideAddToolModal = () => {
    $scope.modal1.hide()
  };
  $scope.hideEditModal = function() {
    $scope.modal2.hide();
  };

});
