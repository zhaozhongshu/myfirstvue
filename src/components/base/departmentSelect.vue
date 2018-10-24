<template>
<div class="org-select">
      <div  >
          <el-input readonly v-model="selectItems"></el-input>
       <a id="nav-toggle" href="#" @click="showSelectWin()"><span></span></a>
          <!--<div class="select-cnt">{{selectItems}}</div>-->
    </div>
<el-dialog v-bind:title="title" :visible.sync="showWin">
   <div class="dp-cnt">
          <div  class="mb20" style="width:60%;"><el-input
                  placeholder="输入关键字进行过滤"
                  v-model="filterText">
                </el-input></div>
            <div class="tree-left">
               
                <div class="tree-block">
                  
                  <el-tree   class="filter-tree"  default-expand-all ref='orgTree' :data="data"
                   :props="defaultProps" @node-click="nodeclicked"
                   :filter-node-method="filterNode"
                   :default-expanded-keys="expandNode"></el-tree>
                </div>

            </div>
            <div class="select-right">
            <ul>
                  <li v-for="(item, index) in selectedData" v-bind:key="index+''" 
                  @click="deleteItems(index)">{{item[defaultProps.label]}}</li>
            </ul>
            </div>
    </div>
  <div slot="footer" class="dialog-footer">
    <el-button  size="mini" @click="hideSelectWin()">取 消</el-button>
    <el-button  size="mini" type="primary" @click="confirmData()">确 定</el-button>
  </div>
</el-dialog>

   
</div>
   
</template>

<script  type="es6">
export default {

  props: {
    //标题
    title: {
      type: String,
      default: "部门"
    },
    disableTag:{
      type:String,
      default:"none"
    },
    //是否多选，默认是多选
    isMultiSelect: {
      type: Boolean,
      default: false
    },
    //tree 默认属性，字段名定制
     defaultProps: {
      type: Object,
      default:function() {
        return {
          children: 'children',
          label: 'CNFullName'
        }
      }
    },
    //渲染树的节点，默认部门数据
    data: {
      type: Array
      }
  },
  data() {
    return {
       filterText: '',
      showWin: false,
      searchword: "",
      expandNode:[],
      selectedData: [],
      orgnData:[]
     
      //treeData:[]
    };
  },
  methods: {
     filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      getFistLevelNode(){
        let that = this;
        that.data[0].children.forEach(function(item){
          that.expandNode.push(item.Id);
        });
         /*this.data[0].children.forEach((item) => {
          this.expandNode.push(item.Id);
        });*/

      },

    nodeclicked(node, v,z) {
     
      //根据传过来的属性，disable属性
     /* if (this. disableTag != "none" && this. disableTag == node.type) {
        return;
      }*/

      var tmpNode = {};
      for (var key in node) {
        if (key != "children" && key != "parent" && key != "selected") {
          tmpNode[key] = node[key];
        }
      }
      if (this.isMultiSelect) {
        //去重
        var exist = this.selectedData.some(function(it) {
          return it.Id == node.Id;
        });
        if (!exist) {
          this.selectedData.push(tmpNode);
        }
      } else {
        this.selectedData = [tmpNode];
      }
    },
    showSelectWin() {
      this.showWin = true;
      document.documentElement.style.overflowY = "hidden";
    },
    hideSelectWin() {
      this.showWin = false;
      document.documentElement.style.overflowY = "auto";
    },
    confirmData() {
     
      this.$emit("getSelectedData", this.selectedData);
      this.hideSelectWin();
    },
    deleteItems(index) {
      this.selectedData.splice(index, 1);
    }
  },
  computed: {
    selectItems() {
      var arr = [];
      this.selectedData.forEach(ele => {
        arr.push(ele[this.defaultProps.label]);
      });
      return arr.join(",");
    }
  },
   watch: {
      filterText(val) {
        this.$refs.orgTree.filter(val);
      }
    },
  /*updated(){
    this.getFistLevelNode();
   
  },*/
  //mounted
};
</script>

<style>
.dp-wrap1 {
  width: 700px;
  padding: 20px;
  background: #fff;
  height: 600px;
  position: fixed;
  z-index: 999;
  top: 50%;
  left: 50%;
  margin-top: -300px;
  margin-left: -350px;
}
.dp-cnt {
  width: 100%;
padding:0 10px;
  height: 480px;
}
.tree-left,
.select-right {
  float: left;
  height: 450px;
  overflow: auto;
  border: 1px solid #bbb;
}
.tree-left {
  width: 420px;
  margin-right: 20px;
}
.select-right {
  width: 260px;
}
.select-right ul {
  padding: 10px 10px 0 10px;
}
.select-right ul li {
  border-bottom: 1px dashed #ccc;
  cursor: pointer;
}
.mask {
  position: fixed;
  z-index: 1;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
}
.org-select .el-dialog{
  width:700px!important;
}
</style>