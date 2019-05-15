<template>
  <div id="record">
    <div id="header">
      <h1 class="title"><router-link to="/">WIFI智能考勤系统</router-link></h1>
      <nav class="nav">
        <div class="menu" v-for="value in routes">
          <router-link :to="value.path">{{value.name}}</router-link>
        </div>
      </nav>
    </div>
    <nav class="nav-bar">
    </nav>
    <section>
      <router-view></router-view>
    </section>
    <div id="footer">
      <p class="footer">华中科技大学Dian团队 16级种子班</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      title: 'WIFI智能考勤系统',
      routes: [
        {
          path: '/home',
          name: '首页'
        },
        {
          path: '/message',
          name: '消息中心'
        },
        {
          path: '/search',
          name: '数据查询'
        },
        {
          path: '/data',
          name: '数据管理'
        },
        {
          path: '/user',
          name: '管理员登录'
        },
      ]
    }
  },
  mounted(){
    document.title = this.title
  }
}
</script>

<style>
  #header{
    /*display: flex;*/
    /*justify-content: center;*/
    /*flex-wrap: wrap;*/
    width: 100%;
    /*height: 100px;*/
    text-align: center;
  }
  .title{
    min-width: 350px;
    max-width: 600px;
    padding: 10px 0;
    font-size: 18px;
    font-family: '微软雅黑';
    a {
      text-decoration: none!important;
    }
  }

  #footer{
    width: 100%;
    height: auto;
    background-color: whitesmoke;
    text-align: center;
  }
  .footer{
    padding: 10px 0;
    color: #999999;
    font-size: 14px;
    font-family: '微软雅黑';
  }

  .nav{
    padding: 20px auto;
    min-width: 350px;
    max-width: 600px;
    display: flex;
    justify-content: center;
  }
  .menu{
    box-sizing: border-box;
    border: 2px solid white;
    background-color: white;
  }
  .menu :hover{
    color: #fcbb00;
    border-bottom: #fcbb00 2px solid;
  }
  .menu a{
    font-size: 14px;
    color: #333333;
    padding: 6px;
    text-decoration: none;
  }
  .router-link-exact-active, .router-link-active{
    color: #fcbb00!important;
    text-decoration: none!important;
  }

  section{
    padding: 25px 5%;
  }
</style>
