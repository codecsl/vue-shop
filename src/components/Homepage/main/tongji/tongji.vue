<template>
<div class="tongji">
    <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item><a href="/">数据统计</a></el-breadcrumb-item>
  <el-breadcrumb-item>数据报表</el-breadcrumb-item>
</el-breadcrumb>

<el-card class="box-card">
   <div id="main" style="width: 800px;height:400px;" ref="tongj"></div>
</el-card>
</div>
</template>
<script>
import echarts from 'echarts'
import {baobiao} from 'network/shouye/tongji/baobiao'
import _ from "lodash"
export default {
  name: "component_name",
  data () {
    return {
        options: {	
          title: {
            text: '用户来源'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#E9EEF3'
              }
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              boundaryGap: false
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ]
        }
    };
  },
  created() {
     
  },
  mounted() {
       const myChart = echarts.init(this.$refs.tongj);
        baobiao().then(res=>{
          const {data:res1}=res
          if(res1.meta.status!=200) return this.$message.error("数据获取失败")

         const shuj= _.merge(res1.data,this.options)
        //  Object.assign(res1.data,this.options)
           myChart.setOption(shuj)
            


      })
      
  },
}
</script>
<style lang="less" scoped>
.tongji{
    .box-card{
        margin-top:15px;
        line-height:0px;
        text-align:left;
    }
}
</style>