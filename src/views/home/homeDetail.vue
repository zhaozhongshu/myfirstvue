<template>
 <div class="mt20">
     <h2 clas="text-center  mb20">新增活动</h2>
 <el-form :model="ruleForm" :rules="rules" ref="myform" label-width="120px" class="demo-ruleForm mt20">
  <el-form-item label="活动名称" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="活动区域" prop="region">
    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="选择部门" prop="depart">
    <department-select :is-multi-select="false"  title="选择部门" v-model="ruleForm.depart"
        :data = "orgnData"  validate-on-rule-change="false"           v-on:getSelectedData="getSelectedData"></department-select>
  </el-form-item>
  <el-form-item label="活动时间" required>
    <el-col :span="11">
      <el-form-item prop="date1">
        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
      </el-form-item>
    </el-col>
    <el-col class="line text-center" :span="2"> -</el-col>
    <el-col :span="11">
      <el-form-item prop="date2">
        <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
      </el-form-item>
    </el-col>
  </el-form-item>
  <el-form-item label="即时配送" prop="delivery">
    <el-switch v-model="ruleForm.delivery"></el-switch>
  </el-form-item>
  <el-form-item label="活动性质" prop="type">
    <el-checkbox-group v-model="ruleForm.type">
      <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
      <el-checkbox label="地推活动" name="type"></el-checkbox>
      <el-checkbox label="线下主题活动" name="type"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
  <el-form-item label="特殊资源" prop="resource">
    <el-radio-group v-model="ruleForm.resource">
      <el-radio label="线上品牌商赞助"></el-radio>
      <el-radio label="线下场地免费"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="活动形式" prop="desc">
    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
 </div>
   
</template>
<script>
import departmentSelect from "@/components/base/departmentSelect";
import Utils from "@/utils/common.js"
export default {
        components: {
            departmentSelect,
             Utils
        },
 data() {
      return {
        orgnData:[],
        ruleForm: {
          name: '',
          region: '',
          depart:[],
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
          
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          depart:[ { required: true, message: '请选择部门', trigger: 'change' }],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
       getOrgnData(){
        this.axios.get("/api/getOrgn").then(res => {

         this.orgnData =   Utils.toTreeList(res.data);
        
       });
    },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
       getSelectedData(data){
        
          this.ruleForm.depart = data;
        this.$refs.myform.validateField('depart');
         // this.$refs['myform'].validate('depart');
          
           console.log(this.ruleForm.depart)

        }
    },
    mounted() {
       $("#nav").hide();
       this.getOrgnData();
    // this.initFunc();
  }
  
};
</script>

<style lang="scss" scoped>
h2{
    font-size:18px;
    margin-bottom:20px;
}
.demo-ruleForm{
    width:600px;
    margin:0 auto;
  
}
</style>




