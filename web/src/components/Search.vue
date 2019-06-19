<template>
  <div id="search">
    <div class="search-type">
      <span>搜索范围:</span>
      <el-select v-model="searchType" :placeholder="searchTypeList[0].label" @change="submitSearchType">
        <el-option
          v-for="item in searchTypeList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="searchID" :placeholder="searchTypeList[0].label">
        <el-option
          v-for="item in searchList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="search">
      <span>搜索内容:</span>
      <el-input v-model="searchContent" placeholder="请输入搜索内容" icon="el-icon-search"></el-input>
    </div>
    <el-button icon="el-icon-search" type="primary" @click="submitSearch">搜索</el-button>
    <div class="result">
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
  </div>
</template>

<script>
    export default {
      name: "Search",
      data() {
        return {
          // searchType: ['全局搜索','房间号','组别','日期','姓名']
          searchTypeList:[
            {
              label: '全局搜索',
              value: 'all'
            },
            {
              label: '房间号',
              value: 'roomID'
            },
            {
              label: '组别',
              value: 'groupID'
            },
            {
              label: '日期',
              value: 'date'
            },
            {
              label: '姓名',
              value: 'name'
            }
          ],
          searchType: '',
          searchList: [
            {
              label: '全局搜索',
              value: 'all'
            },
          ],
          searchID: '',
          searchContent: '',
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
        this.submitSearchAll();
      },
      methods: {
        submitSearchAll() {
          console.log('trying to get a res ...')
          this.$http.get('/api/home/record')
            .then(res => {
              console.log('no error ...')
              this.tableData = res.body.res_list;
              return;
            })
            .catch(err => {
              console.log('error while reading user_record');
            })
        },
        submitSearch() {
          console.log('trying to search by user_name ...')
          this.$http.get('/api/home/record')
            .then(res => {
              console.log('no error ...')
              let record_list = res.body.res_list;
              if ('' === this.searchContent) {
                this.tableData = record_list;
                this.$notify({
                  title: '搜索内容为空',
                  message: '请输入对象姓名进行搜索',
                  type: 'warning'
                });
                return;
              }else {
                let search_res_list = [];
                for (let record of record_list) {
                  if(record.user_name === this.searchContent) {
                    search_res_list.push(record)
                  }
                }
                this.tableData = search_res_list;
              }
            })
            .catch(err => {
              console.log('error while reading user_record');
            })
        },
        submitSearchType() {
          console.log('submit search type ！');
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

<style lang="scss">

  #search{
    .search-type{
      padding: 5px 0;
      display: flex;
      justify-content: start;
      .el-select-dropdown__item.selected{
        color: #fcbb00;
      }
      .el-input__inner:focus{
        border: whitesmoke solid 2px!important;
      }
      .el-input__inner{
        width: 120px!important;
        margin: 0 5px;
      }
      span{
        padding: 5px 0;
        color: #666;
        font-size: 15px;
        /*width: 75px;*/
        min-width: 75px;
      }
    }
    .search{
      padding: 5px 0;
      display: flex;
      justify-content: start;
      input{
        margin: 0 5px;
        width: 150px;
      }
      span{
        padding: 5px 0;
        color: #666;
        font-size: 15px;
        /*width: 75px;*/
        min-width: 75px;
      }
    }
    button{
      /*style="width: 120px; margin: 0 5px; color: #fff!important; font-size: 14px"*/
      width: 100px;
      background-color: #fcbb00;
      border: whitesmoke solid 2px;
      border-radius: 6px;
      /*color: #fcbb00;*/
      margin: 5px 80px;
      span{
        /*color: #fcbb00;*/
        font-size: 14px;
      }
    }
    .result{
      padding: 10px 0;
    }

  }

</style>
