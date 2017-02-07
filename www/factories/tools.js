app.factory('toolsFactory', function($http) {
  return {
    getData: () => {
      return $http.get('https://mf-user-notes.firebaseio.com/.json');
    }
  }
})
