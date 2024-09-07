<template>
  <div class="container-fluid">

    <h1>404</h1>
    <p>很抱歉，這個頁面不存在！</p>
    <router-link to="/" class="goHome">回首頁</router-link>
  </div>
</template>
<style scoped>
  .container-fluid{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    background-color: #ffd370;
  }
  h1{
    font-size: 120px;
    font-weight: bold;
  }
  p{
    font-size: 20px;
  }
  .goHome{
    color: #000;
    font-size: 30px;
    font-weight: bold;
  }
</style>