<script setup>
import { ref , onMounted , watchEffect } from 'vue';
import { useRouter } from 'vue-router'
import axios from 'axios'
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
const api = 'https://todolist-api.hexschool.io'
const router = useRouter();
const myToken = ref()
// 驗證
const user = ref({
  uid: '',
  nickname: ''
})
const checkout = async() => {
  try{
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)tokenName\s*=\s*([^;]*).*$)|^.*$/,
      "$1",
    );
    myToken.value = token
    const res = await axios.get(`${api}/users/checkout`,{
      headers: {
        Authorization:myToken.value
      }
    })
    user.value = res.data
    toast.success('登入成功', {
      "theme": "auto",
      "type": "default",
      "autoClose": 3000,
      "dangerouslyHTMLString": true
    })
  }catch(error){
    console.log(error);
  }

}
onMounted( () => {
  checkout()
  getAllTodos()
})

// 登出
const signOut = async () => {
  try {
    const res = await axios.post(`${api}/users/sign_out`,{},{
      headers: {
        Authorization:myToken.value
      }
    })
    console.log(res);
    toast.success(res.data.message, {
      "theme": "auto",
      "type": "default",
      "autoClose": 3000,
      "dangerouslyHTMLString": true
    })
    router.push({ name: 'loging' });
  } catch (error) {
    console.log(error);
    toast.error("登出失敗", {
      "theme": "auto",
      "type": "default",
      "dangerouslyHTMLString": true
    })
  }
}
// 全部待辦事項                               
const data = ref([]);
const noFinishData = ref([]);
const finishData = ref([]);
const active = ref(0)
// 取得待辦事項                               
const getAllTodos = async () => {
  try {
    const res = await axios.get(`${api}/todos`,{
      headers: {
        Authorization:myToken.value
      }
    })
    data.value = res.data.data
  } catch (error) {
    console.log(error);
  }
}
//新增待辦事項 
const todoText = ref({
  "content" : ''
});
const addTodo = async() => {
  try {
    if(todoText.value.content === ''){
      toast.warn('請輸入內容', {
        "theme": "auto",
        "type": "default",
        "autoClose": 2000,
        "dangerouslyHTMLString": true
      })
      return
    }
    else{
      const res = await axios.post(`${api}/todos`,todoText.value
      ,{
        headers: {
          Authorization:myToken.value
        }
      })
      console.log(res);
      getAllTodos();
      todoText.value = {
        "content" : ''
      }
      toast.success('新增完成', {
        "theme": "auto",
        "type": "default",
        "autoClose": 2000,
        "dangerouslyHTMLString": true
      })
    }
  } catch (error) {
    console.log(error);
  }
}
// 修改待辦事項  
const editTodoItem = ref({
  id:'',
  content:''
})
const cancelEditTodoItem = () => {
  editTodoItem.value = {
    id:'',
    content:''
  }
}
const upDateTodoItem = (id) => {
  const index = data.value.findIndex((item) => item.id === id)
  editTodoItem.value.id = id;
  editTodoItem.value.content = data.value[index].content
}
const editTodo = async() => {
  try {
    const res = await axios.put(`${api}/todos/${editTodoItem.value.id}`,{
      content : editTodoItem.value.content
    }
    ,{
      headers: {
        Authorization:myToken.value
      }
    })
    getAllTodos();
    cancelEditTodoItem();
    console.log(res);    
    toast.success('更新成功', {
      "theme": "auto",
      "type": "default",
      "autoClose": 2000,
      "dangerouslyHTMLString": true
    })
  } catch (error) {
    console.log(error);
  }
}
// 刪除待辦事項                               
const delTodo = async(id) => {
  try {
    const res = await axios.delete(`${api}/todos/${id}`,{
      headers: {
        Authorization:myToken.value
      }
    })
    console.log(res);
    getAllTodos()
    toast.success(res.data.message, {
      "theme": "auto",
      "type": "default",
      "autoClose": 2000,
      "dangerouslyHTMLString": true
    })
  } catch (error) {
    console.log(error);
    
  }
}
//完成待辦事項
const finishTodo = async(id,status) => {
  try {
    const res = await axios.patch(`${api}/todos/${id}/toggle`,{},{
      headers: {
        Authorization:myToken.value
      }
    })
    getAllTodos().then(() => {
    if (status === false) { // "待完成"
      noFinishData.value = data.value.filter((item) => item.status === false);
      data.value = noFinishData.value;
    } else if (status === true) { // "已完成"
      finishData.value = data.value.filter((item) => item.status === true);
      data.value = finishData.value;
    }else{
      data.value = res.data.data
    }
  });
    console.log(res);
    toast.success(res.data.message, {
      "theme": "auto",
      "type": "default",
      "autoClose": 2000,
      "dangerouslyHTMLString": true
    })
  } catch (error) {
    console.log(error);
  }
}
//查看多少個待完成 及 已完成 的項目數量
const finishTodoNum = ref(0)
const noFinishTodoNum = ref(0)
watchEffect(() => {  //當該值有變動時會立刻更新
  finishTodoNum.value = 0
  noFinishTodoNum.value = 0
  data.value.forEach((item) => {
    if(item.status == true){
      finishTodoNum.value ++
    }else{
      noFinishTodoNum.value ++
    }
  })
})
// 更換顯示列表
const changeListActive = (num) => {
  active.value = num
  getAllTodos().then(() => {
    if (num === 1) { // "待完成"
      noFinishData.value = data.value.filter((item) => item.status === false);
      data.value = noFinishData.value;
    } else if (num === 2) { // "已完成"
      finishData.value = data.value.filter((item) => item.status === true);
      data.value = finishData.value;
    } else { // "全部"
      data.value = [...data.value]; 
    }
  });
}
</script>

<template>
  <div id="todoListPage" class="bg-half">
    <nav>
      <h1><a>
        <img src="@/assets/logo.png" alt="">
      </a></h1>
      <ul>
        <li class="todo_sm">
          <a href="#"><span>{{ user.nickname }}的代辦</span></a>
        </li>
        <li><a href="#" @click.prevent="signOut">登出</a></li>
      </ul>
    </nav>
    <div class="conatiner todoListPage vhContainer">
      <div class="todoList_Content">
        <div class="inputBox">
          <input 
          v-model="todoText.content"
          type="text" 
          placeholder="請輸入待辦事項" />
          <a href="#" @click.prevent="addTodo">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
            </svg>
          </a>
        </div>
        <h5 v-if="data.value">目前尚無代辦事項</h5>
        <div class="todoList_list">
          <ul class="todoList_tab">
            <li><a 
              @click.prevent="changeListActive(0)"
              href="#" 
              :class="active === 0 ? 'active' : '' "
              >全部</a></li>
            <li>
              <a 
              @click.prevent="changeListActive(1)"
              href="#"
              :class="active === 1 ? 'active' : '' ">待完成</a>
            </li>
            <li>
              <a 
              @click.prevent="changeListActive(2)"
              href="#"
              :class="active === 2 ? 'active' : '' ">已完成</a>
            </li>
          </ul>
          <div class="todoList_items">
            <ul class="todoList_item">
              <li v-for="item in data" :key="item.id">
                <label class="todoList_label justify-content-between">
                    <div class="d-flex">
                      <template v-if="editTodoItem.id === item.id">
                        <input type="text" class="form-control col" v-model="editTodoItem.content">
                      </template>
                      <template v-else>
                        <input 
                        @click="finishTodo(item.id, item.status)"
                        v-model="item.status"
                        class="todoList_input" 
                        type="checkbox" 
                        value="true" />
                        <span>{{ item.content }}</span>
                      </template>
                    </div>
                    <div class="d-flex">
                      <template v-if="editTodoItem.id === item.id">
                        <button class="btn btn-outline-secondary me-2" type="button" @click="cancelEditTodoItem()">取消</button>
                        <button class="btn btn-outline-success " type="button" @click="editTodo()">確認</button>
                      </template>
                      <template v-else>
                        <button 
                        @click="upDateTodoItem(item.id)"
                        class="btn text-success"
                        type="button">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                          </svg>
                        </button>
                        <button 
                          @click="delTodo(item.id)"
                          class="btn text-danger"
                          type="button">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                          </svg>
                        </button>
                      </template>
                    </div>
                </label>
              </li>
            </ul>
            <div class="todoList_statistics">
              <p>{{ noFinishTodoNum }} 個未完成項目</p>
              <p>{{ finishTodoNum }} 個已完成項目</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
