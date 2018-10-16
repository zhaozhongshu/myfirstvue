<template>
  <div id="app">
    <el-container>
        <el-header><div id="nav">
            <router-link to="/">Home</router-link> |
              <router-link to="/about/aboutChild1">About</router-link>
           </div></el-header>
          <el-main class="content-wap"><router-view/></el-main>
          <el-footer>深圳证券通信有限公司</el-footer>
    </el-container>
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
   width: 100%;
  margin: 0 auto;
}
.content-wap{
 min-width: 1200px;
  width:1200px;
    margin: 0 auto;
          overflow-x: hidden!important;
}
#nav {
    background: #3a8ee6;
    height: 100%;
    vertical-align: middle;
    justify-content: center;
    display: flex;
    justify-content: center;
    align-items: Center;
    color: #fff;
  a {
    font-weight: bold;
    color: #fff;
    padding:20px;
    &.router-link-exact-active {
      color: #ddd;
    }
  }
}
</style>
