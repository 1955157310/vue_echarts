<style>
.mainoption {

  width: 100%;
  height: 90vh;
}
</style>
<template>
  <div>
    <div ref="echart" class="mainoption"></div>
  </div>
</template>
<script >
import { ref, onMounted, reactive } from 'vue'
import * as echarts from 'echarts'
import axios from 'axios';

export default {
  setup() {
    const echart = ref()
    const mao = ref()
    const deng = ref()
    const smoke = ref()
    const dianzi = ref()
    const ruangong = ref()
    const mysql = ref()
    const shujujiegou = ref()
    const web = ref()
    const chayi = ref()
    const xiaoshuo = ref()
    const getCourse = async () => {
      const res = await axios.get('http://localhost:4000/mainitem')
      mao.value=res.data.filter(item=>item.c_name==='毛泽东思想').length 
      deng.value=res.data.filter(item=>item.c_name==='邓小平理论').length   
      smoke.value=res.data.filter(item=>item.c_name==='香烟鉴赏').length   
      dianzi.value=res.data.filter(item=>item.c_name==='电子烟鉴赏').length   
      ruangong.value=res.data.filter(item=>item.c_name==='软件工程').length   
      mysql.value=res.data.filter(item=>item.c_name==='数据库').length   
      shujujiegou.value=res.data.filter(item=>item.c_name==='数据结构').length   
      web.value=res.data.filter(item=>item.c_name==='web前端').length   
      chayi.value=res.data.filter(item=>item.c_name==='茶艺鉴赏').length   
      xiaoshuo.value=res.data.filter(item=>item.c_name==='小说鉴赏').length        
      newechart()
   
/*       window.onresize = () => {
        mycharts.resize()
      }    */  
    }
   const newechart = async()=>{
    const option = reactive({
      title: {
        text: "各专业认识汇总表",


        textStyle: {
          fontSize: 30
        },
        subtextStyle: {
          fontSize: 20
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['毛泽东思想', '邓小平理论', '香烟鉴赏', '电子烟鉴赏', '软件工程', '数据库', '数据结构', "web前端", "茶艺鉴赏", "小说鉴赏"]
      },
      yAxis: {
        type: 'value',
        data: ['2', '4', '6', '8', '10', '12', '14', "16", "18", "20"]
      },
      series: [
        {
          data: [mao.value, deng.value, smoke.value, dianzi.value, ruangong.value, mysql.value, shujujiegou.value, web.value,chayi.value, xiaoshuo.value,],
          type: 'line',
          areaStyle: {}
        }
      ]
    });
    echarts.init(echart.value).setOption(option)
   }
    onMounted(() => {
      getCourse()
    
    })
      
    return {
      echart,

      mao,
      deng,
      smoke,
      dianzi,
      ruangong,
      mysql,
      shujujiegou,
      web,
      chayi,
      xiaoshuo,
      getCourse,
      newechart
    }
  },
}
</script>

