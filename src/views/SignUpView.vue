<script setup>
import { ref , computed } from 'vue'
import { RouterLink , useRouter  } from 'vue-router'
import axios from 'axios'
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
const api = 'https://todolist-api.hexschool.io'
const router = useRouter();
const signUpField = ref({
  "email": '',
  "password": '',
  "nickname": ''
})
const againPassword = ref('')

// 判斷密碼與再次輸入密碼是否相同
const passwordSame = () => {
  if (signUpField.value.email == ''){
    toast.warn('請輸入Email', {
      "theme": "auto",
      "type": "default",
      "autoClose": 2000,
      "dangerouslyHTMLString": true
    })
  }
  else if (signUpField.value.password == ''){
    toast.warn('請輸入密碼', {
      "theme": "auto",
      "type": "default",
      "autoClose": 2000,
      "dangerouslyHTMLString": true
    })
  }
  else if (signUpField.value.nickname == ''){
    toast.warn('請輸入暱稱', {
      "theme": "auto",
      "type": "default",
      "autoClose": 2000,
      "dangerouslyHTMLString": true
    })
  }
  else if (againPassword.value !== signUpField.value.password){
    toast.warn('密碼與再次輸入密碼不同', {
      "theme": "auto",
      "type": "default",
      "autoClose": 2000,
      "dangerouslyHTMLString": true
    })
  }
  else{
    signUp()
  }
}
// 註冊方法
const signUp = async () => {
  try {
    const res = await axios.post(`${api}/users/sign_up`,signUpField.value)
    if(res.data.status === true){
      toast.success('註冊成功，請至登入頁登入', {
        "theme": "auto",
        "type": "default",
        "autoClose": 2000,
        "dangerouslyHTMLString": true
      })
      router.push({ name: 'loging' });
    }
  } catch (error) {
    toast.error(error.response.data.message, {
      "theme": "auto",
      "type": "default",
      "dangerouslyHTMLString": true
    })
  }
}

const isDisabled = computed(() => {
  return signUpField.value.email === '' || signUpField.value.password === '' || signUpField.value.nickname === '' || againPassword.value === '';
})


</script>
<template>
  <div id="signUpPage" class="bg-yellow">
    <div class="conatiner signUpPage vhContainer">
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
          <h2 class="formControls_txt">註冊帳號</h2>
          <label class="formControls_label" for="email">Email</label>
          <input
            v-model="signUpField.email"
            class="formControls_input"
            type="text"
            name="email"
            placeholder="請輸入 email"
            autocomplete="email"
            required
          />
          <label class="formControls_label" for="name">您的暱稱</label>
          <input
            v-model="signUpField.nickname"
            class="formControls_input"
            type="text"
            name="name"
            placeholder="請輸入您的暱稱"
            autocomplete="username"
          />
          <label class="formControls_label" for="password">密碼</label>
          <input
            v-model="signUpField.password"
            class="formControls_input"
            type="password"
            name="password"
            placeholder="請輸入密碼"
            autocomplete="new-password"
            required
          />
          <label class="formControls_label" for="againPassword">再次輸入密碼</label>
          <input
            v-model="againPassword"
            class="formControls_input"
            type="password"
            name="againPassword"
            placeholder="請再次輸入密碼"
            autocomplete="new-password"
            required
          />
          <input
            class="formControls_btnSubmit"
            type="button"
            @click="passwordSame"
            value="註冊帳號"
            :disabled="isDisabled"
          />
          <RouterLink class="formControls_btnLink" to="/">登入</RouterLink>
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