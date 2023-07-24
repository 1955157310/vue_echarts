<template>
    <div id="background">
        <div class="container">
            <form action="">
                <h1>登录</h1>
                <div class="form">
                    <div class="item">
                        <label>姓名：</label><input type="text" name="name" v-model.trim="name" placeholder="请输入姓名">
                        <!-- v-model把输入的值传输给name变量 -->
                        <br />
                    </div>
                    <div class="item">
                        <label>学号：</label><input type="password" name="id" v-model.trim="id" placeholder="请输入学号">
                        <br />
                    </div>
                    <div class="keep">
                        <input @click="handlesave" id="yes" type="radio" value="0"><!-- 点击选中 -->
                        <label for="yes">保持登录状态</label>
                    </div>
                </div>

            </form>
            <div>
                <button type="submit" @click.prevent="handlelogin">登录 </button>
                <!-- v-on点击按钮触发handlelogin方法 -->
                <button @click.prevent="handleregister">注册</button>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>
  
<style scoped>
#background {
    width: 100%;
    height: 100%;
    background: url("../jpg/denglu.jpg");
    background-size: 100% 100%;
    position: fixed;
    top: 0;
    left: 0;
}

.container {
    display: flex;
    flex-direction: column;
    width: 480px;
    height: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #00000090;
    text-align: center;
    border-radius: 20px;
    margin-top: 10px;
}

.container h1 {
    color: aliceblue;
    margin-left: 20px;
}

.item {
    display: flex;
    color: white;
    margin-left: 15%;
    margin-top: 35px;
    font-size: 20px;
    text-align: left;
}

.item label {
    float: left;
    width: 5em;
    margin-right: 1em;
    text-align: right;
}

input {
    margin-left: -5px;
    padding: 4px;
    border: solid 1px #4e5ef3;
    outline: 0;
    font: normal 13px/100% Verdana, Tahoma, sans-serif;
    width: 200px;
    height: 23px;
    background: #f1f1f190;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;
}

button {
    position: relative;
    height: 33px;
    width: 100px;
    background: rgba(35, 19, 252, 0.425);
    border-radius: 10px;
    margin-top: 18px;
    box-shadow: none;
    color: white;
    margin-left: 40px;
    margin-right: 10px;

}

.keep {
    color: white;
}

.keep input {
    width: 15px;
    height: 15px;
    margin-top: 7px;
    margin-left: 10px;
    margin-right: 10px;
}
</style>

<script>
import router from '@/router';

import { ref } from 'vue';
import axios from 'axios';
import { onMounted } from 'vue';
export default {
    setup() {

        const student = ref([]);
        const name = ref();
        const id = ref();
        const index = ref()
        onMounted(() => {
            getJson()
        })
        const getJson = async () => {
            try {
                const response = await axios.get('http://localhost:4000/student');
                student.value = response.data;
                console.log(student.value);

            } catch (error) {
                console.error(error);
            }
        };
        const handlelogin = () => {
            for (let index = 0; index < student.value.length; index++) {

                if (name.value === student.value[index].name && id.value === student.value[index].id) {
                   
                    localStorage.setItem('idname', JSON.parse(id.value))
                    router.push({ path: '/home' });//如果输入的名字以及密码正确路由跳转至个人页面

                }
                else if (name === '')//名字为空
                {
                    alert('用户名不为空');
                }
                else if (id === '')//密码为空
                {
                    alert('密码不为空');
                }
                 else if(index>=student.value.length){
                    alert('账号不存在，请注册后登录');//查无此号
                } 

            }

        };
        const handleregister = () => {
            router.push({ path: '/register' })//点击注册按钮，跳转至注册页面
        };

        return {
            student,
            getJson,
            name,
            id,
            handlelogin,
            index,
            handleregister,
        }
    }
}
</script>

<!-- <script>
import axios from 'axios';
import { onMounted } from 'vue';
onMounted(getJson())
export default {
  data(){
    return{
      name:"",//姓名，用v-model绑定监听，将输入的字符串赋值给name变量
      password:"",//密码
      st:"false",//false为不保存登录
    };
  },

  methods:{
    async getJson(){
        await axios.get('http://localhost:4000/student').then((res=>{
            console.log(res.data);
        }))
        
        
    },
   

    handlelogin:function()
    {

      if(this.name===localStorage['name'] && this.password===localStorage['password'])
       {
         this.$router.replace('/home');//如果输入的名字以及密码正确路由跳转至个人页面
       } 
       else if(this.name==='')//名字为空
       {
         alert('用户名不为空');
       }
       else if(this.password==='')//密码为空
       {
         alert('密码不为空');
       }
      else{
        alert('账号不存在，请注册后登录');//查无此号
        }
    },
    handleregister:function()
    {
      this.$router.replace('/register')//点击注册按钮，跳转至注册页面
    },
    //点击保持登录状态触发handlesave
    handlesave:function(){
      this.st="true";//修改登录状态为true
      localStorage.setItem('s',this.st);
      console.log(localStorage.s);


    }
  }
};
</script> -->
