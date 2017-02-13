controllerModule.controller('AddToolCtrl', function($scope, $ionicModal, $cordovaCamera, $cordovaImagePicker, $cordovaFile, tools, user, ToolsFactory, AuthFactory, $q) {
  $scope.tools = tools;
  $scope.currentUsersTools = [];
  let currentUser;

  AuthFactory.getUser()
    .then((res) => {
      // console.log('current user is', res)
      currentUser = res
    })
    .then(() => {
      for (key in $scope.tools) {
        if (currentUser === $scope.tools[key].owner) {
          $scope.tools[key].toolKey = key;
          $scope.currentUsersTools.push($scope.tools[key]);
        }
      }
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
          alert(toolImage)
          resolve(imageResponse = toolImage)

          // when done pass back information on the saved image
          // _callback(uploadTask.snapshot)
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
        ToolsFactory.newTool(newTool)
      })
      .then(() => {
        $location.url('/home')
      })
      .catch(() => {
        alert('there must have been a problem')
      });
  }

  /////////////////////////////////////
  /////////  edit tool  ///////////////
  /////////////////////////////////////
  $scope.editTool = function(toolsKey) {
    console.log(toolsKey);
    $scope.modal2.show();

    let editingTool;
    // use the toolsKey to find which tool to edit
    for (key in $scope.tools) {
      if (toolsKey === key) {
        console.log('This is the tool you shall edit', toolsKey, key)
          // make sure current user matches the tool owner
        if (currentUser === $scope.tools[key].owner) {
          // get the tool specs and load to the page
          editingTool = $scope.tools[key];
          console.log('editingTool', editingTool)
        } else {
          alert('There seems to be an error. Is this your tool?')
        }
      }
    }
    // if user presses delete button the delete from firebase
    // patch the updates to firebase
    // switch back to home page
  };

  $scope.hideEditModal = function() {
    $scope.modal2.hide();
  };


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
});
