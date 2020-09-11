<template>
  <div id="app-container">
      <br>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
      </el-form-item>
      <el-form-item>
        <el-input v-model="QueryOwner.copyrightName" placeholder="版权名" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="QueryOwner.company" placeholder="公司" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="QueryOwner.noteName" placeholder="备注名" />
      </el-form-item>

      <el-button type="primary" @click="findPageOwner()">查询</el-button>
      <el-button type="primary" @click="resetData()">清空</el-button>
      <router-link :to="'/owner/create'">
        <el-button type="primary">添加版权</el-button>
      </router-link>
    </el-form>

    <!-- 列表 -->
    <el-table :data="OwnerList" border fit highlight-current-row>
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (pageNo - 1) * pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="copyrightName" label="版权名"  align="center"/>
      <el-table-column prop="company" label="公司" align="center"/>
      <el-table-column prop="noteName" label="备注名" align="center"/>
<!--      <el-table-column prop="classification1.name" label="上线数量" />-->
<!--      <el-table-column prop="classification2.name" label="未上线数量" />-->
<!--      <el-table-column prop="wordNumber" label="即将过期数量" />-->
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="deleteById(scope.row.id)">删除</el-button>
          <router-link :to="'/owner/update/'+scope.row.id">
            <el-button type="primary" size="mini" >修改</el-button>
          </router-link>
          <router-link :to="'/owner/customer/'+scope.row.id">
            <el-button type="primary" size="mini" >客户管理</el-button>
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
      @current-change="OwnerList">
    </el-pagination>

  </div>
</template>

<script>
import owner from '@/api/introduction/owner/owner'
import book from '@/api/cms/book'
import customer from '@/api/introduction/owner/customer'
export default {
  data() {
    return {
      QueryOwner:{},
      OwnerContactQuery:{
        ownerId:''
      },
      OwnerList:[],
      total: 0, // ## 总记录数
      pageNo: 1, // ## 页码
      pageSize: 5, // ## 每页显示记录数
    }
  },
  created() {
    this.findPageOwner()
  },
  methods: {
    findPageOwner(pageNo=1){//条件分页查询
      this.pageNo=pageNo
      owner.findPageOwner(this.pageNo,this.pageSize,this.QueryOwner)
        .then(reps => {
          this.total=reps.data.total
          this.OwnerList=reps.data.items
        })
    },
    resetData(){
      this.QueryOwner={}
      this.findPageOwner()
    },
    deleteById(ownerId){// 根据id删除版权方
      this.$confirm('此操作将永久删除版权方记录，是否继续','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        this.OwnerContactQuery.ownerId=ownerId
        customer.findPageOwner(1,1,this.OwnerContactQuery)
          .then(reps=>{
            if (reps.data.items.length>0){
              console.log(reps.data.items.length)
              this.$confirm('此版权方下还有客户信息，请删除客户信息后再删除此版权方','提示',{
                confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              })
            }else {
              owner.deleteById(ownerId)
                .then(()=>{
                  this.$message({
                    type:'success',
                    message:'删除成功！'
                  })
                  this.findPageOwner()
                })
            }
          })
      })
    }
  }

}
</script>

<style scoped>

</style>
