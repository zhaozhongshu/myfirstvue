<template>
   <div id="my-menu"> 
       <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#3a8ee6"
        text-color="#fff"
        active-text-color="#ffd04b">
         <template v-for="(menu,index) in menuData"   >
             <el-menu-item  v-if="!menu.children || menu.children.length==0" :href="menu.url" v-bind:key="index+''" :index="menu.id+''" >
                        <router-link :to="menu.url">{{menu.name}}</router-link>
            </el-menu-item>
           <el-submenu v-bind:key="index+''"  :index="menu.id+''"   v-if="menu.children && menu.children.length>0">
                 <template slot="title">
                      <router-link :to="menu.url">{{menu.name}}</router-link>
                  </template>
                  <el-menu-item v-for="(submenu,index) in  menu.children"   v-if="!submenu.children || submenu.children.length==0" v-bind:key="index+''" :index="submenu.id+''" >
                            <router-link :to="submenu.url">{{submenu.name}}</router-link>
                 </el-menu-item>
                  <el-submenu v-bind:key="index+''"  :index="submenu.id+''"  v-for="(submenu,index) in menu.children"  v-if="submenu.children && submenu.children.length>0">
                        <template slot="title">
                            <router-link :to="submenu.url">{{submenu.name}}</router-link>
                        </template>
                        <el-menu-item v-for="(subbmenu,index) in  submenu.children"   v-if="!subbmenu.children || subbmenu.children.length==0" v-bind:key="index+''" :index="subbmenu.id+''" >
                                    <router-link :to="subbmenu.url">{{subbmenu.name}}</router-link>
                        </el-menu-item>
                         <el-submenu v-bind:key="index+''"  :index="subbmenu.id+''"  v-for="(subbmenu,index) in submenu.children"  v-if="subbmenu.children && subbmenu.children.length>0">
                            <template slot="title">
                                <router-link :to="subbmenu.url">{{subbmenu.name}}</router-link>
                            </template>
                            
                        </el-submenu>
                            
                 </el-submenu>             
            </el-submenu>
            
         </template>
             
        </el-menu>
   </div>
</template>


<script>
export default {
  data() {
    return {
      activeIndex: "1",
      menuData: []
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  mounted() {
    this.axios.get("/api/getMenu").then(res => {
      this.menuData = res.data;
      console.log(res);
    });
  }
};
</script>

<style   lang="scss"  scoped>
#my-menu {
  width: 100%;

  background: #3a8ee6;
  height: 70px;
  line-height: 70px;
  ul {
    width: 1200px;
    margin: 0 auto;
  }
}
li {
  padding: 0 !important;
}
a {
  text-decoration: none;
  color: #fff;
  padding: 0 20px !important;
  display: block;
}
</style>

