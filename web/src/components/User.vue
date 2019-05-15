<template>
<div id="user">
  <el-form :inline="false" :model="formInline" class="demo-form-inline" v-if="!register">
    <el-form-item label="用户名称">
      <el-input v-model="formInline.user_id" placeholder="请输入管理员ID"></el-input>
    </el-form-item>
    <el-form-item label="用户密码">
      <el-input v-model="formInline.password" type="password" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitToLogin">登录</el-button>
      <el-button type="primary" @click="register=true">注册管理</el-button>
    </el-form-item>
  </el-form>
  <el-form :inline="false" :model="formInline" class="demo-form-inline" v-if="register">
    <el-form-item label="用户名称">
      <el-input v-model="registerInline.user_id" placeholder="请输入注册ID"></el-input>
    </el-form-item>
    <el-form-item label="用户密码">
      <el-input v-model="registerInline.password1" type="password" placeholder="请输入密码" @change="codeInputError=false"></el-input>
    </el-form-item>
    <el-form-item label="确认密码">
      <el-input v-model="registerInline.password2" type="password" placeholder="请再次确认输入" @change="codeInputError=false"></el-input>
    </el-form-item>
    <el-alert title="两次输入密码不一致" type="error" v-if="codeInputError" :closable="false"></el-alert>
    <el-form-item label="邀请码">
      <el-input v-model="registerInline.inviteCode" type="password" placeholder="请输入邀请码" @change="inviteCodeInvalid=false;"></el-input>
    </el-form-item>
    <el-alert title="邀请码无效" type="error" v-if="inviteCodeInvalid" :closable="false"></el-alert>
    <br>
    <el-form-item>
      <el-button type="primary" @click="register=false">登录</el-button>
      <el-button type="primary" @click="submitToRegister">注册</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
  // import Vue from 'vue'
  export default {
    name: "User",
    data() {
      return {
        formInline: {
          user_id: '',
          password: ''
        },
        registerInline: {
          user_id: '',
          password1: '',
          password2: '',
          inviteCode: ''
        },
        register: false,
        codeInputError: false,
        inviteCodeInvalid: false,
        loginMsg: '',
        registerMsg: ''
      }
    },
    methods: {
      submitToLogin() {
        this.$http.post('/api/user/login', {user_id: this.formInline.user_id, passwd: this.formInline.password})
          .then(res => {
            console.log('status:' + res.body.status);
            if(res.body.status === 200){
              this.$message.success('登录成功');
              window.location.href = '/home';
            }else if(res.body.status === 401) {
              this.$message.warning('密码输入错误');
            }
          })
          .catch(err => {
            this.$message(err)
          })
        console.log(this.formInline,'submit!');
      },
      submitToRegister() {
        if(this.registerInline.password1 !== this.registerInline.password2){
          this.codeInputError = true
          console.log('ERROR!')
          return ;
        }
        let params = {
          user_id: this.registerInline.user_id,
          passwd: this.registerInline.password2,
          invite_code: this.registerInline.inviteCode
        }
        this.$http.post('/api/user/register', params)
          .then(res => {
            console.log('register status:' + res.status)
            if(res.status === 200) {
              this.$message.success('注册成功');
              this.register = false;
            }
          })
          .catch(err => {
            this.$message.error(err)
          })
      }
    }
  }
</script>

<style scoped>

  #user{
    /*padding: 30px 0;*/
  }
  .demo-form-inline{
    width: 70%;
    padding-left: 50px;
  }
  button{
    background-color: #fcbb00;
    border: whitesmoke solid 1px;
  }

</style>
