<template>
  <div id="app-container">
    <br>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
      </el-form-item>
      <el-form-item>
        <el-input v-model="queryOwner.copyrightName" placeholder="版权名"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="queryOwner.company" placeholder="公司"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="queryOwner.noteName" placeholder="备注名"/>
      </el-form-item>

      <el-button type="primary" @click="getPageOwnerList()">查询</el-button>
      <el-button type="primary" @click="resetData()">清空</el-button>
      <router-link :to="'/owner/create'">
        <el-button type="primary">添加版权</el-button>
      </router-link>
    </el-form>

    <!-- 列表 -->
    <el-table :data="ownerList" border fit highlight-current-row>
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (pageNo - 1) * pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="copyrightName" label="版权名" align="center"/>
      <el-table-column prop="company" label="公司" align="center"/>
      <el-table-column prop="noteName" label="备注名" align="center"/>
      <!--      <el-table-column prop="classification1.name" label="上线数量" />-->
      <!--      <el-table-column prop="classification2.name" label="未上线数量" />-->
      <!--      <el-table-column prop="wordNumber" label="即将过期数量" />-->
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
                    <el-button type="danger" size="mini" @click="deleteOwner(scope.row.id, scope.row.status)">删除</el-button>
          <router-link :to="'/owner/update/'+scope.row.id">
            <el-button type="primary" size="mini">修改</el-button>
          </router-link>
          <router-link :to="'/owner/customer/'+scope.row.id">
            <el-button type="primary" size="mini">客户管理</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :page-size="pageSize"
      :current-page="pageNo"
      :total="total"
      :pager-count="11"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getPageOwnerList">
    </el-pagination>

  </div>
</template>

<script>
  import owner from '@/api/introduction/owner'
  import book from '@/api/cms/book'

  export default {
    data() {
      return {
        queryOwner: {},
        ownerList: [
          // {
          //   id: 1,
          //   copyrightName: '云中书城',
          //   company: '腾讯',
          //   noteName: '好'
          // }
        ],
        total: 0, // ## 总记录数
        pageNo: 1, // ## 页码
        pageSize: 5 // ## 每页显示记录数
      }
    },
    created() {
      this.getPageOwnerList(this.pageNo)
    },
    methods: {
      getPageOwnerList(pageNo = 1) {
        this.pageNo = pageNo
        owner.findPageOwner(this.pageNo, this.pageSize, this.queryOwner)
          .then(response => {
           this.ownerList=response.data.items
            this.total=response.data.total
          })
      },
      resetData() { // ## 清空方法
        // ##清空所有值
        this.queryOwner = {}
        // ##查询所有数据
        this.getPageOwnerList()
      },
      deleteOwner(id, status){
        this.$confirm('此操作将永久删除书籍记录，是否继续','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          owner.deleteById(id).then(reps=>{
            this.$message({
              type:'success',
              message:'成功'
            })
            this.getPageOwnerList()
          })
        })
      },
    }

  }
</script>

<style scoped>

</style>
