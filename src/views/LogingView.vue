<script setup>
import { ref , computed } from 'vue'
import { RouterLink , useRouter } from 'vue-router'
import axios from 'axios'
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
const api = 'https://todolist-api.hexschool.io'
const router = useRouter();
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
    myToken.value = res.data.token
    document.cookie = `tokenName=${res.data.token}`
    router.push({ name: 'todoList' });
  } catch (error) {
    console.log(error)
    toast.error(error.response.data.message, {
      "theme": "auto",
      "type": "default",
      "dangerouslyHTMLString": true
    })

  }
}
const isDisabled = computed(() => {
  return signInField.value.email === '' || signInField.value.password === '';
})

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
            autocomplete="email"
            required
          />
          <label class="formControls_label" for="password">密碼</label>
          <input
            v-model="signInField.password"
            class="formControls_input"
            type="password"
            name="password"
            placeholder="請輸入密碼"
            autocomplete="current-password"
            required
          />
          <input 
          class="formControls_btnSubmit" 
          type="button" 
          @click="signIn" 
          value="登入" 
          :disabled="isDisabled"/>
          <RouterLink class="formControls_btnLink" to="/signup">註冊帳號</RouterLink>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.formControls .formControls_btnSubmit:disabled{
  opacity: .4;
  cursor: no-drop;
}
</style>