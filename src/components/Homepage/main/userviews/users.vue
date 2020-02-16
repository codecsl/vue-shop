<template>
  <div class="Use">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!-- 搜索与添加 -->
      <el-row :gutter="20">
        <el-col :span="10">
          <el-input placeholder="请输入内容" v-model="querytext" clearable @clear="quer">
            <el-button slot="append" icon="el-icon-search" @click="quer"></el-button>
          </el-input>
        </el-col>
        <el-col :span="5">
          <el-button type="primary" @click="adduser">添加用户</el-button>
        </el-col>
      </el-row>
    </el-card>

    <!-- 用户渲染 -->
    <el-table :data="pagesize" style="width: 100%" stripe fit>
      <el-table-column type="index" width="100" label="ID"></el-table-column>
      <el-table-column prop="username" label="名字" width="180"></el-table-column>
      <el-table-column prop="role_name" label="角色" width="180"></el-table-column>
      <el-table-column prop="mobile" label="手机号" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column label="状态" prop="mg_state" width="180">
        <!-- 作用域插槽 需要重点查看 -->
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="userdatachange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="修改"
            placement="top-start"
            :enterable="false"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="showEdite(scope.row.id)"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="top-start"
            :enterable="false"
          >
            <el-button type="danger" icon="el-icon-delete" circle   @click="del(scope.row.id)"></el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="分配角色"
            placement="top-start"
            :enterable="false"
          >
            <el-button type="warning" icon="el-icon-setting" circle  @click="fenpeirole(scope.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页显示 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryinfo.pagenum"
      :page-sizes="queryinfo.tiaozhuanshu"
      :page-size="queryinfo.pagesizeshu"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total.length"
    ></el-pagination>

    <!-- 对话框提示 -->
    <el-dialog
      title="添加用户"
      :visible.sync="adddialogVisible"
      width="50%"
      class="jian"
      @close="guanbi"
    >
      <el-form ref="resto" :model="form" label-width="80px" :rules="rules" status-icon>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="adddialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="adduser2">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户对话框 -->
    <el-dialog
      title="修改用户信息"
      :visible.sync="edddialogVisible"
      width="50%"
      class="jian"
      @close="quxiao"
     
    >
      <el-form :model="editForm" :rules="rules"  ref="xiugai">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="edddialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="correct">修改</el-button>
      </span>
    </el-dialog>

    <el-dialog
  title="分配角色"
  :visible.sync="feidialogVisible"
  width="50%"
   class="jian">
  <div>
    <p>当前用户:{{feiroel.username}}</p>
    <p>当前角色:{{feiroel.role_name}}</p>
   <p>分配的角色:<el-select v-model="selectid" placeholder="请选择">
    <el-option
      v-for="item in frole"
      :key="item.id"
      :label="item.roleName"
      :value="item.id">
    </el-option>
  </el-select></p>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="feidialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="qdfrole">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>
<script>
import {
  getusersdata,
  userdatachanged,
  addusers,
  Modify,
  correcto,
  deleteo,
  distribution,
  juese
 
} from "network/shouye/userviews/users.js";
export default {
  name: "component_name",
  data() {
    var checkemail = (rule, value, callback) => {
      const regemail = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/g;
      if (regemail.test(value)) {
        return callback();
      }
      callback(new Error("请输入合法的邮箱"));
    };
    var checkphone = (rule, value, callback) => {
      const regphone = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
      if (regphone.test(value)) {
        return callback();
      }
      callback(new Error("请输入合法的手机号"));
    };
    return {
      query: "",
      page: 1,
      tiao: 5,
      queryinfo: {
        //   当前页数
        pagenum: 1,
        //   每页显示数据数
        pagesizeshu: 5,
        //    跳转数设置
        tiaozhuanshu: [1, 2, 5, 8, 10]
      },
      frole:[],
      selectid:"",
      feiroel:{},
      feidialogVisible:false,
      total:[],
      pagesize: [],
      querytext: "",
      adddialogVisible: false,
      edddialogVisible: false,
      editForm: {},
      mg_stat: "",
      form: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码", trigger: "blur" },
          { min: 6, max: 8, message: "长度在 6 到 8 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkemail, trigger: "blur" }
        ],

        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkphone, trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getdata("", 1, 5);
  },
  methods: {
    //   显示每页显示多少数据
    handleSizeChange(val) {
      this.queryinfo.pagesizeshu = val;
      this.getdata("", 1, this.queryinfo.pagesizeshu);
    },
    // 前往页数
    handleCurrentChange(val) {
      this.queryinfo.pagenum = val;
      this.getdata("", this.queryinfo.pagenum, this.queryinfo.pagesizeshu);
    },
    userdatachange(val) {
      userdatachanged(val.id, val.mg_state).then(res => {
        if (res.data.meta.status != 200) {
          return this.$message.error("更新失败");
        }
        this.$message.success("更新状态成功");
      });
    },
    quer() {
      this.getdata(
        this.querytext,
        this.queryinfo.pagenum,
        this.queryinfo.tiaozhuanshu
      );
    },
    adduser() {
      this.adddialogVisible = true;
    },
    guanbi() {
      this.$refs.resto.resetFields();
    },
    adduser2() {
      this.adddialogVisible = false;
      this.$refs.resto.validate(valid => {
        if (!valid) return this.$message.error("请将信息填写完整");

        addusers(this.form)
          .then(res => {
            const { data: res1 } = res;
            if (res1.meta.status != 201) return this.$message.error("添加失败");
            this.$message.success("添加成功");
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    // 修改用户信息
    showEdite(id) {
      this.edddialogVisible = true;
      Modify(id).then(res => {
        const { data: res1 } = res;
        this.editForm = res1.data;
      });
    },
    correct() {
      this.$refs.xiugai.validate(valid => {
        this.edddialogVisible = false;
        if (!valid) return this.$message.error("请填写正确信息");
        correcto(this.editForm.id, this.editForm.email,this.editForm.mobile).then(res => {
          const { data: res1 } = res;
          if (res1.meta.status != 200) return this.$message.error("修改失败");
          this.$message.success("修改成功");
        });
      });
    },
    quxiao() {
      this.$refs.xiugai.resetFields();
    },
    del(id){
      deleteo(id).then(res=>{
         const {data:res1}=res
          if(res1.meta.status!=200) return this.$message.error("删除失败")
            this.$message.success("删除成功")
      })
    
    },
    fenpeirole(role){
        this.feidialogVisible=true
        this.feiroel=role
        juese().then(res=>{
         const {data:res1}=res
         if(res1.meta.status!=200) return this.$message.error("获取角色失败")
         this.frole=res1.data
        })
        
    },
    qdfrole(){
     if(this.selectid==""){
       this.$message.error("请选择相应角色")
     }
     distribution(this.feiroel.id,this.selectid).then(res=>{
    const {data:res1}=res
     console.log(res1)
    if(res1.meta.status!=200) return this.$message.error("更新失败")
     this.$message.success("更新成功")

    
     })
     this.feidialogVisible=false

    },

    // 封装数据请求
    getdata(query, page, tiao) {
      getusersdata(query, page, tiao)
        .then(res => {
          const { data: res1 } = res;
          if (res1.meta.status != 200)
            return this.$message.error("获取用户列表失败");
          this.pagesize = res1.data.users;
          this.total=res1.data.users
          
        })
        .catch(res => {
          console.log(res);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.Use {
  .el-breadcrumb {
    margin-bottom: 10px;
  }
  .el-card,
  .el-table,
  .jian {
    line-height: 0;
  }
  .jian{
    text-align: left;
  }
  .jian p{
    margin-bottom: 25px;
  }
}
</style>