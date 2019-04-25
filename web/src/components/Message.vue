<template>
<div id="message">
  <div v-for="msg in message">
    <el-alert
      :title="msg"
      type="warning"
      :closable="false">
    </el-alert>
  </div>
</div>
</template>

<script>
    export default {
        name: "Message",
      data() {
          return {
            message: [
              '王小虎10：50签到成功',
              '王小虎11：60签退成功',
              '管理员贝塔10：00登录成功',
              '管理员贝塔11：00登出成功'
            ]
          }
      }
    }
</script>

<style lang="scss" scoped>

  #message{
    /*padding: 30px 5%;*/
    .el-alert{
      margin: 5px 0 !important;
    }
  }
</style>
