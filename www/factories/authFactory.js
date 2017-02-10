factoryModule.factory('AuthFactory', ($q, $http) => {
  return {
    createUser(email, pass) {
      return $q.resolve(firebase.auth().createUserWithEmailAndPassword(email, pass));
    },
    addUser(newUser) {
      $http.post('https://tool-trader.firebaseio.com/users.json', newUser)
    },
    login(email, pass) {
      return $q.resolve(firebase.auth().signInWithEmailAndPassword(email, pass).then((data) => {
        console.log(data.uid);
      }));
    },
    logout() {
      return $q.resolve(firebase.auth().signOut());
    },
    getUser() {
      return $q((resolve, reject) => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
          unsubscribe();
          if (user) {
            resolve(user.uid);
          } else {
            reject("Not logged in");
          }
        }); //end const unsubscribe
      }); //end return getUser
    } //end getUser
  };
}); //end AuthFactory
