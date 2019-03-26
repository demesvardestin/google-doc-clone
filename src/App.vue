<template>
  <div v-if="loggedIn" id="doc">
    <!-- NAVBAR -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">G-Doc Clone</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <ul class="navbar-nav">
          <li class="nav-item">
            <div class="btn-group">
              <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{ currentUser.displayName }}
              </button>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#" @click="logOut">Log Out</a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
    
    <!-- DOC PAGE -->
    <dashboard :userID="currentUser.uid" :displayName="currentUser.displayName" />
  </div>
  
  <div id="home" v-else>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">G-Doc Clone</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <ul class="navbar-nav">
          <li class="nav-item">
            <button class="btn btn-primary" @click="toggleAuthModal"
              v-if="logInModalHidden">
              Got an account? Log In
            </button>
            
            <button class="btn btn-primary" @click="toggleAuthModal"
              v-else>
              No account? Sign Up
            </button>
          </li>
        </ul>
      </div>
    </nav>
    
    <div class="container" id="home-body">
      <div class="row">
        <div class="col-md-4 offset-md-4">
          <div class="card box-shadow" id="signup-box" v-if="logInModalHidden">
            <div class="card-header">
              New Account
            </div>
            <div class="card-body">
              <form id="signup-form" v-on:submit.prevent="onSubmit" v-on:submit="signUp">
                <div class="field">
                  <label for="email">Email</label>
                  <input type="email" class="form-control" placeholder="email" id="email">
                </div>
                
                <div class="field">
                  <label for="display-name">Display Name</label>
                  <input type="text" class="form-control" placeholder="display name" id="display-name">
                </div>
                
                <div class="field">
                  <label for="password">Password</label>
                  <input type="password" class="form-control" placeholder="password" id="password">
                </div>
                
                <div class="action text-center">
                  <button class="btn btn-success btn-block">
                    create account
                  </button>
                  
                  <hr>
                  
                  <button class="btn btn-link" @click="toggleAuthModal">already have an account? log in</button>
                </div>
              </form>
            </div>
          </div>
          
          <div class="card box-shadow" id="login-box" v-else>
            <div class="card-header">
              Login
            </div>
            <div class="card-body">
              <form id="login-form" v-on:submit.prevent="onSubmit" v-on:submit="logIn">
                <div class="field">
                  <label for="email">Email</label>
                  <input type="email" class="form-control" placeholder="email" id="email">
                </div>
                
                <div class="field">
                  <label for="password">Password</label>
                  <input type="password" class="form-control" placeholder="password" id="password">
                </div>
                
                <div class="action text-center">
                  <button class="btn btn-success btn-block">
                    log in
                  </button>
                  
                  <hr>
                  
                  <button class="btn btn-link" @click="toggleAuthModal">no account? sign up</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import doc from './views/doc.vue'
  import dashboard from './views/dashboard.vue'
  
  export default {
    name: 'app',
    components: {
      dashboard
    },
    data() {
      return {
        loggedIn: false,
        logInModalHidden: true,
        currentUser: Object
      }
    },
    mounted: function () {
      let user = firebase.auth().currentUser;
      
      if (user) {
        this.loggedIn = true;
        this.currentUser = user;
      } else {
        this.loggedIn = false;
      }
    },
    methods: {
      // Retrieve Email
      email: function () {
        return document.querySelector('#email');
      },
      
      // Retrieve Email
      displayName: function () {
        return document.querySelector('#display-name');
      },
      
      // Retrieve Password
      password: function () {
        return document.querySelector('#password');
      },
      
      // Toggle Authentication Modal
      toggleAuthModal: function () {
        this.logInModalHidden = !this.logInModalHidden
      },
      
      // Check Auth State
      checkAuthState: function (arg=null) {
        let user = firebase.auth().currentUser;
        
        if (user) {
          if (arg) {
            user.updateProfile({
              displayName: arg
            }).then(function() {
              // console.log('Profile updated!')
            }).catch(function(error) {
              // alert('An error occured while updating your profile');
            });
          }
          
          this.loggedIn = true;
          this.currentUser = user;
        } else {
          this.loggedIn = false;
        }
      },
      
      // Create Account
      signUp: function () {
        let email = this.email().value;
        let displayName = this.displayName().value;
        let password = this.password().value;
        let vm = this;
        
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function (done) {
          // Display Alert
          vm.checkAuthState(displayName);
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          // Display Alert
        });
      },
      
      // Log into Existing Account
      logIn: function () {
        let email = this.email().value;
        let password = this.password().value;
        let vm = this;
        
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function (done) {
          // Display Alert
          vm.checkAuthState();
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          // Display Alert
        });
      },
      
      // Log Out
      logOut: function () {
        let vm = this;
        
        firebase.auth().signOut().then(function() {
          // Display Alert
          vm.checkAuthState();
        }).catch(function(error) {
          // Display Alert
        });
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  
  .box-shadow {
    box-shadow: 0 6px 15px 0 rgba(50,50,70,.08), 0 3px 5px 0 rgba(0,0,0,.05);
  }
  
  .document-focused {
    box-shadow: 0 6px 15px 0 rgba(50,50,70,.08), 0 3px 5px 0 rgba(0,0,0,.05);
  }
  
  .hide {
    display: none;
  }
  
  nav {
    height: 70px;
  }
  
  #home-body .row {
    padding-top: 20px;
    vertical-align: middle;
  }
  
  #home-body {
    height: calc(100vh - 70px);
    font-size: 16px !important;
  }
  
  .field {
    margin-bottom: 20px;
  }
  
  input, button {
    height: 50px !important;
    outline: none !important;
    box-shadow: none !important;
  }
</style>
