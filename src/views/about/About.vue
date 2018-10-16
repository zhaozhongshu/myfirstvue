<template>
   
     <el-container class="about-con ">
        <el-aside  id="nav-aside">
          <ul >

            <router-link to="/about/aboutChild1" tag="li">tab1</router-link> 
            <router-link to="/about/aboutChild2" tag="li">tab2</router-link>
          </ul>
        </el-aside>
          <el-main> <router-view/></el-main>
     </el-container>

  
</template>


<style lang="scss"  scoped>

.about-con{
  min-height:100%;
  height: 100%;
  padding-top:20px;
  
}

#nav-aside {
  width: 250px;
  height:300px;
  /*padding:30px 0;*/
  overflow: hidden;
  background: #eee;
  text-align: left;

  li {
    width: 100%;
    height:22px;
    line-height: 22px;
    list-style: none;
    padding:15px;
    border-bottom:1px solid #ddd;
    
  }
  li:hover{
    background: #ccc;

  }
  
}
</style>

