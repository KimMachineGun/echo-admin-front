<template>
  <div id="app">
    <login v-if="!logined" @logined="(secret, paths) => {code = secret; logined = true; path = paths}"/>
    <admin-page v-else :path="path" :code="code"/>
  </div>
</template>

<script>
import Login from './components/Login'
import AdminPage from './components/AdminPage'

export default {
  name: 'app',
  components: {
    Login,
    AdminPage
  },
  data () {
    return {
      logined: false,
      code: '',
      path: {}
    } 
  }
}
</script>

<style lang="scss">
html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

* {
  margin: 0;
  padding: 0;
  border: 0;
  outline: none;
  box-sizing: border-box;
}

#app {
  width: 100%;
  height: 100%;
}

</style>
