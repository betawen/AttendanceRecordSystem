<template>
<div >
  <div>
    <el-input class="text-login">
      登录
    </el-input>
  </div>
  <div class="demo-input-suffix">
    用 户 名 ：
    <el-input
    style="width:50%;"
      placeholder="请输入用户名"
      v-model="username">
    </el-input>
    <br/>
    <br/>
    用户密码：
    <el-input
    style="width:50%;"
      placeholder="请输入密码"
      show-password
      v-model="passwd"
      @change="login">
    </el-input>
  </div>
</div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      username: '',
      passwd: ''
    }
  },
  methods: {
    // logincheck() {
    //   // if (this.username.length >= 6 && this.passwd.length >= 6) {
    //     // this.login();
    //   // }
    // },
    login () {
      console.log(this.passwd)
      console.log(this.username)
    }
  }
}
</script>

<style>
.demo-input-suffix {
text-align: center;
font-size: 16px;
position: relative;
margin-top: 10%;
}
/*.menu-item {*/
  /*font-size: 18px;*/
  /*width: 200px;*/
  /*text-align: center;*/
/*}*/
.text-login {
  background-color: #545c64;
  font-size: 18px;
  color: white;
}
</style>
