// 引入mockjs
//引入mockjs
const Mock = require('mockjs')


Mock.setup({
  timeout: 300, // 设置延迟响应，模拟向后端请求数据
});

const data = [{
    id: "123",
    date: "2016-05-03",
    name: "王小虎",
    province: "上海",
    city: "普陀区",
    address: "上海市普陀区金沙江路 1518 弄",
    zip: 200333,
    sex: 0
  },
  {
    date: "2016-05-02",
    name: "王小虎",
    province: "上海",
    city: "普陀区",
    address: "上海市普陀区金沙江路 1518 弄",
    zip: 200333,
    sex: 1
  },
  {
    date: "2016-05-04",
    name: "王小虎",
    province: "上海",
    city: "普陀区",
    address: "上海市普陀区金沙江路 1518 弄",
    zip: 200333,
    sex: 0
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    province: "上海",
    city: "普陀区",
    address: "上海市普陀区金沙江路 1518 弄",
    zip: 200333,
    sex: 1
  }
];
const userInfo = {
  userName: "张三",
  logName: "zhangsan",
  部门: "研发"
};
const menu = [{
  id: 1,
  name: "我的工作台",
  url:'/home',
}, {
  id: 2,
  name: "处理中心",
  url:"",
  children: [{
    id: 21,
    name: "一区",
    url:"/about",
  }, {
    id: 22,
    name: "二区",
    url:"",
    children: [{
      id: 221,
      name: "二区-1",
      url:'',
    }, {
      id: 222,
      name: "二区-2",
      url:'',
    }]
  }]
}];

const orgData = [{Id:'1',ParentID:"",CNFullName: '公司'},{Id:'11',ParentID:"1",CNFullName: '部门一'},{Id:'21',ParentID:"1",CNFullName: '部门二'},
{Id:'111',ParentID:"11",CNFullName: '部门一1'},{Id:'112',ParentID:"11",CNFullName: '部门一2'},
{Id:'211',ParentID:"21",CNFullName: '部门二1'},{Id:'2111',ParentID:"211",CNFullName: '部门二11'}];
const userData = [{Id:'1',OrgID:"11",LoginName: 'zhangsan',RealName: '张三'},{Id:'2',OrgID:"111",LoginName: 'zhangsan1',RealName: '张三1'},
{Id:'3',OrgID:"2111",LoginName: 'zhangsan',RealName: '张三3'},{Id:'4',OrgID:"2111",LoginName: 'zhangsan4',RealName: '张三4'}];
// Mock.mock( url, post/get , 返回的数据)； 
Mock.mock('/home/getList', 'get', data);

Mock.mock('/api/getUserInfo', 'get', userInfo);
Mock.mock('/api/getMenu', 'get', menu );
Mock.mock('/api/getOrgn', 'get', orgData );
Mock.mock('/api/getUserData', 'get', userData);