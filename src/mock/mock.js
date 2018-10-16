// 引入mockjs
//引入mockjs
const Mock = require('mockjs')


Mock.setup({
    timeout: 800, // 设置延迟响应，模拟向后端请求数据
   });
    
   const data =  [
    {
      id: "123",
      date: "2016-05-03",
      name: "王小虎",
      province: "上海",
      city: "普陀区",
      address: "上海市普陀区金沙江路 1518 弄",
      zip: 200333,
      sex:0
    },
    {
      date: "2016-05-02",
      name: "王小虎",
      province: "上海",
      city: "普陀区",
      address: "上海市普陀区金沙江路 1518 弄",
      zip: 200333,
      sex:1
    },
    {
      date: "2016-05-04",
      name: "王小虎",
      province: "上海",
      city: "普陀区",
      address: "上海市普陀区金沙江路 1518 弄",
      zip: 200333,
      sex:0
    },
    {
      date: "2016-05-01",
      name: "王小虎",
      province: "上海",
      city: "普陀区",
      address: "上海市普陀区金沙江路 1518 弄",
      zip: 200333,
      sex:1
    }
  ];
   // Mock.mock( url, post/get , 返回的数据)；
   Mock.mock('/home/getList', 'get', data);