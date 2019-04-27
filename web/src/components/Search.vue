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
    <el-button icon="el-icon-search" type="primary">搜索</el-button>
    <div class="result">
      <el-table
        :data="tableData"
        style="width: 100%"
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
        submitSearchType() {
          console.log(this.searchType)
          // get searchList by searchType
        },
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
