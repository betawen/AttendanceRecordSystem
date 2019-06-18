<template>
<div id="home">
  <el-table
    :data="tableData"
    :default-sort = "{prop: 'update_time', order: 'descending'}">
    <el-table-column
      prop="update_time"
      label="日期"
      sortable
      width="150"
    :formatter="formatter_date">
    </el-table-column>
    <el-table-column
      prop="user_name"
      label="姓名"
      width="150">
    </el-table-column>
    <el-table-column
      prop="arrive_time"
      label="到达时间"
      width="150"
      sortable
      :formatter="formatter_arrive">
    </el-table-column>
    <el-table-column
      prop="leave_time"
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
    user_name: 'home',
    data(){
      return {
        tableData: [{
          update_time: '1666932337981',
          user_name: '王小虎',
          arrive_time: '1555932337981',
          leave_time: '1555939937981',
        }, {
          update_time: '1555932337981',
          user_name: '王小虎',
          arrive_time: '1555932337981',
          leave_time: '1555939937981',
        }, {
          update_time: '1555932337981',
          user_name: '王小虎',
          arrive_time: '1555932337981',
          leave_time: '1555939937981',
        }, {
          update_time: '1555932337981',
          user_name: '王小虎',
          arrive_time: '1555932337981',
          leave_time: '1555939937981',
        }]
      }
    },
    mounted() {
      this.get_record_default();
    },
    methods: {
      get_record_default() {
        console.log('trying to get a res ...')
        this.$http.get('/api/home/record')
          .then(res => {
            console.log('no error ...')
            this.tableData = res.body.res_list;
            console.log(res.body.res_list);
            return;
          })
          .catch(err => {
            console.log('error while reading user_record');
          })
      },
      formatter_date(row, column) {
        let date = new Date(parseInt(row.update_time))
        let month = date.getMonth()
        let year = date.getFullYear()
        let day = date.getDate()
        return year+'-'+month+'-'+day
      },
      formatter_arrive(row, column) {
        let date = new Date(parseInt(row.arrive_time))
        let hours = date.getHours() % 24
        let mins = date.getMinutes() % 60
        return hours+':'+mins;
      },
      formatter_leave(row, column) {
        let date = new Date(parseInt(row.leave_time))
        if(undefined === row.leave_time) {
          return '未签退'
        }
        let hours = date.getHours() % 24
        let mins = date.getMinutes() % 60
        return hours+':'+mins;
      },
      formatter_work(row, column) {
        let arrive_time = new Date(parseInt(row.arrive_time))
        if(undefined === row.leave_time) {
          return '未签退'
        }
        let leave_time = new Date(parseInt(row.leave_time))
        let h_arrive = arrive_time.getHours()
        let h_leave = leave_time.getHours()
        let m_arrive = arrive_time.getMinutes()
        let m_leave = leave_time.getMinutes()
        let mins = m_leave - m_arrive;
        let hours = h_leave - h_arrive;
        if(mins < 0) {
          hours -= 1;
          mins += 60;
        }
        if(hours < 0) {
          hours = 0
        }
        return  hours+ '小时 ' + mins % 60 + '分钟';
      }
    }
  }
</script>

<style scoped>

  #home{
    /*padding: 30px 5%;*/
  }
</style>
