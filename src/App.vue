<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
    export default {
        name: 'App',
        computed: {
            isShow() {
                // if (this.$route.name !== 'notFind') {
                //     return true
                // }
            }
        }
    }
</script>

<style>
    html,
    body {
        height: 100%;
        /* overflow: hidden; */
        margin: 0;
        padding: 0;
    }
    
    #app {
        font-family: 'Microsoft YaHei', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        height: 100%;
    }
</style>