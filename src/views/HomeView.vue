<script>
import router from '@/router';
export default {
  setup() {
    const switchId = () => {
      router.push({ path: '/login' })
    };
    return {
      switchId
    }
  }
}

</script>
<template>
  <div class="common-layout">
    <div class="el-container" >
      <div class="el-aside" >
        <div class="navigation1">
          <router-link to="/home/file1">个人中心</router-link>
        </div>
        <div class="navigation2">
          <router-link to="/home/file2">选课中心</router-link>
        </div>
        <div class="navigation3">
          <router-link to="/home/file3">课程信息</router-link>
        </div>

      </div>
     
        <div class="el-header" >
          <div class="navigation4">
            <router-link to="/home/file4">vue音乐播放器</router-link>
          </div>
          <div class="navigation5">
            <router-link to="/home/file5">GPT镜像</router-link>
          </div>
          <div class="navigation6">
            <router-link to="/home/file6">小游戏</router-link>
          </div>
          <button @click="switchId()">点击切换账号</button>
        </div>
        <div class="el-main" >
          <router-view>
          </router-view>
        </div>

     
      </div>
  </div>
</template>
<style>
.common-layout {
 
  
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  position: fixed;
  top: 0;
  left: 0;
} 

.el-header {
  display: flex;

  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 60px;
  background-color: #bee7ef;
}

.navigation4 {
  width: 45%;
  text-align: center;

}

.navigation5 {
  width: 24%;

}

.navigation6 {
  width: 24%;

}

button {
  width: 7%;
  background-color: #56b2d1;

}

.el-aside {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 500px;
  width: 120px;
  background-color: rgb(255, 255, 255,0);
}

.el-main {
  position: absolute;
  left: 120px;
  width: 1436px;
  height: 600px;
  top: 60px;
  
  border-color: black;
  border-style: solid;
  border: radius 0px;
}

.navigation1 {
  position: relative;
  width: 120px;
  height: 80px;
  top: 60px;
  text-decoration: none;
  text-align: center;
  background-color: rgb(255, 255, 255,0);
}

.navigation2 {
  position: relative;
  width: 120px;
  height: 80px;
  top: 140px;
  text-decoration: none;
  text-align: center;
  background-color: rgb(255, 255, 255,0);

}

.navigation3 {
  position: relative;
  width: 120px;
  height: 80px;
  top: 220px;
  text-decoration: none;
  text-align: center;
  background-color: rgb(255, 255, 255,0);

}

a {
  text-decoration: none;
  display: inline-block;
  width: 100%;
  height: 80px;
  line-height: 80px;
  color: rgb(12, 1, 1);

}
</style>
