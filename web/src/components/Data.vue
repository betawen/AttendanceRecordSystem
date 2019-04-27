<template>
<div id="data">
  <el-table
    :data="tableData"
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}">
    <el-table-column
      prop="name"
      label="姓名"
      width="150">
    </el-table-column>
    <el-table-column
      prop="groupID"
      label="组别"
      width="150">
    </el-table-column>
    <el-table-column
      prop="roomID"
      label="房间号"
      width="150">
    </el-table-column>
    <el-table-column
      prop="macID"
      label="设备地址"
      width="150">
    </el-table-column>
    <el-table-column
      label="操作"
      width="150">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
    export default {
        name: "Data",
      data() {
          return {
            tableData: [
              {
                name: 'yxbeta',
                roomID: '710',
                groupID: 'AI',
                macID: '0c:4d:e9:a7:34:65'
              },
              {
                name: 'yxbeta',
                roomID: '710',
                groupID: 'AI',
                macID: '0c:4d:e9:a7:34:65'
              },
              {
                name: 'yxbeta',
                roomID: '710',
                groupID: 'AI',
                macID: '0c:4d:e9:a7:34:65'
              },
              {
                name: 'yxbeta',
                roomID: '710',
                groupID: 'AI',
                macID: '0c:4d:e9:a7:34:65'
              },
              {
                name: 'yxbeta',
                roomID: '710',
                groupID: 'AI',
                macID: '0c:4d:e9:a7:34:65'
              },
            ]
          }
      },
      methods: {
        handleEdit(index, row) {
          console.log(index, row);
        },
        handleDelete(index, row) {
          console.log(index, row);
        }
      }
    }
</script>

<style lang="scss" scoped>

  #data{
    /*padding: 30px 5%;*/
  }
</style>
