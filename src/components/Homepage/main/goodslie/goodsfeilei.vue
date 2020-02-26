<template>
  <div class="goodsfeilei">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="this.$rote.path">商品管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card goodsa">
      <el-button type="primary" class="addfeilei" @click="dakai">添加分类</el-button>
      <tree-table
        :data="goodsinfodata"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        show-index
        border
        class="treetable"
      >
        <template slot="likes" slot-scope="scope">
          <i class="el-icon-success" v-if="scope.row.cat_deleted=true" style="color:lightgreen"></i>
          <i class="el-icon-error" v-else style="color:red"></i>
        </template>

        <template slot="level" slot-scope="scope">
          <el-tag v-if="scope.row.cat_level===0">一级</el-tag>
          <el-tag type="success" v-else-if="scope.row.cat_level===1">二级</el-tag>
          <el-tag type="warning" v-else>三级</el-tag>
        </template>

        <template slot="caozuo" slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click="bianji(scope.row.cat_id)" size="mini">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="open(scope.row.cat_id)" size="mini">删除</el-button>
        </template>
      </tree-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[1, 3, 5, 7]"
        :page-size="morencan.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>

      <!-- 添加分类 -->
      <el-dialog title="添加分类" :visible.sync="addialogVisible" width="50%">
        <el-form :model="addcatform" :rules="rules" ref="ruleForm" label-width="100px">
          <el-form-item label="分类名称" prop="cat_name">
            <el-input v-model="addcatform.cat_name"></el-input>
          </el-form-item>
          <el-form-item label="父级分类">
            <!-- <el-input v-model="addcatform.cat_name"></el-input> -->
            <el-cascader
              v-model="selectid"
              :options="fuji"
              :props="casdprop"
              clearable
              @change="gaibian"
            ></el-cascader>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="quxiaoa">取 消</el-button>
          <el-button type="primary" @click="queding">确 定</el-button>
        </span>
      </el-dialog>


       <el-dialog title="编辑r" :visible.sync="bidialogVisible" width="50%">
        <el-form :model="morenming"  label-width="100px" :rules="rules" ref="rulel">
          <el-form-item label="修改分类" prop="cat_name">
            <el-input v-model="morenming.cat_name"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="bidialogVisible=false">取 消</el-button>
          <el-button type="primary" @click="quedingxiugai">确 定</el-button>
        </span>
       </el-dialog>
    </el-card>
  </div>
</template>
<script>
import { goodsfeilei, tianjiafeilei ,xiugaifeilei,quedingxiugail,shanchu} from "network/shouye/goodsviews/liebiao";
export default {
  name: "component_name",
  data() {
    return {
      //默认初始数据请求参数
      morencan: {
        type: "",
        pagenum: 1,
        pagesize: 5
      },
      goodsinfodata: [],
      //总页数
      total: 0,
      //当前页数
      currentPage4: 1,
      //默认关闭
      addialogVisible: false,
      rules: {
        cat_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" }
        ]
      },
      //添加分类
      addcatform: {
        cat_name: "",
        cat_level: 0,
        cat_pid: 0
      },
      //父级分类
      fuji: [],
      selectid: [],
      casdprop: {
        value: "cat_id",
        label: "cat_name",
        children: "children"
      },
      //编辑
      bidialogVisible:false,
      morenming:{},
      columns: [
        {
          label: "分类名称",
          prop: "cat_name",
          width: 300
        },
        {
          label: "是否有效",
          type: "template",
          //表示当前列使用模板
          template: "likes",
          width: 200
        },
        {
          label: "等级",
          type: "template",
          //表示当前列使用模板
          template: "level",
          width: 200
        },
        {
          label: "操作",
          type: "template",
          //表示当前列使用模板
          template: "caozuo"
        }
      ]
    };
  },
  methods: {
    handleSizeChange(el) {
      this.morencan.pagesize = el;
      this.getgoods(this.morencan);
    },
    handleCurrentChange(el) {
      this.morencan.pagenum = el;
      this.getgoods(this.morencan);
    },
    dakai() {
      this.addialogVisible = true;
      goodsfeilei({ type: 2, pagenum: "", pagesize: "" }).then(res => {
        const { data: res1 } = res;
        if (res1.meta.status != 200) return this.$message.error("数据请求失败");
        this.fuji = res1.data;
      });
    },
    queding() {
      this.$refs.ruleForm.validate(res => {
        if (!res) return this.$message.error("请输入完相应信息");

        tianjiafeilei(this.addcatform).then(res=>{
           const {data:res1}=res
           if(res1.meta.status!==201) return this.$message.error("添加失败")
            this.$message.success("添加成功")
        }); //正式添加
           this.getgoods(this.morencan); //再次请求数据刷新
        this.addialogVisible = false;
     
      });
    },
    quxiaoa() {
      this.$refs.ruleForm.resetFields(); //重置
      this.addialogVisible = false;
    },
    gaibian() {
      //父级id改变时
      //大于0时表示 父级发生了改变  此时就不处于一级分类了
      if (this.selectid.length > 0) {
        this.addcatform.cat_pid = this.selectid[this.selectid.length - 1];
        this.addcatform.cat_level =this.selectid.length;
        console.log(this.addcatform)
      } else {
        this.addcatform.cat_pid = 0;
        this.addcatform.cat_level = 0;
      }
      
    },
    //编辑部分u
    bianji(el){
        this.bidialogVisible=true
     xiugaifeilei(el).then(res=>{
         const {data:res1}=res
         if(res1.meta.status!=200) return this.$message.error("获取数据失败")
         this.morenming=res1.data

     })
    },
    quedingxiugai(){
     this.$refs.rulel.validate(res=>{
         if(!res) return this.$message.error("请将信息填写完整")
         quedingxiugail(this.morenming.cat_id,this.morenming.cat_name).then(resu=>{
             const {data:res1}=resu
             if(res1.meta.status!=200) return this.$message.error("请检查网络环境")
             this.$message.success("修改成功")
         })
         this.getgoods(this.morencan)
         this.bidialogVisible=false
    })


    },
     //删除逻辑
     open(id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            shanchu(id).then(res=>{
                const {data:res1}=res
                if(res1.meta.status!=200) return this.$message.error("删除失败")
           this.$message({
            type: 'success',
            message: '删除成功!'
          }); 
          this.getgoods(this.morencan)
        })
           
         
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
         
      },

    //封装
    getgoods(data) {
      goodsfeilei(data).then(res => {
        const { data: res1 } = res;
        this.total = res1.data.total;
        if (res1.meta.status != 200) return this.$message.error("获取数据失败");
        this.goodsinfodata = res1.data.result;
      });
    },
    //默认判读
//   mora(res){
//       const { data: res1 } = `${res}`;
//         if (res1.meta.status != 200) return this.$message.error("获取数据失败");
//   }
  },
  
  created() {
    this.getgoods(this.morencan);
  }
};
</script>
<style lang="less" scoped>
.goodsfeilei {
  .box-card {
    line-height: 0px;
    text-align: left;
    margin-top: 15px;
    .treetable {
      margin-top: 15px;
    }
    .el-cascader {
      width: 100%;
    }
  }
}
</style>