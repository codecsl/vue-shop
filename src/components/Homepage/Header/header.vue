<template>
  <div class="Head">
    <headerltem>
      <div slot="userinfo" class="Usinfo">
        <img src="~assets/image/guanlilog/guanli.png" alt />
        
        <p>欢迎你!admin</p>
      </div>
      <div slot="exit">
        <el-button type="info" round @click="exit">退出</el-button>
      </div>
    </headerltem>
  </div>
</template>
<script>
import headerltem from "./headerltem";
export default {
  name: "component_name",
  data() {
    return {};
  },
  components: {
    headerltem
  },
  methods: {
    exit() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    }
  }
};
</script>
<style lang="less" scoped>
.Head{
    line-height: 100px;
    color:white;
    font-weight: 700;
    font-size: 15px;
    .Usinfo {
        width: 200px;
        text-align: center;
        img{
            width:25%;
            border-radius: 50%;
        }
        p{
            height: 20px;
            margin-top: -80px;
        }
    }
}
</style>