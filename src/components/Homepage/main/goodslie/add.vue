<template>
  <div class="add">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="this.$rote.path">商品管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-alert title="添加商品信息" type="info" show-icon center class="hc"></el-alert>

      <el-steps :active="currentactive" align-center class="steps">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
<el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleFor"
            label-width="100px"
            class="demo-ruleForm"
          >
      <el-tabs
        :tab-position="tabPosition"
        style="height: 100%;"
        class="tabs"
        v-model="nam"
        @tab-click="current"
        :before-leave="qiehuan"
      >
        <el-tab-pane label="基本信息">
          
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="ruleForm.goods_name"></el-input>
            </el-form-item>

            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="ruleForm.goods_price" type="number"></el-input>
            </el-form-item>

            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="ruleForm.goods_weight" type="number"></el-input>
            </el-form-item>

            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="ruleForm.goods_number" type="number"></el-input>
            </el-form-item>

            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                v-model="ruleForm.goods_cat"
                :options="shuju"
                :props="peizhi "
                @change="handleChange"
                expandTrigger="hover"
              ></el-cascader>
            </el-form-item>
         
        </el-tab-pane>
        <el-tab-pane label="商品参数">
          <div v-for="item in dtcanshu" :key="item.attr_id">
            <span>{{item.attr_name}}</span>
            <br />
            <el-checkbox-group v-model="item.attr_vals" size="small">
              <el-checkbox :label="item1" border v-for="(item1,index) in item.attr_vals" :key="index"></el-checkbox>
             
            </el-checkbox-group>
          </div>
        </el-tab-pane>
        <el-tab-pane label="商品属性">
           <el-form
            :model="ruleForm"
          >
            <el-form-item :label="item.attr_name" prop="goods_name" v-for="(item,i) in jtcanshu" :key="i">
              <el-input v-model="item.attr_vals" ></el-input>
            </el-form-item>
            </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品图片">
            
          <el-upload
  class="upload-demo"
  action="http://127.0.0.1:8888/api/private/v1/upload"
  :on-preview="handlePreview"
  list-type="picture"
  :headers="headerobj"
  :on-success="succ"
  :on-remove="remove"
  >
   <el-button size="small" type="primary">点击上传</el-button>
</el-upload>
<el-dialog
  :visible.sync="predialogVisible"
  width="50%"
  >
  <img :src="preview"></img>
</el-dialog>
        </el-tab-pane>
        <el-tab-pane label="商品内容">
              <quill-editor v-model="ruleForm.goods_introduce" style="height:300px;"
            >
         </quill-editor>

    <el-button type="primary" @click="add" style="margin-top:100px;">添加商品</el-button>
        </el-tab-pane>
         
      </el-tabs>
 </el-form>
    </el-card>
  </div>
</template>
<script>
import _ from "lodash"
import { goodsfeilei, canshu,tij} from "network/shouye/goodsviews/liebiao";
export default {
  name: "component_name",
  data() {
    return {
      canshu: {
        type: 3,
        pagenum: "",
        pagesize: ""
      },
      tabPosition: "left",
      ruleForm: {
        goods_name: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_cat: [],
         pics:[],
         goods_introduce:"",
         attrs:[]
      },
      shuju: [],
      nam: "",
      currentactive: 1,
      rules: {
        goods_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2到 10 个字符", trigger: "blur" }
        ],
        goods_price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1到 10 个字符", trigger: "blur" }
        ],
        goods_weight: [
          { required: true, message: "请输入商品重量", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1到 10 个字符", trigger: "blur" }
        ],
        goods_number: [
          { required: true, message: "请输入商品数量", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1到 10 个字符", trigger: "blur" }
        ],
        goods_cat: [
          { required: true, message: "请选择商品分类", trigger: "blur" }
        ]
      },
      peizhi: {
        value: "cat_id",
        label: "cat_name",
        children: "children"
      },
      dtcanshu: [],
      checkboxGroup1:[],
      jtcanshu:[],
      headerobj:{
          Authorization:window.sessionStorage.getItem("token")
      },
     preview:"",
     predialogVisible:false
    };
  },
  methods: {
    getdata(data) {
      goodsfeilei(data).then(res => {
        const { data: res1 } = res;
        if (res1.meta.status != 200)
          return this.$message.error("请检查网络坏境");
        this.shuju = res1.data;
      });
    },
    current(num) {
      this.currentactive = Number(this.nam) + 1;
      if(num.index==2){
          this.getdtjt(this.catid,"only")
      }
    },
    handleChange() {
      if (this.ruleForm.goods_cat.length != 3) {
        this.ruleForm.goods_cat = [];
      }
      this.getdtjt(this.catid, "many");
    },
    qiehuan(a, b) {
      if (b === "0" && this.ruleForm.goods_cat.length != 3) {
        this.$message.error("请先选择商品分类");
        return false;
      }
    },
    getdtjt(id, dj) {
      canshu(id, dj).then(res => {
        const { data: res1 } = res;

        res1.data.forEach(item => {
          item.attr_vals =item.attr_vals ? item.attr_vals.split(" ") :[];
        //   item.checked1 = true;
        });
        if(dj=="many"){
        this.dtcanshu = res1.data;
        }else{
        res1.data.forEach(item=>{
             item.attr_vals =item.attr_vals.join(" ")
        })
      this.jtcanshu=res1.data
        }
      });
    },
    //预览
handlePreview(file){
this.preview=file.response.data.url
this.predialogVisible=true
},
succ(resop){
    const picinfo={
        pic:resop.tmp_path
    }
this.ruleForm.pics.push(picinfo)
},
remove(res){
 const filepath=res.response.data.temp_path
let i=this.ruleForm.pics.findIndex(item=>{
   return item.pic==filepath
 })
 this.ruleForm.pics.splice(i,1)
},
add(){
this.$refs.ruleFor.validate(va=>{
    if(!va) return this.$message.error("请填写必要的表单项")
    //深拷贝  包lodash
let form=_.cloneDeep(this.ruleForm)
form.goods_cat=form.goods_cat.join(",")

this.dtcanshu.forEach(item=>{
   const newinfo={
       attr_id:item.attr_id,
       attr_value:item.attr_vals.join(" ")
   }
   form.attrs.push(newinfo)
})
this.jtcanshu.forEach(item=>{
    const jtinfo={
        attr_id:item.attr_id,
       attr_value:item.attr_vals
    }
    form.attrs.push(jtinfo)
})

tij(form).then(res=>{
   const {data:res1}=res
   if(res1.meta.status!=201) return this.$message.error("添加失败")
   this.$router.push("/goods")
})
})
}

  },
  created() {
    this.getdata(this.canshu);
  },
  computed: {
    catid() {
      if (this.ruleForm.goods_cat.length == 3) {
        return this.ruleForm.goods_cat[2];
      } else {
        return null;
      }
    },
    attrname() {},
    
  }
};
</script>
<style lang="less" scoped>
.add {
  .box-card {
    //
    text-align: left;
    margin-top: 15px;
    .hc {
      line-height: 0px;
    }
    .steps {
      margin-top: 15px;
      line-height: 0px;
    }
    .tabs {
      margin-top: 10px;
      line-height: 30px;
      img{
          max-width:500px;
          
      }
    }
  }
}
</style>