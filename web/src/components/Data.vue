<template>
<div id="data">
  <el-table
    :data="tableData"
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}">
    <el-table-column
      prop="user_name"
      label="姓名"
      width="300">
    </el-table-column>
    <!--<el-table-column-->
      <!--prop="groupID"-->
      <!--label="组别"-->
      <!--width="150">-->
    <!--</el-table-column>-->
    <!--<el-table-column-->
      <!--prop="roomID"-->
      <!--label="房间号"-->
      <!--width="150">-->
    <!--</el-table-column>-->
    <el-table-column
      prop="mac_id"
      label="设备地址"
      width="300">
    </el-table-column>
    <!--<el-table-column-->
      <!--label="操作"-->
      <!--width="150">-->
      <!--<template slot-scope="scope">-->
        <!--<el-button-->
          <!--size="mini"-->
          <!--@click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
        <!--<el-button-->
          <!--size="mini"-->
          <!--type="danger"-->
          <!--@click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
      <!--</template>-->
    <!--</el-table-column>-->
  </el-table>
</div>
</template>

<script>
    export default {
        user_name: "Data",
      data() {
          return {
            tableData: [
              {
                user_name: 'yxbeta',
                roomID: '710',
                groupID: 'AI',
                mac_id: '0c:4d:e9:a7:34:65'
              },
              {
                user_name: 'yxbeta',
                roomID: '710',
                groupID: 'AI',
                mac_id: '0c:4d:e9:a7:34:65'
              },
              {
                user_name: 'yxbeta',
                roomID: '710',
                groupID: 'AI',
                mac_id: '0c:4d:e9:a7:34:65'
              },
              {
                user_name: 'yxbeta',
                roomID: '710',
                groupID: 'AI',
                mac_id: '0c:4d:e9:a7:34:65'
              },
              {
                user_name: 'yxbeta',
                roomID: '710',
                groupID: 'AI',
                mac_id: '0c:4d:e9:a7:34:65'
              },
            ]
          }
      },
      mounted() {
        this.getUserInfo();
      },
      methods: {
        handleEdit(index, row) {
          console.log(index, row);
        },
        handleDelete(index, row) {
          console.log(index, row);
        },
        getUserInfo() {
          console.log('trying to get user info ...')
          this.$http.get('/api/user/user_info')
            .then(res => {
              console.log('no error while getting user info ...');
              this.tableData = res.body.res_list;
            })
            .catch(err => {
              console.log('error while getting user info ...');
              console.log(err)
            })
        }
      }
    }
</script>

<style lang="scss" scoped>

  td{
    contentEditable: true;
  }

  #data{
    /*padding: 30px 5%;*/
  }
</style>
