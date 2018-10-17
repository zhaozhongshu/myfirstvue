<template>
   <div class="my-footer">深圳证券通信有限公司</div>
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

.my-footer{
   height: 60px;
    line-height: 60px;
    background: #fbfbfb
  
}
</style>

