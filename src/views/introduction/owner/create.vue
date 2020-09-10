<template>
  <div id="app-container">
    <el-form label-width="130px">
      <el-form-item label="版权名">
        <el-col :span="5">
          <el-input v-model="owner.copyrightName"/>
        </el-col>
      </el-form-item>
      <el-form-item label="公司名">
        <el-col :span="5">
          <el-input v-model="owner.company"/>
        </el-col>
      </el-form-item>
      <el-form-item label="备注名">
        <el-col :span="5">
          <el-input v-model="owner.noteName"/>
        </el-col>
      </el-form-item>
      <el-form-item label="合作状态">
        <el-select v-model="owner.cooperationStatus" clearable placeholder="请选择">
          <el-option :value="1" label="生效"/>
          <el-option :value="0" label="失效"/>
        </el-select>
      </el-form-item>
      <el-form-item label="版权简介">
        <el-input v-model="owner.info" :rows="10" type="textarea"/>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOwner()">保存</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import owner from '@/api/introduction/owner'

  export default {
    data() {
      return {
        owner: {},
        saveBtnDisabled: false, // ##不禁用保存按钮
        BASE_API: process.env.VUE_APP_BASE_API
      }
    },
    created() {
    },
    methods: {
      saveOwner() {
        this.saveBtnDisabled = true
        owner.saveOwner(this.owner)
          .then(reps =>
              this.$message({
                type: 'success',
                message: '成功'
              }),

            this.$router.push('/owner/list'))
      }
    }
// name: "create"
  }
</script>

<style scoped>

</style>
