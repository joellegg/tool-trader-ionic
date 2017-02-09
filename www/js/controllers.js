var controllerModule = angular.module('starter.controllers', [])

controllerModule.controller('AddToolCtrl', function($scope, $ionicModal, $cordovaCamera, $cordovaImagePicker, $cordovaFile, ToolsFactory) {
  $scope.newTool = {};

  // console.log('Tool search controller');
  ToolsFactory.getTools()
    .then((res) => {
      $scope.tools = res;
    })

  /////////////////////////////////////
  //////  TAKE OR GET PICTURES  ///////
  /////////////////////////////////////
  $scope.doGetPicture = function() {
    let options = {
      maximumImagesCount: 1,
      width: 800,
      height: 800,
      quality: 80
    };

    $cordovaImagePicker.getPictures(options)
      .then(function(results) {
        debugger
          // console.log('Image URI: ' + results[0]);
          // confirm we are getting image back
          // alert(results[0])

          // read the image into an array buffer since firebase likes blobs so get one with the cordova file plugin
          let fileName = results[0].replace(/^.*[\\\/]/, '');
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

  // take picture of tool function and get data response
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

    // $cordovaCamera.getPicture(options)
    // .then(function(imageData) {
    //   image.src = imageData;
    // }, function(err) {
    //   // error
    // });
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

  /////////////////////////////////////
  /////////  MODALS  //////////////////
  /////////////////////////////////////
  $ionicModal.fromTemplateUrl('partials/add-tool-modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.showAddToolModal = () => {
    console.log('show modal')
    $scope.modal.show()
  };
  $scope.hideAddToolModal = () => {
    console.log('hide modal')
    $scope.modal.hide()
  };


  ////////////////////////////////////
  ////////  UPLOAD TO FIREBASE  //////
  ////////////////////////////////////
  // add image to firebase storage then add tool to firebase with image uid.
  $scope.addTool = function(res) {
    console.log($scope.newTool);
    console.log(res);
    storageRef.child($scope.imgURI.name + userId).put(File)
      .then(function(snapshot) {
        $http.patch(`https://reddit-steve.firebaseio.com/posts/${userId}.json`, { image: snapshot.downloadURL });
        console.log("downloadurl", snapshot.downloadURL)
      }).catch(console.error);
  };

  // straight from firebase docs
  // https://firebase.google.com/docs/storage/web/upload-files
  function saveToFirebase(_imageBlob, _filename, _callback) {
    // create root reference to firebase storage
    let storageRef = firebase.storage().ref();

    // pass in the _filename and save the _imageblob
    var uploadTask = storageRef.child('images/' + _filename).put(_imageBlob);

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
      var downloadURL = uploadTask.snapshot.downloadURL;

      // when done pass back information on the saved image
      _callback(uploadTask.snapshot)
    });
  }

});
