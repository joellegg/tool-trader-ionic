controllerModule.controller('AddToolCtrl', function($scope, $ionicModal, $cordovaCamera, $cordovaImagePicker, $cordovaFile, tools, user, ToolsFactory, AuthFactory) {
  $scope.tools = tools;
  $scope.currentUsersTools;
  let currentUser;

  AuthFactory.getUser()
    .then((res) => {
      // console.log('current user is', res)
      currentUser = res
    })
    .then(() => {
      // console.log('tools', tools);
      for (key in $scope.tools) {
        // console.log('tool key', key)
        // console.log('tool owner', $scope.tools[key].owner)
        if (currentUser === $scope.tools[key].owner) {
          // console.log('found match', currentUser, $scope.tools[key].owner)
          $scope.currentUsersTools = $scope.tools;
          // console.log('users tools', $scope.currentUsersTools)
        }
      }
    })

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
    var options = {
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
      .then(function(imageData) {
          // confirm we are getting image back
          alert('Image URI: ' + imageData);

          // read the image into an array buffer since firebase likes blobs so get one with the cordova file plugin
          let fileName = imageData.replace(/^.*[\\\/]/, '');
          // straight from cordova docs
          $cordovaFile.readAsArrayBuffer(cordova.file.tempDirectory, fileName)
            .then(function(success) {
              // success - get blob data
              let imageBlob = new Blob([success], { type: "image/jpeg" });
              $scope.imgURI = imageBlob;
              alert('imageBlob', imageBlob);

              saveToFirebase(imageBlob, fileName, function(_response) {
                if (_response) {
                  alert(_response.downloadURL)
                }
              })
            }, function(error) {
              // error
            });
        },
        function(error) {
          // error getting photos
        });
  };


  ////////////////////////////////////
  ////////  UPLOAD TO FIREBASE  //////
  ////////////////////////////////////

  // create root reference to firebase storage
  let storageRef = firebase.storage().ref();

  $scope.addTool = function() {
    // alert('you is gonna add a tool')
    console.log($scope, $scope.category)

    if (fileName === undefined) {
      return alert("Please upload or take an image of the tool.")
    };
    return new Promise(function() {
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
        imageResponse = toolImage;

        // when done pass back information on the saved image
        // _callback(uploadTask.snapshot)
      })
    }).then(() => {
      let newTool = {
        "category": $scope.category,
        "condition": $scope.condition,
        "price": $scope.price,
        "toolImage": imageResponse,
        "owner": currentUser,
        "tool": $scope.tool
      };
      alert('newTool', newTool)
        // ToolsFactory.newTool(newTool)
    });
  }



  /////////////////////////////////////
  /////////  MODALS  //////////////////
  /////////////////////////////////////
  $ionicModal.fromTemplateUrl('partials/add-tool-modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.showAddToolModal = () => {
    $scope.modal.show()
  };
  $scope.hideAddToolModal = () => {
    $scope.modal.hide()
  };
});
