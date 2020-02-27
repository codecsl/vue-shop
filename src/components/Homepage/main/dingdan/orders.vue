<template>
<div class="dingdan">
<el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item><a href="/">订单管理</a></el-breadcrumb-item>
  <el-breadcrumb-item>订单列表</el-breadcrumb-item>
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
      </el-row>

      <el-table :data="shuju" stripe style="width: 100%">
        <el-table-column label="id" type="index"></el-table-column>
        <el-table-column prop="order_number" label="订单编号" width="180"></el-table-column>
        <el-table-column prop="order_price" label="订单价格"></el-table-column>
        <el-table-column prop="order_pay" label="是否付款">
            <template slot-scope="scope">
                <el-tag type="danger" v-if="scope.row.pay_status==0">未付款</el-tag>
                <el-tag type="success" v-else>已付款</el-tag>
            </template>
        </el-table-column>
          <el-table-column prop="is_send" label="是否发货"></el-table-column>
            
        <el-table-column label="下单时间">
          <template slot-scope="scope">{{timestampToTime(scope.row.create_time)}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="bij"></el-button>
            <el-button type="success" icon="el-icon-location
" size="mini" @click="addressinfo(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>

       <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="canshu.pagenum"
        :page-sizes="[1, 3, 5, 7]"
        :page-size="canshu.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>

       <el-dialog title="修改地址" :visible.sync="bjdialogVisible" width="50%" @close="guanbi">
        <el-form label-width="100px" :model="bjname" :rules="rules" ref="bjrule">
          <el-form-item label="省市区/县" prop="address1">
             <el-cascader
    v-model="bjname.address1"
    :options="citydata"
    :props="{ expandTrigger: 'hover' }"
    @change="handleChange"></el-cascader>
             
          </el-form-item>
          <el-form-item label="详细地址" prop="address2">
            <el-input v-model="bjname.address2"></el-input>
             
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="bjdialogVisible=false">取 消</el-button>
          <el-button type="primary" @click="qd">确 定</el-button>
        </span>
      </el-dialog>


      
       <el-dialog title="物流进度" :visible.sync="zsdialogVisible" width="70%" >
         <el-timeline>
        <el-timeline-item
      v-for="(item, index) in wuliu"
      :key="index"
      :icon="icon"
      :type="type"
      :color="hcolor"
      :size="size"
     
      >
       {{item.time}}
      {{item.context}}
     
    </el-timeline-item>
  </el-timeline>
      </el-dialog>
</el-card>
</div>
</template>
<script>
import {dingdan,wuliu} from 'network/shouye/dingdan/dingdan'
import citydata from "@/sc/citydata.js"
export default {
  name: "component_name",
  data () {
    return {
        canshu:{
            query:"",
            pagenum:1,
            pagesize:7
        },
        shuju:[],
        input3:"",
        total:1,
        bjdialogVisible:false,
         rules: {
        address1: [
          { required: true, message: "请输入选择省市/区", trigger: "blur" },
          { min: 2, max: 50, message: "长度在 2 到 50 个字符", trigger: "blur" }
        ],
        address2: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
          { min: 2, max: 50, message: "长度在 2 到 50 个字符", trigger: "blur" }
        ]
      },
      bjname:{
address1:[],
address2:""
      },
      selectid:[],
      citydata,
      zsdialogVisible:false,
      wuliu:[],
      size: 'normal',
      type: 'primary',
      icon: 'el-icon-more',
      hcolor:'#0bbd87'
    };
  },
  methods: {
      handleSizeChange(a){
this.canshu.pagesize=a
this.jcfz(this.canshu)
      },
      handleCurrentChange(b){
this.canshu.pagenum=b
this.jcfz(this.canshu)
      },
      //基础封装
      jcfz(data){
          dingdan(data).then(res=>{
          this.xt(res,200,"获取数据失败")
           const {data:res1}=res
           this.shuju=res1.data.goods
           this.total=res1.data.total
           console.log(res1)
          })
      },
      search(){
    this.canshu.query=this.input3
      this.jcfz(this.canshu)
      },
      bij(){
        this.bjdialogVisible=true
      },
      qd(){

      },
      gaibian(){

      },
      handleChange(){

      },
      guanbi(){
       this.$refs.bjrule.resetFields()
      },
      addressinfo(e){
          this.zsdialogVisible=true
        wuliu(e.order_id).then(res=>{
           const {data:res1}=res
           if(res1.meta.status!=200) return this.$message.error("获取数据失败")
         this.wuliu=res1.data
         console.log(this.wuliu)
         
        })
      },
      //消息提示
      xt(res,codeshu,sb){
        const {data:res1}=res
        if(res1.meta.status!=codeshu) return this.$message.error(`${sb}`)
      },

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
      this.jcfz(this.canshu)
      
  },
}
</script>
<style lang="less" scoped>
.dingdan{
.box-card{
   line-height:0px;
   margin-top:15px;
   text-align:left;
.el-cascader{
    width:100%;
}
}
}

</style>