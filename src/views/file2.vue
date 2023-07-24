<template>
  <div style="height: 600px; overflow-y: auto;">
    <table>
      <thead>
        <tr>
          <th style="width: 150px;">课程名称</th>
          <th style="width: 150px;">学分</th>
          <th style="width: 150px;">任课教师</th>
          <th style="width: 150px;">授课地点</th>
          <th style="width: 150px;">教师邮箱</th>
          <th style="width: 150px;">课程类型</th>
          <th style="width: 150px;">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in tableData" :key="index">
          <td>{{ item.text_name }}</td>
          <td>{{ item.text_score }}</td>
          <td>{{ item.text_teacher }}</td>
          <td>{{ item.text_address }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.type }}</td>
          <td>
            <button class="meth" @click="addtext(index, item)" v-show="item.isshow">添加</button>
            <button class="meth" @click="deltext(index, item)" v-show="!item.isshow">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
   
<style>
td {
  width: 150;
  height: 50px;
  text-align: center;
  list-style-type: none;
}

.meth {
  width: 40px;
}
</style>
<script>

import { ref } from 'vue';
import axios from 'axios';
import { onMounted } from 'vue';
export default {
  setup() {


    onMounted(() => {
      course()
      // localdata()
    });
    const tableData = ref([])
    const course = async () => {

      const res = await axios.get('http://localhost:4000/course')
      console.log(res.data);
      tableData.value = res.data;


    };
    const addtext = async (index, row) => {

      await axios.post('http://localhost:4000/mainitem', {
        c_name: row.text_name,
        stid: localStorage.getItem('idname'),
        c_score: row.text_score,
        c_teacher: row.text_teacher,
        c_address: row.text_address,
        c_email: row.email,
        c_type: row.type,

      }).then(() => {
        axios.put('http://localhost:4000/course/' + row._id, {
          text_name: row.text_name,
          text_score: row.text_score,
          text_teacher: row.text_teacher,
          text_address: row.text_address,
          email: row.email,
          type: row.type,
          isshow: 'false',

        }).then(() => {
          row.isshow = !row.isshow
          alert('添加成功')
        })
      })




    }
    const deltext = async (index, row) => {
      axios.put('http://localhost:4000/course/' + row._id, {
        text_name: row.text_name,
        text_score: row.text_score,
        text_teacher: row.text_teacher,
        text_address: row.text_address,
        email: row.email,
        type: row.type,
        isshow: 'true',

      }).then(() => {
        let stid = localStorage.getItem('idname');
        let c_name = row.text_name;
        axios.delete('http://localhost:4000/mainitem', {
          params: {
            stid: stid,
            c_name: c_name
          }
        })
      }).then(() => {
        row.isshow = !row.isshow
        alert('删除成功')
      })


    }
    return {
      tableData,
      addtext,
      deltext,
      course,
      /* row,
      text_name,
      text_score,
      text_teacher,
      text_address,
      email,
      type, */
      //localdata,

    }
  },
}
</script>
