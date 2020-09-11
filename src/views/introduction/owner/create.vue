<template>
  <div id="app-container">
    <el-form label-width="130px">
      <br>
      <br>
      <br>
      <br>
      <br>
      <el-form-item label="版权名">
        <el-col :span="5">
          <el-input v-model="Owner.copyrightName"/>
        </el-col>
      </el-form-item>
      <el-form-item label="公司名">
        <el-col :span="5">
          <el-input v-model="Owner.company"/>
        </el-col>
      </el-form-item>
      <el-form-item label="备注名">
        <el-col :span="5">
          <el-input v-model="Owner.noteName"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOwner()">保存</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import owner from '@/api/introduction/owner/owner'
export default {
  data(){
    return{
      Owner:{},
      saveBtnDisabled:false
    }
  },
  methods:{
    saveOwner(){
      this.saveBtnDisabled=true // 点击后禁用 防止多次点击
      owner.saveOwner(this.Owner)
        .then(()=>{
          this.$message({
            type:'success',
            message:'添加成功！'
          })
          this.$router.push('/owner/list')
        })
    }
  }
}
</script>

<style scoped>

</style>
