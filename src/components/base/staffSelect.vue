<template>
<div>
    <div style="position: relative;" ><input  readonly type="text"  class="form-control" >
       <a id="nav-toggle" href="#" @click="showSelectWin()"><span></span></a>
        <div class="select-cnt">{{selectItems}}</div>
    </div>
    <div class="dp-wrap" v-if="showWin">
        <div class="text-bold">{{title}}</div>
        <div class="dp-cnt">
            <div class="tree-left">
                <div class="tree-block">

                    <v-tree ref='tree1'  :data='treeData'
                             @node-click='nodeclicked'
                           />
                </div>

            </div>
            <div class="select-right ">
            <ul>
                <li v-for="item in waitSelectData"  @click="selectData(item)">{{item.name}}</li>
            </ul>
            </div>
            <div class="select-oper ">
              <div style="margin-top:180px;"><button @click="selectAll()"  class="btn btn-default">全选</button></div>
               <div class="mt20"><button @click="removeAll()" class="btn btn-default">清空</button></div>
              
           
            </div>
            <div class="select-right">
            <ul>
                <li  v-for="(item, index) in selectedData"  @click="deleteItems(index)">{{item.name}}</li>
            </ul>
            </div>
        </div>

        <div class="text-right mt10">
            <button class="btn btn-default " @click="hideSelectWin()">取消</button>
             <button class="btn btn-primary ml20" @click="confirmData()">确认</button>
        </div>



    </div>
    <div v-if="showWin" class="mask" > </div>
</div>
   
</template>

<script  type="es6">
export default {
  props: {
    //是否只选择叶子节点，默认是 ture
    title:{
      type: String,
      default: '选人'
    },
    clickType: {
      type: String,
      default: 'all'
    },
    //是否多选，默认是多选
    isMultiSelect: {
      type: Boolean,
      default: true
    },
    //渲染树的节点，默认部门数据
    treeData: {
      type: Array,
      default: function() {
        return [
          {
            name: "node1",
            id: "0",
            expanded: true,
            children: [
              {
                name: "node 1-1",
                id: "1",
                children: [
                  {
                    name: "node 1-1-1",
                    id: "11"
                  },
                  {
                    name: "node 1-1-2",
                      id: "12"
                  },
                  {
                    name: "node 1-1-3",
                      id: "13"
                  }
                ]
              },
              {
                name: "node 1-2",
                id: "2",
                children: [
                  {
                    name: "node 1-2-1",
                    id: "21"
                  },
                  {
                    name: "node 1-2-2",
                    id: "22"
                  }
                ]
              }
            ]
          }
        ];
      }
    }
  },
  data() {
    return {
      showWin: false,
      searchword: "",
       waitSelectData: [],
      selectedData: [],
      //treeData:[]
    };
  },
  methods: {
    nodeclicked(node, v) {
       var walk = function(node, fn) {
      var children = node["children"];
      if (!children|| children.length == 0) {
          fn(node);
          return;
      }
      for (var i = 0; i < children.length; i++) {
          walk(children[i], fn);
      }
  }
    var handler = (obj)=> {
                   //去重
                  var exist = this.waitSelectData.some(function (it) {
                      return it.id == obj.id;
                  });
                  if (exist) {
                      return;
                  }
                  var tmpNode = {}
                  for (var key in obj) {
                      if (key != 'children' && key != 'parent' && key != 'selected') {
                          tmpNode[key] = obj[key]
                      }
                  }
                  this.waitSelectData.push(tmpNode);
              }

      //当前选中节点 与 定制的可选节点不匹配，则返回
      if(this.clickType !='all' && this.clickType != node.type){
        return;
      }
     
     walk(node, handler);

  },
    selectData(data){
      if (this.isMultiSelect) {
          //去重
              var exist = this.selectedData.some(function (it) {
                      return it.id == data.id;
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
       this.$emit('getSelectedData',this.selectedData);
       this.hideSelectWin();
    },
    deleteItems(index){
      this.selectedData.splice(index,1);
    },
    removeAll(){
      this.selectedData = [];
    },
    selectAll(){
       if (this.isMultiSelect) {
              for(var i=0;i<this.waitSelectData.length;i++){
                var exist = this.selectedData.some( (it) => {
                      return it.id == this.waitSelectData[i].id;
                  });
                  if (!exist) {
                     this.selectedData.push(this.waitSelectData[i]);
                  }
              }
             
      }
    }
          
  },
   computed:{
        selectItems(){
          var arr= [];
          this.selectedData.forEach(ele => {
            arr.push(ele.name);
          });
           return arr.join(',');
        }
     },
  mounted() {
    /**/
  }
};
</script>

<style>
.dp-wrap {
  width: 960px;
  padding: 20px;
  background: #fff;
  height: 600px;
  position: fixed;
  z-index: 999;
  top: 50%;
  left: 50%;
  margin-top: -300px;
  margin-left: -480px;
}
.dp-cnt {
  width: 100%;
  margin-top: 20px;
  height: 480px;
}
.tree-left,
.select-right {
  float: left;
  height: 480px;
  overflow: auto;
  border: 1px solid #bbb;
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
    .select-cnt{
        position: absolute;
        left: 5px;
        top: 10px;
        /* width: 200px; */
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        right: 45px;
    }
</style>