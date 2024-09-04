<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import axios from 'axios'
const api = 'https://todolist-api.hexschool.io'
const myToken = ref()

// 登入
const signInField = ref({
  email: '',
  password: ''
})
const signIn = async () => {
  try {
    const res = await axios.post(`${api}/users/sign_in`, signInField.value)
    console.log(res)
    alert('登入成功')
    myToken.value = res.data.token
    document.cookie = `tokenName=${res.data.token}`
  } catch (error) {
    console.log(error)
    alert(error.response.data.message)
  }
}
</script>
<template>
  <div id="loginPage" class="bg-yellow">
    <div class="conatiner loginPage vhContainer">
      <div class="side">
        <a href="#"
          ><img
            class="logoImg"
            src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png"
            alt=""
        /></a>
        <img
          class="d-m-n"
          src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png"
          alt="workImg"
        />
      </div>
      <div>
        <form class="formControls" action="index.html">
          <h2 class="formControls_txt">最實用的線上代辦事項服務</h2>
          <label class="formControls_label" for="email">Email</label>
          <input
            v-model="signInField.email"
            class="formControls_input"
            type="text"
            name="email"
            placeholder="請輸入 email"
            required
          />
          <span>此欄位不可留空</span>
          <label class="formControls_label" for="password">密碼</label>
          <input
            v-model="signInField.password"
            class="formControls_input"
            type="password"
            name="password"
            placeholder="請輸入密碼"
            required
          />
          <input class="formControls_btnSubmit" type="button" @click="signIn" value="登入" />
          <RouterLink class="formControls_btnLink" to="/signup">註冊帳號</RouterLink>
        </form>
      </div>
    </div>
  </div>
</template>
