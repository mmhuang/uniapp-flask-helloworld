<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input type="text" v-model="username" placeholder="Username" />
      <input type="password" v-model="password" placeholder="Password" />
      <button type="submit" @click="login">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data () {
    return {
      username: 'john',
      password: 'password123'
    }
  },
  methods: {
    login () {
      // 使用uni.request发送HTTP请求，获取访问令牌
      // 如果请求成功，将访问令牌保存到本地存储中，并跳转到ProfilePage页面
	  console.log("login bt")
      uni.request({
        url: 'http://localhost:5000/api/auth',
        method: 'POST',
        data: {
          username: this.username,
          password: this.password
        },
        success: (res) => {
          uni.setStorageSync('access_token', res.data.access_token)
          uni.switchTab({
            url: '/pages/profile/profile'
          })
        },
        fail: (res) => {
          console.log(res)
        }
      })
    }
  }
}
</script>

<style>
</style>