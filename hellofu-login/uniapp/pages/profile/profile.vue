<template>
  <div class="profile">
    <h1>Welcome to the Profile Page!</h1>
    <p>{{ user }}</p>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
export default { 
  name: 'ProfilePage',
  data () { 
    return {
      user: {}
    }
  },
  created () {
	console.log("profile on create")
    this.fetchUserData()
  },
  methods: {
    fetchUserData () {
      // 使用uni.request发送HTTP请求，获取用户数据
      // 如果请求成功，将用户数据保存到本地存储中，并显示在页面上
      const token = uni.getStorageSync('access_token')
      if (!token) {
        uni.navigateTo({
          url: '/pages/login/login'
        })
        return
      }
      uni.request({
        url: 'http://localhost:5000/api/me',
        method: 'GET',
        header: {
          Authorization: `Bearer ${token}`
        },
        success: (res) => {
          this.user = res.data
          uni.setStorageSync('user', res.data)
        },
        fail: (res) => {
          console.log(res)
        }
      })
    },
    logout () {
      // 删除本地存储中的访问令牌，然后跳转到HomePage页面
      uni.removeStorageSync('access_token')
      uni.removeStorageSync('user')
      uni.navigateTo({
        url: '/pages/HomePage.vue'
      })
    }
  }
}
</script>
