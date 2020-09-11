<template>
  <div id="app-container">
    <el-form label-width="130px">
      <el-form-item label="姓名">
        <el-col :span="5">
          <el-input v-model="OwnerContact.name"/>
        </el-col>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="OwnerContact.sex" clearable placeholder="请选择">
          <el-option :value="1" label="男"/>
          <el-option :value="0" label="女"/>
        </el-select>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-date-picker
          v-model="OwnerContact.dateOfBirth"
          type="date"
          placeholder="选择出生日期"
          value-format="yyyy-MM-dd"
          default-time=""
        />
      </el-form-item>
      <el-form-item label="职务">
        <el-col :span="5">
          <el-input v-model="OwnerContact.duties"/>
        </el-col>
      </el-form-item>
      <el-form-item label="手机号">
        <el-col :span="5">
          <el-input v-model="OwnerContact.mobilePhone"/>
        </el-col>
      </el-form-item>
      <el-form-item label="座机号">
        <el-col :span="5">
          <el-input v-model="OwnerContact.telePhone"/>
        </el-col>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-col :span="5">
          <el-input v-model="OwnerContact.email"/>
        </el-col>
      </el-form-item>
      <el-form-item label="QQ">
        <el-col :span="5">
          <el-input v-model="OwnerContact.qq"/>
        </el-col>
      </el-form-item>
      <el-form-item label="公司地址">
        <el-col :span="5">
          <el-input v-model="OwnerContact.companyAddress"/>
        </el-col>
      </el-form-item>
      <el-form-item label="备注">
        <el-col :span="5">
          <el-input v-model="OwnerContact.remarks"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOwnerContact()">保存</el-button>
      </el-form-item>
      </el-form>

  </div>
</template>

<script>
import customer from '@/api/introduction/owner/customer'
export default {
  data() {
    return {
      OwnerContact:{
        owner:{
          id:1
        }
      },
      saveBtnDisabled:false
    }
  },
  created() {
    console.log(this.$route.params.ownerid)
  },
  methods:{

    saveOwnerContact(){
      this.saveBtnDisabled=true
      this.OwnerContact.owner.id=this.$route.params.ownerid
      customer.saveOwnerContact(this.OwnerContact)
        .then(()=>{
          this.$message({
            type:'success',
            message:"新增成功！"
          }),
            this.$router.push('/owner/customer/'+this.$route.params.ownerid)
        })
    }
  }
}
</script>

<style scoped>

</style>
