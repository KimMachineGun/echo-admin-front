<template>
    <div id="login-wrapper">
      <div id="title">Echo Admin Page</div>
      <input type="password" id="code" placeholder="Admin Code" v-model="code" @keypress.enter="next">
      <div id="next-button" @click="next">Next</div>
    </div>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    next () {
      console.log(location.pathname)
      this.$http.post(location.pathname + '/auth', {code: this.code})
      .then((res) => {
        this.$emit('logined', this.code, res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },
  data () {
    return {
      code: ''
    }
  }
}
</script>

<style>
#login-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #BBDEFB;
}

#title {
  font-size: 70px;
  font-weight: bold;
  color: #2196F3;
  margin-bottom: 100px;
}

#code {
  width: 300px;
  height: 50px;
  font-size: 35px;
  border: 2px solid #2196F3;
  border-radius: 15px;
  text-indent: 15px;
}

#next-button {
  height: 45px;
  width: 250px;
  margin-top: 30px;
  border-radius: 15px;
  font-size: 30px;
  line-height: 45px;
  text-align: center;
  font-weight: bold;
  background-color: #2196F3;
  color: white;
  cursor: default;
}
</style>

