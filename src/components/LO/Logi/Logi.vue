<template>
  <div class="Log">
    <loginitem>
      <div slot="avater" class="LogShou">
        <img src="~assets/image/guanlilog/guanli.png" alt />
      </div>
      <div slot="user_name">
        <!-- <div style="margin: 20px;"></div> -->
        <div class="user_info">
          <el-form :model="form1" :rules="rules" ref="logRef">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="form1.username" prefix-icon="el-icon-user-solid"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="form1.password" prefix-icon="el-icon-key" type="password"></el-input>
            </el-form-item>

            <el-form-item class="btns">
              <el-button type="primary" round @click="check" :plain="true">登录</el-button>
              <el-button type="warning" round @click="reset">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </loginitem>
  </div>
</template>
<script>
import loginitem from "components/LO/loginitem/Loginltem.vue";
import { getlogindata } from "network/login.js";
export default {
  name: "component_name",
  data() {
    return {
      form1: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 8, message: "长度在 6 到 8 个字符", trigger: "blur" }
        ]
      }
    };
  },
  components: {
    loginitem
  },
  methods: {
    reset() {
      this.$refs.logRef.resetFields();
    },
    check() {
      this.$refs.logRef.validate(valid => {
        if (!valid) return;
        getlogindata(this.form1.username, this.form1.password).then(res => {
          console.log(res);
          window.sessionStorage.setItem("token", res.data.data.token);
          if (res.data.meta.status != "200")
            return this.$message.error("登录失败");

          this.$router.push("/home");
          this.$message({
            message: "登录成功",
            type: "success"
          });
        });
      });
    }
  },

  mounted() {}
};
</script>
<style lang="less" scoped>
.Log {
  width: 450px;
  height: 440px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  .LogShou {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin: 10px auto;
    img {
      width: 100%;
      height: 100%;
      // border-radius: 50%;
    }
  }
  .user_info {
    background: white;
    padding: 10px 10px;
    border-radius: 10px;
    .btns {
      display: flex;
      justify-content: center;
    }
  }
}
</style>