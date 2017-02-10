factoryModule.factory('AuthFactory', ($q) => {
  return {
    createUser(email, pass) {
      return $q.resolve(firebase.auth().createUserWithEmailAndPassword(email, pass));
    },
    login(email, pass) {
      console.log("auth", email);
      return $q.resolve(firebase.auth().signInWithEmailAndPassword(email, pass).then((data) => {
        console.log(data.uid);
        // return UID = data.uid;
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
            resolve(user);
          } else {
            reject("Not logged in");
          }
        }); //end const unsubscribe
      }); //end return getUser
    } //end getUser
  };
}); //end AuthFactory
