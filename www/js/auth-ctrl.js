controllerModule.controller('AuthCtrl', function($scope, $location, $cordovaCamera, $cordovaImagePicker, $cordovaFile, AuthFactory, $q) {

  $scope.login = () => {
    // console.log($scope, $scope.email, $scope.password);
    AuthFactory.login($scope.email, $scope.password)
      .then(() => {
        $location.url('/tab/home')
      });
  };


  /////////////////////////////////////////////
  //////  TAKE OR GET PROFILE PICTURES  ///////
  /////////////////////////////////////////////
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
        return alert("Please upload or take a picture for your profile.")
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
          let profilePic = uploadTask.snapshot.downloadURL;
          alert(profilePic)
          resolve(imageResponse = profilePic)
        })
      }
    })
  };

  $scope.register = () => {
    let newuid;

    console.log($scope, $scope.email, $scope.password, $scope.first, $scope.last, $scope.bio, $scope.dob)
    AuthFactory.createUser($scope.email, $scope.password)
      .then((response) => {
        newuid = response.uid;
        console.log(newuid)
      })
      .then(() => {
        return uploadImage();
      })
      .then(() => {
        let newUser = {
          "uid": newuid,
          "email": $scope.email,
          "firstName": $scope.first,
          "lastName": $scope.last,
          "bio": $scope.bio,
          "dob": $scope.dob,
          "profilePic": imageResponse
        };
        AuthFactory.addUser(newUser);
      })
      .then(() => {
        $location.url('/tab/home')
      })
      .catch(() => {
        alert("Sorry, there must have been a problem")
      })
  };

})
