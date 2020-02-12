<template>
<div class="quanxian">
  <el-submenu v-for="item in quanxianname" :key="item.id"  :index="item.id + ''" @click.native="getroute">
    <template slot="title" >
      <i :class="iconObject[item.id]"></i>
      <span>{{item.authName}}</span>
    </template>

    <el-menu-item :index="item1.path +''" v-for="item1 in item.children" :key="item1.id">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span>{{item1.authName}}</span>
      </template>
    </el-menu-item>
   
  </el-submenu>
  </div>
</template>
<script>
export default {
  name: "component_name",
  data() {
    return {
      iconObject:{
        "125":"el-icon-user-solid",
        "103":"el-icon-s-promotion",
        "101":"el-icon-s-shop",
        "102":"el-icon-s-order",
        "145":"el-icon-s-data"
      },
      currentroute:""
    };
  },
  props: {
   quanxianname: {
      type: Array,
      datafu() {
        return "sorry";
      }
    }
  },
  computed: {
  
  },
  methods: {
    getroute(){
    this.currentroute=this.$route.path
    this.$emit("getrouter",this.currentroute)
    }
  },
};
</script>
<style lang="less" scoped>
</style>