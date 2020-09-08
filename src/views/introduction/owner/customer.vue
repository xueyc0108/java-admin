<template>
  <div id="app-container">
    <br>
<!--    <el-form :inline="true" class="demo-form-inline">-->
<!--      <el-form-item>-->
<!--      </el-form-item>-->
<!--      <el-form-item>-->
<!--        <el-input v-model="" placeholder="职位" />-->
<!--      </el-form-item>-->
<!--      <el-form-item>-->
<!--        <el-input v-model="" placeholder="姓名" />-->
<!--      </el-form-item>-->
<!--      <el-button type="primary" @click="">查询</el-button>-->
<!--      <el-button type="primary" @click="">清空</el-button>-->
<!--      <router-link :to="'/owner/create'">-->
<!--        <el-button type="primary">添加客户</el-button>-->
<!--      </router-link>-->
<!--    </el-form>-->

    <!-- 列表 -->
    <el-table :data="OwnerContact" border fit highlight-current-row>
      <el-table-column prop="" label="版权名"  align="center"/>
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
          <!--          <el-button type="danger" size="mini" @click="deleteBook(scope.row.id, scope.row.status)">删除</el-button>-->
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
      @current-change="getPageBookList">
    </el-pagination>

  </div>
</template>

<script>
export default {
  data() {
    return {
      QueryOwner:{},
      OwnerContact:[
        {
          sex:1
        }
      ],
      total: 0, // ## 总记录数
      pageNo: 1, // ## 页码
      pageSize: 5, // ## 每页显示记录数
    }
  }
}
</script>

<style scoped>

</style>
