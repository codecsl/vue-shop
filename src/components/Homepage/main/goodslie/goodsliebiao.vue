<template>
  <div class="goodsliebiao">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="this.$rote.path">商品管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-row>
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="input3"
            class="input-with-select"
            @keyup.enter.native="search()"
          >
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="tjshangping">添加商品</el-button>
        </el-col>
      </el-row>

      <el-table :data="shuju" stripe style="width: 100%">
        <el-table-column label="id" type="index"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="500"></el-table-column>
        <el-table-column prop="goods_price" label="商品价格(元)"></el-table-column>
        <el-table-column prop="goods_number" label="商品数量"></el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">{{timestampToTime(scope.row.upd_time)}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="bj(scope.row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini"  @click="open(scope.row.goods_id)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="canshu.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>

      <el-dialog title="编辑" :visible.sync="bjdialogVisible" width="50%">
        <el-form label-width="100px" :model="bjname" :rules="rules" ref="bjrule">
          <el-form-item label="商品名称" prop="goods_name">
            <el-input v-model="bjname.goods_name"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="bjdialogVisible=false">取 消</el-button>
          <el-button type="primary" @click="qd">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import { goodslie,bjsp,bjtj,shanchulo} from "network/shouye/goodsviews/liebiao";
export default {
  name: "component_name",
  data() {
    return {
      canshu: {
        query: "",
        pagenum: 1,
        pagesize: 5
      },
      shuju: [],
      total: 0,
      input3: "",
      //编辑
      bjdialogVisible:false,
       rules: {
        goods_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 2, max: 50, message: "长度在 2 到 50 个字符", trigger: "blur" }
        ]
      },
      bjname:{
        // goods_name:""
      }
    };
  },
  methods: {
    search() {
      this.canshu.query = this.input3;
      this.zongshuju(this.canshu);
      if (this.input3 == "") return this.zongshuju(this.canshu);
    },
    tjshangping() {
      this.$router.push("/add");
    },
    bj(c){
      this.bjdialogVisible=true
      bjsp(c.goods_id).then(res=>{
       const {data:res1}=res
       if(res1.meta.status!=200) return this.$message.error("获取数据失败")
        this.bjname=res1.data
      })
    },
    qd(){
     console.log(this.bjname)
    bjtj(this.bjname).then(res=>{
      this.jcfz(res,200,"编辑失败","编辑成功")
    })
    this.bjdialogVisible=false
    this.zongshuju(this.canshu)

    },
     open(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
         shanchulo(id).then(res => {
            this.jcfz(res, 200, "删除失败", "删除成功");
            this.zongshuju(this.canshu)
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //总数据封装
    zongshuju(data) {
      goodslie(data).then(res => {
        const { data: res1 } = res;
        if (res1.meta.status != 200) return this.$message.error("数据请求失败");
        console.log(res1);
        this.shuju = res1.data.goods;
        this.total = res1.data.total;
      });
    },
    handleSizeChange(y) {
      this.canshu.pagesize = y;
      this.zongshuju(this.canshu);
    },
    handleCurrentChange(c) {
      this.canshu.pagenum = c;
      this.zongshuju(this.canshu);
    },
    //基础封装
    jcfz(res, codeshu, sb, cg) {
      const { data: res1 } = res;
      if (res1.meta.status != codeshu) return this.$message.error(`${sb}`);
      this.$message.success(`${cg}`);
    },
    //时间戳转换
    timestampToTime(timestamp) {
      var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    }
  },
  created() {
    this.zongshuju(this.canshu);
  }
};
</script>
<style lang="less" scoped>
.goodsliebiao {
  .box-card {
    line-height: 0px;
    text-align: center;
    margin-top: 15px;
  }
}
</style>