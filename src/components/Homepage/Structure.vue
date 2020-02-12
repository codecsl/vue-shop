<template>
  <el-container class="mainbody">
    <el-header class="header">
      <Hd></Hd>
    </el-header>
    <el-container>
      <el-aside width="200px" class="asidebody"><Asi></Asi></el-aside>
      <el-main class="maibody"><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>


<script>
import Hd from "./Header/header";
import Asi from "./Asider/Asi"
export default {
  name: "component_name",
  data() {
    return {};
  },
  components: {
    Hd,
    Asi
  }
};
</script>
<style lang="less" scoped>
.el-header,
.el-footer {
  background-color: #545c64;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #545c64;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.mainbody {
  height: 100%;
  .header {
    height: 100px !important;
    line-height: 100px;
  }
}
</style>