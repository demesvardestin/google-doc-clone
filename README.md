## Google Doc Clone

I recently started picking up Vue, and decided to build this very watered down
version of Google Doc (or any realtime collaboration platform)
built with Vue 2.0 (CLI) and Firebase. The app consists of one component and
no router. It's essentially an SPA, with a couple of boolean switches to display
the approriate page. The app is currently **unfinished**.

## Stack

- Boostrap
- FontAwesome
- Vue/Vue-CLI
- Firebase Firestore
- Firebase Authentication

## Purpose

The idea is to mimic the realtime collaboration aspects of apps like Google Doc,
where one person's edit occur on another's screen in realtime. I know that the
actual technology behind Google Docs is far more complex than a simple
cloud-based 'watcher' function like Firebase's `onSnapshot()`. In addition, other
features include:

- Authentication
- Ability to create and access docs
- Ability to share docs with others
- Rich Text Editing


## Routing

I initially tried including routing with Vue's **vue-router**, but it doesn't seem
to work for some reason. So I instead opted for a boolean-based system (kinda like
React's `this.State()` and `this.setState()`). For example, I've implemented the
authentication that way:

```
// Update Authentication State
checkAuthState: function () {
    var user = firebase.auth().currentUser;
    
    if (user) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
},

// Log In
logIn: function () {
    let email = this.email().value;
    let password = this.password().value;
    let vm = this;
    
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function (done) {
      alert('You are logged in!');
      vm.checkAuthState();
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert('Error: ', errorCode, errorMessage)
    });
}
```

When the app loads, a variable is set to keep state of whether or not the user
is authenticated. It is initially set to false, and when the user logs in, it's
set to true. Then in the view:

```
<!-- If user is logged in -->
<div v-if="loggedIn" id="logged-in-home">
    <!-- NAVBAR -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">G-Doc Clone</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <ul class="navbar-nav">
          <li class="nav-item">
            <button class="btn btn-primary" @click="logOut">
              Log Out
            </button>
          </li>
        </ul>
      </div>
    </nav>
    
    <!-- DOC PAGE -->
    <doc />
</div>

<!-- If not -->
<div id="logged-out-home" v-else></div>
```

A fairly simple check, definitely not suitable for production-level/larger apps.
Routers would have been a better option.

## Helpful Links and Resources

- [Medium Blog Post](https://medium.com/javascript-in-plain-english/i-created-the-exact-same-app-in-react-and-vue-here-are-the-differences-e9a1ae8077fd)
- [Official Vue Page](https://vuejs.org/)