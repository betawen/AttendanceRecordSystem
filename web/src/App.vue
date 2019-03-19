<template>
  <div id="app">
    <!-- 导航栏菜单 -->
    <el-row class="bg-purple-dark">
      <div>
      <el-col :span="6" style="min-width: 85px!important;">
        <div class="grid-content">Attendance Record</div>
      </el-col>
      <el-col :span="18">
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#ffffff"
          active-text-color="#409EFF">
          <!-- <el-menu-item index="1" class="menu-item" @click="gotoLogin">管理员登录</el-menu-item> -->
          <el-menu-item index="1" class="menu-item" ><a href="/login">管理员登录</a></el-menu-item>
          <el-menu-item index="2" class="menu-item">消息中心</el-menu-item>
          <el-menu-item index="3" class="menu-item">数据查询</el-menu-item>
          <el-menu-item index="4" href="https://www.ele.me" class="menu-item">数据管理</el-menu-item>
        </el-menu>
      </el-col>
      </div>
    </el-row>
    <br/>
    <el-row class="bg-purple-dark-table">
      <el-col :span="6" style="min-width: 85px!important;">
        <div class="grid-content bg-purple">
          <!--<el-radio-group v-model="isCollapse" style="margin-bottom: 20px; height: 66px">-->
            <!--<el-radio-button :label="false">展开</el-radio-button>-->
            <!--<el-radio-button :label="true">收起</el-radio-button>-->
          <!--</el-radio-group>-->
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose">
            <el-submenu index="1">
              <template slot="title">
                <span>组别</span>
              </template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
                <el-menu-item index="1-3">选项3</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <span>房间</span>
              </template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="18">
        <div :visible.sync = 'tableVisible'>
          <el-table
            :data="tableData"
            :visible.sync="tableVisible"
            style="width: 100%; text-align: center">
            <!--<el-table-column-->
            <!--prop="date"-->
            <!--label="房间"-->
            <!--width=" 150" class="menu-item">-->
            <!--</el-table-column>-->
            <el-table-column
              prop="name"
              label="姓名"
              width=" 120">
            </el-table-column>
            <el-table-column
              prop="date"
              label="日期"
              width=" 120" >
            </el-table-column>
            <el-table-column
              prop="timeArrive"
              label="到达时间"
              sortable
              width=" 120" >
            </el-table-column>
            <el-table-column
              prop="timeLeave"
              label="离开时间"
              sortable
              width=" 120" >
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      activeIndex2: '1',
      centerDialogVisible: false,
      tableVisible: true,
      username: '',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        timeLeave: '上海市普陀区金沙江路 1518 弄',
        timeArrive: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        timeLeave: '上海市普陀区金沙江路 1518 弄',
        timeArrive: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        timeLeave: '上海市普陀区金沙江路 1518 弄',
        timeArrive: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        timeLeave: '上海市普陀区金沙江路 1518 弄',
        timeArrive: '上海市普陀区金沙江路 1518 弄'
      }]
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
  width: 100%;
  align-self: center;
}
.el-menu-demo {
    width: 90%;
    /* border-radius: 4px; */
    text-align: center;
}
.el-menu--horizontal {
    border-bottom: solid 0px #e6e6e6!important;
}
  .menu-item {
    /* border-radius: 4px; */
    font-size: 16px;
    width:  120px;
    text-align: center;
  }
  .el-table th{
    border-radius: 2px;
    background:#545c64 !important;
    font-size: 16px;
    text-align: center;
    color: white;
    height: 66px;
   }
   .el-table {
     width: 100%;
   }
   .el-row {
    border-radius: 4px;
    margin-bottom: 2px;
    width: 100%;
    &:last-child {
      margin-bottom: 0;
    }
   }
  .bg-purple-dark {
    border-radius: 4px;
    min-height: 66px;
    background: #545c64;
  }
  .grid-content {
    /* border-radius: 4px; */
    margin-top: 20px;
    margin-left: 10px;
    text-align: left;
    font-size: 16px;
    /*min-width: 85px!important;*/
    color: white;
  }
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100%;
  /*min-width: 85px!important;*/
  min-height: 400px;
}
   /* /* .login-dialog { */
     /* margin-top: 5%; */
     /* width: 80%; */
   /* } */
</style>
