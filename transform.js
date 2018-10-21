'use strict';

function toTreeList(data) {
    // todo: 深度拷贝?
    var root;
    var nodes = {};
    data.forEach(function(x){
        nodes[x.id] = x;
        nodes[x.id].children = [];
    });
    
    data.forEach(function(x){
        if(x.parentId == "" ) {
            root = nodes[x.id];
            return;
        }
        nodes[x.parentId].children.push(nodes[x.id]);
    });
    return root;
}


function selectUsers(allUsers, rootNode){
    // 1.获取节点树下所有的部门id
    var orgs = {};
    var nodes = [rootNode];
    while(nodes.length> 0){
        var node = nodes.pop();
        if ( node.id in orgs ){ // 避免环
            continue;
        }else {
            orgs[node.id] = true;
            node.children.forEach(function(x){nodes.push(x);});
        }
    }
    // 2.返回在部门列表中的所有用户
    return allUsers.filter(function(x){
        return (x.orgId in orgs);
    });

}

//部门数据
var data = [{id:'1',parentId:"",label: '零级'},{id:'11',parentId:"1",label: '一级'},{id:'21',parentId:"1",label: '二级'},
{id:'111',parentId:"11",label: '一级1'},{id:'112',parentId:"11",label: '一级2'},{id:'211',parentId:"21",label: '二级1'}];
//公司人员控件
var allUsers = [{id:'s1',orgId:"11",realName: '张三'},{id:'211',orgId:"21",realName: '张三'}];

var tree = toTreeList(data);
console.log("tree:",tree);

console.log("root:",selectUsers(allUsers, tree));
console.log("child1:",selectUsers(allUsers, tree.children[0]));