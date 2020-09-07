<template>
  <div id="app-container">
    <el-form label-width="130px">
      <el-form-item label="书名">
        <el-col :span="5">
          <el-input v-model="book.title"/>
        </el-col>
      </el-form-item>
      <el-form-item label="作者">
        <el-col :span="5">
          <el-input v-model="book.author"/>
        </el-col>
      </el-form-item>
      <!-- TODO 分类 -->
      <template>
        <el-form-item label="一级分类" >
        <el-select  v-model="value1" placeholder="请选择" @change="select1()">
          <el-option

            v-for="(item,index) in options1"
            :key="item.index"
            :label="item.name"
            :value="item.code">
          </el-option>
        </el-select>
        </el-form-item>
      </template>
      <template>
        <el-form-item label="二级分类">
          <el-select v-model="value2" placeholder="请选择" >
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
      </template>
      <!-- TODO 版权 -->
      <el-form-item label="授权开始时间">
        <el-date-picker
          v-model="book.startTime"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item label="授权结束时间">
        <el-date-picker
          v-model="book.endTime"
          type="datetime"
          placeholder="选择结束时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item label="连载">
        <el-select v-model="book.serialize" clearable placeholder="请选择">
          <el-option :value="1" label="是"/>
          <el-option :value="0" label="否"/>
        </el-select>
      </el-form-item>
      <el-form-item label="全本收费">
        <el-select v-model="book.free" clearable placeholder="请选择">
          <el-option :value="1" label="收费"/>
          <el-option :value="0" label="免费"/>
        </el-select>
      </el-form-item>
      <el-form-item label="原创">
        <el-select v-model="book.original" clearable placeholder="请选择">
          <el-option :value="1" label="是"/>
          <el-option :value="0" label="否"/>
        </el-select>
      </el-form-item>
      <el-form-item label="简介">
        <el-input v-model="book.info" :rows="10" type="textarea"/>
      </el-form-item>
      <!-- TODO 书封 -->
      <el-form-item label="书封">
        <el-upload
          class="avatar-uploader"
          :action="BASE_API+'/oss/uploadFile'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="book.imageUrl" :src="book.imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveBook()">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import book from '@/api/cms/book'
export default {
  data() {
    return {
      book: {
        classification1:{},
        classification2:{},
        imageUrl:''
      },
      saveBtnDisabled: false, // ##不禁用保存按钮
      BASE_API: process.env.VUE_APP_BASE_API,
      classification:{},
      options1: [],
      options2: [],
      value1:'',
      value2:''

    }

  },
  created() {
    this.select(1)
  },
  methods: {
    saveBook(){
      this.book.classification1.code=this.value1
      this.book.classification2.code=this.value2
      this.saveBtnDisabled=true
      book.saveBook(this.book)
        .then(reps=>
            this.$message({
              type:'success',
              message:'成功'
            }),

            this.$router.push('/cms/book/list')
        )
    },
    select(level){
      if (level==1){
        this.classification.level=level
      }
      book.queryByLevel(this.classification)
      .then(reps=>{
       this.options1= reps.data.classification
        // this.options2.splice(this.options2.length)
        // this.select1()
      })


    },
    select1(){
      // console.log(this.value1)
      this.classification.level=2
      // this.classification={}
      this.options2=[]
      this.classification.code=this.value1
      book.queryByLevel(this.classification)
        .then(reps=>{
          this.options2= reps.data.classification

        })
    },
    handleAvatarSuccess(res, file) {
      this.book.imageUrl = res.data.url;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }

  }

}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
