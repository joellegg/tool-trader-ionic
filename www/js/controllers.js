var controllerModule = angular.module('starter.controllers', [])

controllerModule.controller('AddToolCtrl', function($scope, $ionicModal, $cordovaCamera, ToolsFactory) {
  $scope.newTool = {};


  $ionicModal.fromTemplateUrl('partials/add-tool-modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  })

  $scope.showAddToolModal = () => {
    console.log('show modal')
    $scope.modal.show()
  };

  $scope.hideAddToolModal = () => {
    console.log('hide modal')
    $scope.modal.hide()
  };

  // console.log('Tool search controller');
  ToolsFactory.getTools()
    .then((res) => {
      $scope.tools = res;
    })

  let storageRef = firebase.storage().ref();

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
    $cordovaCamera.getPicture(options).then(function(imageData) {
      // get response from imageData
      // let File = $('#fileUpload').prop('files')[0]
      $scope.img = imageData;
      // ToolsFactory.addToolImage({ img: $scope.imgURI });
      // alert('Tool image added!')
    }, function(err) {
      alert('error', err)// An error occured. Show a message to the user
    });
  }

  // add image to firebase storage then add tool to firebase with image uid.
  $scope.addTool = function(res) {
    console.log(res);

    // storageRef.child($scope.img.name + userId).put($scope.img)
    //   .then(function(snapshot) {
    //     $http.patch(`https://reddit-steve.firebaseio.com/posts/${userId}.json`, { image: snapshot.downloadURL });
    //     console.log("downloadurl", snapshot.downloadURL)
    //   }).catch(console.error);
  };

});
