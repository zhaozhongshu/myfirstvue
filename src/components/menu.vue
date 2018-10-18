<template>
   <div id="menu"> 
       <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#3a8ee6"
        text-color="#fff"
        active-text-color="#ffd04b">
                <template v-for="(menu,index) in menuData" >
                        <el-submenu v-bind:key="index+''" v-if="menu.children && menu.children.length>0">
                            <template slot="title">
                               <router-link :to="menu.url">{{menu.name}}</router-link>
                            </template>
                             <template v-for="(submenu,index) in menu.children" >
                                <el-submenu v-bind:key="index+''" v-if="submenu.children && submenu.children.length>0">
                                    <template slot="title">
                                        <router-link :to="submenu.url">{{submenu.name}}</router-link>
                                    </template>
                                    <el-menu-item v-for="(subbmenu,index) in submenu.children"   v-bind:key="index+''">
                                       <router-link :to="subbmenu.url">{{subbmenu.name}}</router-link>
                                    </el-menu-item>
                                </el-submenu>
                                <el-menu-item v-if="!submenu.children || submenu.children.length==0" v-bind:key="index+''">
                                    <router-link :to="submenu.url">{{submenu.name}}</router-link>
                                </el-menu-item>
                            </template>
                            
                        </el-submenu>
                        <el-menu-item v-if="!menu.children || menu.children.length==0" v-bind:key="index+''">
                           <router-link :to="menu.url">{{menu.name}}</router-link>
                        </el-menu-item>
                </template>
        </el-menu>
   </div>
</template>


<script>
export default {
    data() {
      return {
        activeIndex: '1',
        menuData:[]
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    mounted() {
    this.axios.get('/api/getMenu').then((res) => {
      this.menuData = res.data;
       console.log(res)
    });
  }
};
</script>

<style   lang="scss" scoped>
#menu{
    width:100%;
  
     background: #3a8ee6;
     height: 70px;
     line-height: 70px;
  ul{
      width:1200px;
       margin:0 auto;
   
       a{
           text-decoration: none;
               color:#fff;
       }
     
  }

}
.el-menu{
      a{
           text-decoration: none;
               color:#fff;
       }
}

</style>

