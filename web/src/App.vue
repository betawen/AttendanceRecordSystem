<template>
  <div id="app">
  <div class = 'menu'>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#ffffff"
      active-text-color="#ffd04b">
      <el-menu-item index="1" class="menu-item">管理员登录</el-menu-item>
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
    <br>
    <el-table
      :data="tableData"
      style="width: 100%; text-align: center">
      <!--<el-table-column-->
        <!--prop="date"-->
        <!--label="房间"-->
        <!--width="200" class="menu-item">-->
      <!--</el-table-column>-->
      <el-table-column
        prop="name"
        label="姓名"
        width="200" class="menu-item">
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        width="200" class="menu-item">
      </el-table-column>
      <el-table-column
        prop="timeArrive"
        label="到达时间"
        width="200" class="menu-item">
      </el-table-column>
      <el-table-column
        prop="timeLeave"
        label="离开时间"
        width="200" class="menu-item">
      </el-table-column>
    </el-table>
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
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
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
</style>
