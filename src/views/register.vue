<template>
  <div id="background">
    <div id="contain">
      <h1>注册</h1>

      <div class="form">
        <label>姓名：</label><input type="text" v-model.trim="name"><br />
      </div>
      <div class="form">
        <label>性别：</label><input type="text" v-model.trim="gender"><br />
      </div>
      <div class="form">
        <label>学号：</label><input type="password" v-model.trim="id"><br />
      </div>
      <div class="form">
        <label>班级：</label><input type="text" v-model.trim="cLass"><br />
      </div>
      <div class="form">
        <label>学院：</label><input type="text" v-model.trim="xueyuan"><br />
      </div>
      <button @click.prevent="handlefinish">提交</button>
    </div>
  </div>
</template>
//css
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

#contain {
  width: 580px;
  height: 560px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #00000090;
  text-align: center;
  border-radius: 20px;
}

#contain h1 {
  color: white;
}

.form {
  color: white;
  margin-left: 20%;
  margin-top: 50px;
  font-size: 20px;
  text-align: left;
}

label {
  float: left;
  width: 5em;
  margin-right: 1em;
  text-align: right;
}

input,
textarea {
  margin-left: 10px;
  padding: 4px;
  border: solid 1px #4e5ef3;
  outline: 0;
  font: normal 13px/100% Verdana, Tahoma, sans-serif;
  width: 200px;
  height: 20px;
  background: #f1f1f190;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;
}

input:hover,
textarea:hover,
input:focus,
textarea:focus {
  border-color: #0d0aa1;
}

button {
  position: relative;
  height: 33px;
  width: 150px;
  background: rgba(35, 19, 252, 0.425);
  border-radius: 10px;
  margin-top: 38px;
  box-shadow: none;
  color: white;
  margin-left: 40px;
}
</style>
<script>
import { ref } from 'vue';
import router from '@/router';
import axios from 'axios';
import { onMounted } from 'vue';


export default {
  setup() {


    const name = ref()
    const gender = ref()
    const id = ref()
    const cLass = ref()
    const xueyuan = ref()
    const picture = ref()

    const handlefinish = async () => {

      await axios.post('http://localhost:4000/student',{
        name: name.value,
        gender: gender.value,
        id: id.value,
        cLass: cLass.value,
        xueyuan: xueyuan.value,
        picture: './photo/' + name.value + '.jpg'

      }).then(() => {
        router.push({ path: '/login' })
      })

    }

    onMounted(() => {

    })
    return {
      id,
      name,
      xueyuan,
      cLass,
      gender,
      picture,
      handlefinish,
    }
  },
}
</script>
