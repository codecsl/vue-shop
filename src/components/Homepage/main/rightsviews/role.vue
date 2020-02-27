<template>
  <div class="role">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a :href="this.$route.path">权限管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card class="box-card">
      <el-button type="primary" @click="adduser" class="adduser">添加用户</el-button>
      <!-- 表格 -->
      <el-table :data="roleinfo" stripe style="width: 100%" border>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row v-for="(item,index) in scope.row.children" :key="index">
              <el-col :span="5">
                <el-tag class="te" closable @close="removeid(scope.row,item.id)">{{item.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <el-row v-for="(item1,index) in item.children" :key="index">
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      class="te"
                      closable
                      @close="removeid(scope.row,item1.id)"
                    >{{item1.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18" class="te">
                    <el-tag
                      type="warning"
                      v-for="(item2,index) in item1.children "
                      :key="index"
                      closable
                      @close="removeid(scope.row,item2.id)"
                    >{{item2.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="id" width="180"></el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" width="180"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              @click="editor(scope.row.id)"
            >编辑</el-button>

            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="open(scope.row.id)"
              
            >删除</el-button>
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="small"
              @click="showSet(scope.row,scope.row.id)"
            >分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 对话框提示 -->
      <el-dialog
        title="添加角色"
        :visible.sync="adddialogVisible"
        width="50%"
        class="jian"
        @close="guanbi"
      >
        <el-form ref="resto" :model="rolesinfoo" label-width="80px" :rules="rules" status-icon>
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="rolesinfoo.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="roleDesc">
            <el-input v-model="rolesinfoo.roleDesc"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="adddialogVisible=false">取 消</el-button>
          <el-button type="primary" @click="adduser2">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 编辑用户信息 -->

      <el-dialog
        title="修改用户信息"
        :visible.sync="edddialogVisible"
        width="50%"
        class="jian"
        @close="quxiao"
      >
        <el-form :model="bianjiForm" :rules="rules" ref="xiugai">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="bianjiForm.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="roleDesc">
            <el-input v-model="bianjiForm.roleDesc"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="edddialogVisible=false">取 消</el-button>
          <el-button type="primary" @click="correct">修改</el-button>
        </span>
      </el-dialog>

     

      <!-- 分配权限对话框 -->
      <el-dialog title="提示" :visible.sync="SedialogVisible" width="50%" class="jian" @close="gb">
        <el-tree
          :data="fenpeiquan"
          :props="treeProps"
          ref="treeso"
          default-expand-all
          show-checkbox
          node-key="id"
          :default-checked-keys="defkeys"
        ></el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="SedialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="sq">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import {
  roleso,
  addusers,
  bianjio,
  xiugaio,
  del,
  deluser,
  fenpeiquanxain,
  shouquan
} from "network/shouye/quanxianviews/quanxian";
export default {
  name: "component_name",
  data() {
    return {
      roleinfo: [],
      adddialogVisible: false,
      rolesinfoo: {
        roleName: "",
        roleDesc: ""
      },
      jueseid: "",
      scid: "",
      bianjiForm: {},
      fenpeiquan: [],
      treeProps: {
        label: "authName",
        children: "children"
      },
      defkeys: [],
      edddialogVisible: false,
      dedialogVisible: false,
      SedialogVisible: false,
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        roleDesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 6 到 8 个字符", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.zonginfo();
  },
  methods: {
    guanbi() {
      this.cz("resto");
    },
    adduser() {
      this.adddialogVisible = true;
    },
    adduser2() {
      addusers(this.rolesinfoo).then(res => {
        this.$refs.resto.validate(valid => {
          if (!valid) {
            return this.$message.error("请填写相应信息");
          }
          this.jc("添加失败", "添加成功", res);
        });
      });
      this.zonginfo();
    },
    correct() {
      this.$refs.xiugai.validate(valid => {
        if (!valid) return this.$message.error("请填写完信息");
        this.edddialogVisible = false;
        xiugaio(this.bianjiForm).then(res => {
          //  console.log(res)
          this.jc("编辑失败", "编辑成功", res);
        });
      });
      this.zonginfo();
    },
    editor(id) {
      console.log(id);
      this.edddialogVisible = true;
      bianjio(id).then(res => {
        const { data: res1 } = res;
        this.bianjiForm = res1.data;
      });
      // console.log(id)
    },
    quxiao() {
      this.cz("xiugai");
    },
    open(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
        del(id).then(res => {
             this.jc("删除失败", "删除成功", res);
            this.zongshuju(this.canshu)
           
          });
          this.zonginfo();  
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
       
    },
    removeid(id1, id2) {
      this.$confirm("此操作将永久删除该权限, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deluser(id1.id, id2).then(res => {
            const { data: res1 } = res;
            if (res1.meta.status != 200) return this.$message.error("删除失败");

            this.$message.success("删除成功");
            id1.children = res1.data;
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    showSet(role, jueseid) {
      fenpeiquanxain("tree").then(res => {
        const { data: res1 } = res;
        this.fenpeiquan = res1.data;
      });
      this.getsanjiid(role, this.defkeys);
      this.jueseid = jueseid;
      this.SedialogVisible = true;
    },
    gb() {
      this.defkeys = [];
    },
    sq() {
      const keys = [
        ...this.$refs.treeso.getCheckedKeys(),
        ...this.$refs.treeso.getHalfCheckedKeys()
      ];
      const idstr = keys.join(",");
      shouquan(this.jueseid, idstr).then(res => {
        const { data: res1 } = res;
        if (res1.meta.status != 200) return this.$message.error("更新失败");
        this.$message.success("更新成功");
      });
      this.zonginfo();
      this.SedialogVisible = false;
    },
    // 通过递归的方式获取三级权限
    getsanjiid(node, arr) {
      // console.log(node)
      if (!node.children) {
        return arr.push(node.id);
      }
      node.children.forEach(item => {
        this.getsanjiid(item, arr);
      });
    },
    cz(xg) {
      this.$refs[xg].resetFields();
    },
    // 封装
    jc(sb, cg, res) {
      const { data: res1 } = res;
      if (res1.meta.status != 200) {
        this.$message.error(`${sb}`);
      }
      this.adddialogVisible = false;
      this.$message.success(`${cg}`);
    },
    zonginfo() {
     return roleso().then(res => {
        const { data: res1 } = res;
        if (res1.meta.status != 200) return this.$message.error("获取数据失败");
        this.roleinfo = res1.data;
      });
    },
    created() {
      this.zonginfo()
    },
  }
};
</script>
<style lang="less" scoped>
.role {
  .el-breadcrumb {
    margin-bottom: 10px;
  }
  .el-card {
    position: relative;
    line-height: 0px;
    .adduser {
      position: absolute;
      top: 10px;
      left: 10px;
      z-index: 2000;
    }
    .el-table {
      margin-top: 30px;
      .te {
        margin-bottom: 10px;
      }
    }
    .jian {
      line-height: 0px !important;
    }
  }
}
</style>