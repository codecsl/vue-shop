<template>
  <div class="Asi">
    <el-row class="tac">
      <el-col :span="12" class="Asi-col">
        <el-menu
          :default-active="route +''"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#409bff"
        unique-opened 
        router>
          <Usein :quanxianname="quanxianname" @getrouter="lisener">
            
          </Usein>
          
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Usein from "./user/Usein";
import {getshoudata} from "network/shouye/getshoudata"


export default {
  name: "component_name",
  data() {
    return {
      quanxianname:[],
      route:""
    };
  },
  methods: {
    
    lisener(route){
     const [jia,zhen]=route.split("/")
     this.route=zhen
    }
  },
  components: {
    Usein
  },
  created() {
   getshoudata().then(res=>{
     const {data:res1}=res
    if(res1.meta.status!=200) return alert("获取菜单失败")
    this.quanxianname=res1.data
   })
  }
};
</script>
<style lang="less" scoped>
.Asi {
  text-align: center;
  .Asi-col {
    width: 100%;
    .el-menu{
      border-right: 0px
    }
  }
}
</style>