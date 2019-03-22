<template>
  <div id="app" class="container">
    <a href="#/newpage">redirect</a>
    <!--<document />-->
    <!--<router-link to="/new">-->
  </div>
</template>

<script>
  import document from './components/document.vue'
  import navbar from './components/navbar.vue'
  
  export default {
    name: 'app',
    // components: {
    //   document
    // },
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
</style>
