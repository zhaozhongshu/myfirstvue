<template>
<div >
  <div class="query-con mt30 mb20">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="query-bar">
          <label class="query-label">姓名:</label><el-input v-model="name" class="query-input" ></el-input>
        </div>
      </el-col>
      <el-col :span="8"> <div class="query-bar">
          <label class="query-label">日期:</label>
          <el-date-picker  class="query-input" 
          v-model="date"
          align="right"
          type="date"
          placeholder="选择日期"
          >
        </el-date-picker>
        </div>
      </el-col>

  </el-row>
   <div class="  text-right pr10">  <el-button type="primary"  @click="queryDate()"> 查询</el-button></div>
  </div>

<el-table 
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="date"
      label="日期"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      label="性别"
      width="120">
      <template slot-scope="scope">
      <span>{{ scope.row.sex|sexFilter}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="province"
      label="省份"
      width="120">
    </el-table-column>
    <el-table-column
      prop="city"
      label="市区"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      width="300">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="邮编"
      width="120">
    </el-table-column>
   <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)"> 编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination  class="mt20 pull-right"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="[10, 15, 20, 30]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
</div>
  
</template>

<script>
export default {
  data() {
    return {
      name:"",
      date:"",
      tableData:[]
    };
  },
  methods: {
    handleEdit(index, row) {
      window.open("/newWinHome/" + row.id, "_blank");
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
    mounted() {
    this.axios.get('/home/getList').then((res) => {
      this.tableData = res.data;
       console.log(res)
    });
     /*this.axios.get('/api/getUserInfo').then((res) => {
       this.$store.state.logUseInfo = res.data;
        console.log( this.$store.state.logUseInfo);
       // commit('setLogUseInfo', res.data);
      })*/
    this.$store.dispatch('initLogUserInfo');
  }
};
</script>

<style>
th div {
  text-align: center;
}
.el-main {
  padding: 30px;
}
</style>
