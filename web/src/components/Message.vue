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
      },
      mounted() {
        this.getMessages();
      },
      methods: {
          getMessages() {
            console.log('trying to get msg ...')
            this.$http.get('/api/home/record')
              .then(res => {
                console.log('no error while getting msg ...')
                let record_list = res.body.res_list;
                let msg_lsit = [];
                for (let record of record_list){
                  let msg = '';
                  if(undefined === record.update_time) {
                    continue;
                  }
                  if(undefined === record.leave_time) {
                    msg = record.user_name + ' ' + this.formatter_time(record.update_time) + ' 签到成功';
                  }else {
                    msg = record.user_name + ' ' + this.formatter_time(record.update_time) + ' 签退成功';
                  }
                  msg_lsit.push(msg);
                }
                this.message = msg_lsit;
              })
              .catch(err => {
                console.log('err while getting msg ...' + JSON.stringify(err, null, 4));
              })
          },
          formatter_time(time) {
            let date = new Date(parseInt(time))
            let hours = date.getHours() % 24
            let mins = date.getMinutes() % 60
            return hours+':'+mins;
          },
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
