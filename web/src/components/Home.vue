<template>
<div id="home">
  <el-table
    :data="tableData"

    :default-sort = "{prop: 'date', order: 'descending'}">
    <el-table-column
      prop="date"
      label="日期"
      sortable
      width="150"
    :formatter="formatter_date">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="150">
    </el-table-column>
    <el-table-column
      prop="time_arrive"
      label="到达时间"
      width="150"
      sortable
      :formatter="formatter_arrive">
    </el-table-column>
    <el-table-column
      prop="time_leave"
      label="离开时间"
      width="150"
      sortable
      :formatter="formatter_leave">
    </el-table-column>
    <el-table-column
      prop="time_work"
      label="工作时间"
      width="150"
      sortable
      :formatter="formatter_work">
    </el-table-column>
  </el-table>
</div>
</template>

<script>
  export default {
    name: 'home',
    data(){
      return {
        tableData: [{
          date: '1666932337981',
          name: '王小虎',
          time_arrive: '1555932337981',
          time_leave: '1555939937981',
        }, {
          date: '1555932337981',
          name: '王小虎',
          time_arrive: '1555932337981',
          time_leave: '1555939937981',
        }, {
          date: '1555932337981',
          name: '王小虎',
          time_arrive: '1555932337981',
          time_leave: '1555939937981',
        }, {
          date: '1555932337981',
          name: '王小虎',
          time_arrive: '1555932337981',
          time_leave: '1555939937981',
        }]
      }
    },
    methods: {
      formatter_date(row, column) {
        let date = new Date(parseInt(row.date))
        let month = date.getMonth()
        let year = date.getFullYear()
        let day = date.getDate()
        return year+'-'+month+'-'+day
      },
      formatter_arrive(row, column) {
        let date = new Date(parseInt(row.time_arrive))
        let hours = date.getHours() % 24
        let mins = date.getMinutes() % 60
        return hours+':'+mins;
      },
      formatter_leave(row, column) {
        let date = new Date(parseInt(row.time_leave))
        let hours = date.getHours() % 24
        let mins = date.getMinutes() % 60
        return hours+':'+mins;
      },
      formatter_work(row, column) {
        let time_arrive = new Date(parseInt(row.time_arrive))
        let time_leave = new Date(parseInt(row.time_leave))
        let h_arrive = time_arrive.getHours()
        let h_leave = time_leave.getHours()
        let m_arrive = time_arrive.getMinutes()
        let m_leave = time_leave.getMinutes()
        return h_leave - h_arrive + '小时 ' + (m_leave - m_arrive) % 60 + '分钟';
      }
    }
  }
</script>

<style scoped>

  #home{
    /*padding: 30px 5%;*/
  }
</style>
