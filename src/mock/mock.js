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

const orgData = [{id:'1',parentId:"",label: '公司'},{id:'11',parentId:"1",label: '部门一'},{id:'21',parentId:"1",label: '部门二'},
{id:'111',parentId:"11",label: '部门一1'},{id:'112',parentId:"11",label: '部门一2'},{id:'211',parentId:"21",label: '部门二1'}];
// Mock.mock( url, post/get , 返回的数据)； 
Mock.mock('/home/getList', 'get', data);

Mock.mock('/api/getUserInfo', 'get', userInfo);
Mock.mock('/api/getMenu', 'get', menu );
Mock.mock('/api/getOrgn', 'get', orgData );