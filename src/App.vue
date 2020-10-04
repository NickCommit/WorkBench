<template>
  <div id="app">
    <div id="nav" :class="{nonactive: isActive}">
      <router-link to="/list">Goal List</router-link> |
      <router-link to="/agenda">Make goal</router-link> |
      <router-link to="/pomodoro">Pomodoro Timer</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: { ...mapGetters(['isActive']) }
}
</script>>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

body {
  height: 800px;
  width: 1280px;
  margin: 50px auto;
  background-image: url('assets/wood.jpg');
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: bisque;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: bisque;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
