<style>
.face {
  position: relative;
  width: 130px;
  height: 180px;

  top: 100px;
  left: 100px;

}

ul {
  position: absolute;
  left: 500px;
  top: 140px;
  list-style-type: none;

}

li {
  width: 200px;
  height: 30px;
}


</style>
<template>
  <div class="face">
  
    <img :src='student.picture' alt="">
  </div>

  <ul>
    <li>
      姓名:{{ student.name }}
    </li>
    <li>
      性别:{{ student.gender }}
    </li>
    <li>
      学号:{{ student.id }}
    </li>
    <li>
      学院:{{ student.xueyuan }}
    </li>
    <li>
      班级:{{ student.cLass }}
    </li>
  </ul>
</template>
<script>

import { ref } from 'vue';

import axios from 'axios';
import { onMounted } from 'vue';

export default {
  setup() {
    const student = ref([]);
    const getData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/student');
        let item = localStorage.getItem('idname');
        let index = response.data.findIndex((obj) => {
          return obj.id === item
        });
        console.log(item);
       
        student.value = response.data[index];
                  
      } catch (error) {
        console.error(error);
      }
    };
    onMounted(() => {
      getData()
    })
    return {
      student,
      getData,
    };
  },
};
</script>