<template>
<div class="quanxian">
    <!-- 面包屑导航 -->
   <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item><a :href="this.$route.path">权限管理</a></el-breadcrumb-item>
  <el-breadcrumb-item>权限列表</el-breadcrumb-item>
</el-breadcrumb>

<!-- 卡片视图 -->
<el-card class="box-card">
    <!-- 视图列表 -->
  <el-table
    :data="liebiaoinfo"
    stripe
    style="width: 100%">
     <el-table-column
      type="index"
      label="id"
      width="180">
    </el-table-column>
     <el-table-column
      prop="authName"
      label="权限名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="path"
      label="路径"
      width="180">
    </el-table-column>
    
     <el-table-column
      prop="level"
      label="权限等级"
     >
      <template slot-scope="scope">
         <el-tag v-if="scope.row.level=='0'">一级</el-tag>
         <el-tag type="success" v-if="scope.row.level=='1'">二级</el-tag>
         <el-tag type="warning" v-if="scope.row.level=='2'">三级</el-tag>
      </template>
    </el-table-column>
    
  </el-table>
</el-card>
</div>
</template>
<script>
import {liebiao} from "network/shouye/quanxianviews/quanxian"
export default {
  name: "component_name",
  data () {
    return {
        liebiaoinfo:[]
    };
  },
  methods: {
    
  },
  created() {
      liebiao("list").then(res=>{
          const {data:res1}=res
         if(res1.meta.status!=200) return this.$message.error("获取数据失败")
          this.liebiaoinfo=res1.data
     })
  },
}
</script>
<style lang="less" scoped>
.quanxian{
    .el-breadcrumb{
        margin-bottom: 15px;
    }
    .el-table{
        line-height: 0px;
    }
}
</style>