<template>
<div class="">
    <div  >
          <el-input readonly v-model="selectItems"></el-input>
       <a id="nav-toggle" href="#" @click="showSelectWin()"><span></span></a>
          <!--<div class="select-cnt">{{selectItems}}</div>-->
    </div>
    <el-dialog v-bind:title="title" :visible.sync="showWin" >
   <div class="dp-cnt">
          <div  class="mb20" style="width:60%;"><el-input
                  placeholder="输入关键字进行过滤"
                  v-model="filterText">
                </el-input></div>
            <div class="tree-left">
               
                <div class="tree-block">
                  
                  <el-tree   class="filter-tree"  default-expand-all ref='orgTree' :data="orgData"
                   :props="defaultProps" @node-click="nodeclicked"
                   :filter-node-method="filterNode"></el-tree>
                </div>

            </div>
             <div class="select-right ">
            <ul>
                <li v-for="(item, index) in waitSelectData" v-bind:key="index+''" 
                  @click="selectData(item)">{{item[defaultProps.selectLabel]}}</li>
            </ul>
            </div>
            <div class="select-oper ">
              <div style="margin-top:180px;"><el-button @click="selectAll()" >全选</el-button></div>
               <div class="mt20"><el-button @click="removeAll()" >清空</el-button></div>
              
           
            </div>
            <div class="select-right">
            <ul>
                <li v-for="(item, index) in selectedData" v-bind:key="index+''" 
                  @click="deleteItems(index)">{{item[defaultProps.selectLabel]}}</li>
            </ul>
            </div>
    </div>
  <div slot="footer" class="dialog-footer">
    <el-button @click="hideSelectWin()">取 消</el-button>
    <el-button type="primary" @click="confirmData()">确 定</el-button>
  </div>
</el-dialog>
</div>
   
</template>

<script  type="es6">
export default {
  props: {
    //是否只选择叶子节点，默认是 ture
    title: {
      type: String,
      default: "选人"
    },

    //是否多选，默认是多选
    isMultiSelect: {
      type: Boolean,
      default: false
    },
    //tree 默认属性，字段名定制
    defaultProps: {
      type: Object,
      default: function() {
        return {
          children: "children",
          label: "CNFullName",
          selectLabel: "RealName"
        };
      }
    },
    //渲染树的节点，默认部门数据
    orgData: {
      type: Array
    },
     userData: {
      type: Array
    }
  },
  data() {
    return {
      filterText: "",
      showWin: false,
      searchword: "",
      waitSelectData: [],
      selectedData: []
    };
  },
  methods: {
     filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
    nodeclicked( rootNode, v) {
      // 1.获取节点树下所有的部门id
      debugger;
      console.log("sssssssssssssss");
          console.log(rootNode);
      var orgs = {};
      var nodes = [rootNode];
      while (nodes.length > 0) {
        var node = nodes.pop();
        if (node.Id in orgs) {
          // 避免环
          continue;
        } else {
          orgs[node.Id] = true;
          node.children.forEach(function(x) {
            nodes.push(x);
          });
        }
      }
      console.log("orgs",orgs);
      // 2.返回在部门列表中的所有用户
      this.waitSelectData =  this.userData.filter(function(x) {
        return x.OrgID in orgs;
      });
      console.log("orgs",this.waitSelectData);
    },
    selectData(data) {
      if (this.isMultiSelect) {
        //去重
        var exist = this.selectedData.some(function(it) {
          return it.Id == data.Id;
        });
        if (!exist) {
          this.selectedData.push(data);
        }
      } else {
        this.selectedData = [data];
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
    },
    removeAll() {
      this.selectedData = [];
    },
    selectAll() {
      if (this.isMultiSelect) {
        for (var i = 0; i < this.waitSelectData.length; i++) {
          var exist = this.selectedData.some(it => {
            return it.Id == this.waitSelectData[i].Id;
          });
          if (!exist) {
            this.selectedData.push(this.waitSelectData[i]);
          }
        }
      }
    }
  },
  computed: {
    selectItems() {
      var arr = [];
      this.selectedData.forEach(ele => {
        arr.push(ele[this.defaultProps.selectLabel]);
      });
      return arr.join(",");
    }
  },
  mounted() {
    /**/
  }
};
</script>

<style>

.dp-cnt {
  width: 100%;
   width: 960px;
  height: 530px;
}
.tree-left,
.select-right {
  float: left;
  height: 480px;
  overflow: auto;
  border: 1px solid #ddd;
  border-radius: 3px;
}
.select-oper {
  float: left;
  width: 80px;
  padding-left: 10px;
}
.tree-left {
  width: 380px;
  margin-right: 20px;
}
.select-right {
  width: 220px;
}
.select-right ul {
  padding: 10px 10px 0 10px;
}
.select-right ul li {
  border-bottom: 1px dashed #ccc;
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
.select-cnt {
  position: absolute;
  left: 5px;
  top: 10px;
  /* width: 200px; */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  right: 45px;
}
.el-dialog{
  width:990px!important;
}
</style>