<template>
   <div class="my-header"> 
       <div class="name">{{realName}} — {{logName}}</div></div>
</template>


<script>
export default {
  data() {
    return {
        realName:''
    };
  },
  methods: {},
  computed: {
    logName() {
      return this.$store.getters.getLogName;
    }
  },

  mounted() {
    this.axios.get("/api/getUserInfo").then(res => {
      this.$store.state.logUseInfo = res.data;
      this.realName = this.$store.state.logUseInfo.userName;
    });
    //this.$store.dispatch('initLogUserInfo');
  }
};
</script>

<style   lang="scss" scoped>
.my-header{
    background:royalblue;
    height:40px;
    line-height: 40px;

    .name{
        width:1200px;
        color: #fff;
        margin:0 auto;
        text-align: right;

    }
    

}
</style>

