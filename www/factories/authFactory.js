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
    }, //end getUser
    // get user key straight from firebase
    getUserId() {
      return firebase.auth().currentUser.uid
    },
    getUserKey: (uid) => {
      return $http.get(`https://tool-trader.firebaseio.com/users.json?orderBy="uid"&equalTo="${uid}"`).then((res) => {
        res = res.data;
        let responseKey;
        for (key in res) {
          responseKey = key;
        }
        return responseKey;
      })
    },
    getUserReservations(uid) {
      return $http.get(`https://tool-trader.firebaseio.com/users.json?orderBy="uid"&equalTo="${uid}"`).then((res) => {
        let profile = res.data;
        let reservations = {};
        for (key in profile) {
          // console.log(profile[key].reservations);
          reservations = profile[key].reservations;
        }
        return reservations;
      })
    },
    getRecipientInfo(uid) {
      return $http.get(`https://tool-trader.firebaseio.com/users.json?orderBy="uid"&equalTo="${uid}"`).then((res) => {
        let profile = res.data;
        for (key in profile) {
          return profile[key];
        }
      })
    }
  };
}); //end AuthFactory
