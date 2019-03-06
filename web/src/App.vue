<template>
  <div id="app">
  <div class = 'menu'>
    <!-- 导航栏菜单 -->
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#ffffff"
      active-text-color="#ffd04b">
      <el-menu-item index="1" class="menu-item" @click="gotoLogin">管理员登录</el-menu-item>
      <el-submenu index="2" class="menu-item">
        <span slot="title" class="menu-item">组别</span>
        <el-menu-item index="2-1" class="menu-item">item1</el-menu-item>
        <el-menu-item index="2-2" class="menu-item">item2</el-menu-item>
        <el-menu-item index="2-3" class="menu-item">item3</el-menu-item>
      </el-submenu>
      <el-submenu index="3" class="menu-item">
        <span slot="title" class="menu-item">房间</span>
        <el-menu-item index="2-1" class="menu-item">item1</el-menu-item>
        <el-menu-item index="2-2" class="menu-item">item2</el-menu-item>
        <el-menu-item index="2-3" class="menu-item">item3</el-menu-item>
      </el-submenu>
      <el-menu-item index="4" class="menu-item">消息中心</el-menu-item>
      <el-menu-item index="4" class="menu-item">数据查询</el-menu-item>
      <el-menu-item index="5" href="https://www.ele.me" class="menu-item">数据管理</el-menu-item>
    </el-menu>
    <br/>
    <br/>
    <!-- 登录对话框 -->
    <!-- <div :visible.sync = 'centerDialogVisible'>
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="100%"
      center
      class="login-dialog">
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
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false, tableVisible = true">确 定</el-button>
      </span>
    </el-dialog>
    </div> -->
    <!-- 控制考勤记录显示 -->
    <div :visible.sync = 'tableVisible'>
    <el-table
      :data="tableData"
      :visible.sync="tableVisible"
      style="width: 100%; text-align: center">
      <!--<el-table-column-->
        <!--prop="date"-->
        <!--label="房间"-->
        <!--width="200" class="menu-item">-->
      <!--</el-table-column>-->
      <el-table-column
        prop="name"
        label="姓名"
        width="200">
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        width="200" >
      </el-table-column>
      <el-table-column
        prop="timeArrive"
        label="到达时间"
        sortable
        width="200" >
      </el-table-column>
      <el-table-column
        prop="timeLeave"
        label="离开时间"
        sortable
        width="200" >
      </el-table-column>
    </el-table>
    </div>
  </div>
  </div>
</template>
<!--<script src="//unpkg.com/vue/dist/vue.js"></script>-->
<!--<script src="//unpkg.com/element-ui@2.6.0/lib/index.js"></script>-->
<script>
export default {
  name: 'App',
  data () {
    return {
      activeIndex2: '1',
      centerDialogVisible: false,
      tableVisible: true,
      username: ''
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    gotoLogin () {
      window.location.href = '#/login'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 80%;
  align-self: center;
}
  .menu {
    /*width: 90%;*/
    text-align: center;
  }
  .menu-item {
    font-size: 18px;
    width: 200px;
    text-align: center;
  }
  .el-table th{
    background:#545c64 !important;
    font-size: 16px;
    text-align: center;
    color: white;
   }
   .el-table {
     width: 80%;
   }
   /* /* .login-dialog { */
     /* margin-top: 5%; */
     /* width: 80%; */
   /* } */
</style>
