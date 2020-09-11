<template>
  <div id="app-container">
    <br>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
      </el-form-item>
      <el-form-item>
        <el-input v-model="OwnerContactQuery.duties" placeholder="职位" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="OwnerContactQuery.name" placeholder="姓名" />
      </el-form-item>
      <el-button type="primary" @click="findPageOwnerContact()">查询</el-button>
      <el-button type="primary" @click="resetData()">清空</el-button>
      <router-link :to="{
        path:'/owner/createCustomer',
            name:'CreateCustomer',
            params:{
              ownerid:OwnerId
            }
      }">
        <el-button type="primary">添加客户</el-button>
      </router-link>
    </el-form>

    <!-- 列表 -->
    <el-table :data="OwnerContact" border fit highlight-current-row>
      <el-table-column prop="owner.company" label="版权名"  align="center"/>
      <el-table-column prop="name" label="姓名" align="center"/>
      <el-table-column label="性别" align="center">
        <template slot-scope="scope">
          <!--   1男 2女       -->
          {{  scope.row.sex == 1  ? '男' : '女' }}
        </template>
      </el-table-column>
      <el-table-column prop="dateOfBirth" label="出生日期" align="center"/>
      <el-table-column prop="duties" label="职务" align="center"/>
      <el-table-column prop="mobilePhone" label="手机号" align="center"/>
      <el-table-column prop="telePhone" label="座机号" align="center"/>
      <el-table-column prop="email" label="邮箱" align="center"/>
      <el-table-column prop="qq" label="qq" align="center"/>
      <el-table-column prop="companyAddress" label="公司地址" align="center"/>
      <el-table-column prop="remarks" label="备注" align="center"/>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
                    <el-button type="danger" size="mini" @click="deleteById(scope.row.id)">删除</el-button>
          <router-link :to="{
            path:'/owner/updateCustomer',
            name:'UpdateCustomer',
            params:{
              contactid:scope.row.id,
              ownerid:OwnerId
            }
          }">
            <el-button type="primary" size="mini" >修改</el-button>
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
      @current-change="OwnerContact">
    </el-pagination>
  </div>
</template>

<script>
import customer from '@/api/introduction/owner/customer'
export default {
  data() {
    return {
      OwnerContactQuery:{},
      OwnerContact:[],
      total: 0, // ## 总记录数
      pageNo: 1, // ## 页码
      pageSize: 5, // ## 每页显示记录数
      OwnerId:0
    }
  },
  created() {

    this.findPageOwnerContact()
  },
  methods:{
    findPageOwnerContact(pageNo=1){
      if (this.$route.params && this.$route.params.id){
        this.OwnerId=this.$route.params.id
        this.OwnerContactQuery.ownerId=this.$route.params.id
        this.pageNo=pageNo
        return customer.findPageOwner(this.pageNo,this.pageSize,this.OwnerContactQuery)
          .then(reps => {
            this.total=reps.data.total
            this.OwnerContact=reps.data.items
          })
      }else if (this.$route.params && this.$route.params.contactid){
        this.OwnerId=this.$route.params.contactid
        this.OwnerContactQuery.ownerId=this.$route.params.contactid
        this.pageNo=pageNo
        return customer.findPageOwner(this.pageNo,this.pageSize,this.OwnerContactQuery)
          .then(reps => {
            this.total=reps.data.total
            this.OwnerContact=reps.data.items
          })
      }

    },
    deleteById(ownerContactId){//根据id删除客户
      customer.deleteById(ownerContactId)
        .then(()=>{
          this.$message({
            type:"success",
            message:"成功删除"
          }),
            this.findPageOwnerContact()
        })
    },
    resetData(){//清空查询条件
      this.OwnerContactQuery={}
    }

  }
}
</script>

<style scoped>

</style>
