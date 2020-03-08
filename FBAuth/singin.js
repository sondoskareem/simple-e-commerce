

    //  app.signIn = function(phone , code) {

    //       // Sign in user
    //       firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    //       .then(function (confirmationResult) {
    //         // SMS sent. Prompt user to type the code from the message, then sign the
    //         // user in with confirmationResult.confirm(code).
    //         window.confirmationResult = confirmationResult;
    //       }).catch(function (error) {
    //         // Error; SMS not sent
    //         // ...
    //       });
    //     };

    //     app.register = function() {
    //       var email = app.email;
    //       var password = app.password;

    //       if (!email || !password) {
    //         return console.log('email and password required');
    //       }

    //       // Register user
    //       firebase.auth().createUserWithEmailAndPassword(email, password)
    //         .catch(function(error) {
    //           console.log('register error', error);
    //           if (error.code === 'auth/email-already-in-use') {
    //             var credential = firebase.auth.EmailAuthProvider.credential(email, password);

    //             app.signInWithGoogle()
    //               .then(function() {
    //                 firebase.auth().currentUser.link(credential)
    //                   .then(function(user) {
    //                     console.log("Account linking success", user);
    //                   }, function(error) {
    //                     console.log("Account linking error", error);
    //                   });
    //               });
    //           }
    //         });

    //     };

    //     app.signInWithGoogle = function() {
    //       // Sign in with Google
    //       var provider = new firebase.auth.GoogleAuthProvider();
    //       provider.addScope('profile');
    //       provider.addScope('email');

    //       return firebase.auth().signInWithPopup(provider)
    //         .catch(function(error) {
    //           console.log('Google sign in error', error);
    //         });
    //     };

    //     app.signOut = function() {
    //       // Sign out
    //       firebase.auth().signOut();
    //     };

    //     // Listen to auth state changes
    //     firebase.auth().onAuthStateChanged(function(user) {
    //       app.user = user;
    //       console.log('user', user);
    //     });
