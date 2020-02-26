<template>
  <div class="goodscanshu">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="this.$route.path">商品管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-alert title="注意:只允许为第三级分类设置相关参数" type="warning" show-icon></el-alert>

      <el-row class="sb">
        <el-col>
          <span>选择商品分类:</span>
          <el-cascader
            v-model="selectid"
            :options="shuju"
            :props="peizhi "
            @change="handleChange"
            expandTrigger="hover"
          ></el-cascader>
        </el-col>
      </el-row>

      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!-- 动态参数 -->
        <el-tab-pane label="动态参数" name="many">
          <el-button type="primary" size="mini" :disabled="isBtn" @click="tjdx">添加参数</el-button>
          <el-table :data="dtcanshu" stripe style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag
                  v-for="(item,index) in scope.row.attr_vals"
                  :key="index"
                  closable
                  type
                  style="margin-right:10px;"
                  :disable-transitions="false"
                >{{item}}</el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                ></el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                >+ New Tag</el-button>
              </template>
            </el-table-column>
            <el-table-column label="id" type="index"></el-table-column>
            <el-table-column prop="attr_name" label="参数名称" width="180"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="bjcsl(scope.row.attr_id,scope.row.cat_id,scope.row.attr_sel,scope.row)"
                >编辑</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="open(scope.row.cat_id,scope.row.attr_id)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 静态属性 -->
        <el-tab-pane label="静态属性" name="only" :disabled="isBtn">
          <el-button type="primary" size @click="tjdx">添加属性</el-button>
          <el-table :data="jtcanshu" stripe style="width: 100%">
            <el-table-column type="expand">
               <template slot-scope="scope">
                <el-tag
                  v-for="(item,index) in scope.row.attr_vals"
                  :key="index"
                  closable
                  type
                  style="margin-right:10px;"
                  :disable-transitions="false"
                >{{item}}</el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                ></el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                >+ New Tag</el-button>
              </template>
            </el-table-column>
            <el-table-column label="id" type="index"></el-table-column>
            <el-table-column prop="attr_name" label="属性名称" width="180"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="bjcsl(scope.row.attr_id,scope.row.cat_id,scope.row.attr_sel)"
                >编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini"  @click="open(scope.row.cat_id,scope.row.attr_id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <el-dialog :title="titles" :visible.sync="dxdialogVisible" width="50%" @clost="addcolse">
        <el-form :model="addForm" :rules="rules" ref="ruleForm" label-width="120px">
          <el-form-item :label="mingcheng" prop="attr_name">
            <el-input v-model="addForm.attr_name"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dxdialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="quedinglo">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="编辑" :visible.sync="bjdialogVisible" width="50%">
        <el-form label-width="100px" :model="bjname" :rules="rules" ref="bjrule">
          <el-form-item label="编辑参数" prop="attr_name">
            <el-input v-model="bjname.attr_name"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="bjdialogVisible=false">取 消</el-button>
          <el-button type="primary" @click="bjquedingxiugai">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import {
  goodsfeilei,
  canshu,
  tc,
  bjid,
  bjqd,
  canshushanchu,
  cxcs
} from "network/shouye/goodsviews/liebiao";
export default {
  name: "component_name",
  data() {
    return {
      canshu: {
        type: 3,
        pagenum: "",
        pagesize: ""
      },
      shuju: [],
      peizhi: {
        value: "cat_id",
        label: "cat_name",
        children: "children"
      },
      selectid: [],
      //标签页
      activeName: "many",
      //动态参数
      dtcanshu: [],
      //静态参数
      jtcanshu: [],
      dxdialogVisible: false,
      addForm: {
        attr_name: ""
      },
      rules: {
        attr_name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      },
      //编辑
      bjdialogVisible: false,
      bjname: {
        attr_sel: "",
        attr_name: "",
        cat_id: "",
        attr_id: ""
      },
      inputVisible: false,
      inputValue: ""
    };
  },
  methods: {
    //封装首次数据
    getdata(data) {
      goodsfeilei(data).then(res => {
        const { data: res1 } = res;
        if (res1.meta.status != 200)
          return this.$message.error("请检查网络坏境");
        this.shuju = res1.data;
      });
    },
    handleChange() {
      if (this.selectid.length != 3) {
        this.selectid = [];
      }
      this.getdtjt(this.catid, "many");
    },
    handleClick(tab, event) {
      this.getdtjt(this.catid, this.activeName);
    },
    tjdx() {
      this.dxdialogVisible = true;
    },
    addcolse() {
      this.$refs.ruleForm.resetFields();
    },
    //封装
    getdtjt(id, djt) {
      canshu(id, djt).then(res => {
        const { data: res1 } = res;

        res1.data.forEach(item => {
          item.attr_vals = item.attr_vals ? item.attr_vals.split(" ") : [];
          //需要看一下
          item.inputVisible = false;
          item.inputValue = "";
        });

        if (res1.meta.status != 200) return this.$message.error("请求数据失败");
        if (djt == "many") {
          this.dtcanshu = res1.data;
        } else {
          this.jtcanshu = res1.data;
        }
      });
    },
    quedinglo() {
      this.$refs.ruleForm.validate(valid => {
        if (!valid) return this.$message.error("请添加参数");
        tc(this.catid, this.addForm.attr_name, this.activeName, "").then(
          res => {
            this.jcfz(res, 201, "添加失败", "添加成功");
            this.dxdialogVisible = false;
          }
        );
      });
      this.getdtjt(this.catid, this.activeName);
    },
    bjcsl(a, b, c, d) {
      this.bjdialogVisible = true;
      bjid(b, a, c).then(res => {
        const { data: res1 } = res;
        if (res1.meta.status != 200) return this.$message.error("获取数据失败");
        this.bjname = res1.data;
      });
    },
    bjquedingxiugai() {
      this.$refs.bjrule.validate(valid => {
        if (!valid) return this.$message.error("请按规则填写参数");
        bjqd(this.bjname).then(res => {
          this.jcfz(res, 200, "更新失败", "更新成功");
        });
      });
      this.getdtjt(this.catid, this.activeName);
      this.bjdialogVisible = false;
    },
    open(id, attr_id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          canshushanchu(id, attr_id).then(res => {
            this.jcfz(res, 200, "删除失败", "删除成功");
            this.getdtjt(this.catid, this.activeName);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    showInput(iinp) {
      iinp.inputVisible = true;
      //$nextTick 作用 当页面上的元素被重新渲染之后 才会指定回调函数中的代码
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm(iinp) {
      if (iinp.inputValue.trim().length === 0) {
        iinp.inputValue = "";
        iinp.inputVisible = false;
        return;
      }
      iinp.attr_vals.push(iinp.inputValue.trim());

      cxcs(
        iinp.cat_id,
        iinp.attr_id,
        iinp.attr_name,
        iinp.attr_sel,
        iinp.attr_vals.join(" ")
      );
      iinp.inputValue = "";
      iinp.inputVisible = false;
    },

    // 基础封装
    jcfz(res, codeshu, sb, cg) {
      const { data: res1 } = res;
      if (res1.meta.status != codeshu) return this.$message.error(`${sb}`);
      this.$message.success(`${cg}`);
    }
  },
  created() {
    this.getdata(this.canshu);
  },
  computed: {
    isBtn() {
      if (this.selectid.length != 3) {
        return true;
      } else {
        return false;
      }
    },
    catid() {
      if (this.selectid.length == 3) {
        return this.selectid[2];
      } else {
        return null;
      }
    },
    titles() {
      if (this.activeName == "many") {
        return "添加动态属性";
      } else {
        return "添加静态属性";
      }
    },
    mingcheng() {
      if (this.activeName == "many") {
        return "添加动态参数";
      } else {
        return "添加静态参数";
      }
    }
  }
};
</script>
<style lang="less" scoped>
.goodscanshu {
  .box-card {
    line-height: 0px;
    margin-top: 15px;
    text-align: left;
    .sb {
      margin: 20px 0;
    }
    .input-new-tag {
      width: 120px;
    }
  }
}
</style>