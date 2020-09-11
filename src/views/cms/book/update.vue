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
        <el-form-item label="一级分类">
          <el-select v-model="book.firstSort" @change="getSecondCategoryList" placeholder="请选择" >
            <el-option
              v-for="item in firstCategoryList"
              :key="item.id"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </template>
      <template>
        <el-form-item label="二级分类">
          <el-select v-model="book.secondSort" placeholder="请选择">
            <el-option
              v-for="item in secondCategoryList"
              :key="item.id"
              :label="item.title"
              :value="item.id">
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
import category from '@/api/cms/category'
export default {
  data() {
    return {
      book: {
        imageUrl:'',
        firstSort:'',
        secondSort:''
      },
      saveBtnDisabled: false, // ##不禁用保存按钮
      BASE_API: process.env.VUE_APP_BASE_API,
      firstCategoryList: [], // ## 一级分类列表
      secondCategoryList: [],// ## 二级分类列表
      url:''
    }
  },
  created() {
    this.init()
  },
  methods: {
    saveBook(){
      this.saveBtnDisabled=true
      // if (this.url!=book.imageUrl && this.url!='') { //当页面初始化时的图片路径和提交时的图片路径不一致时
      //   book.deleteFile(this.url)  //删除被替换的图片
      // }
      console.log("book:"+this.book.imageUrl)
      book.updateBook(this.book)
        .then(reps=>
            this.$message({
              type:'success',
              message:'成功'
            }),
          this.$router.push('/cms/book/list')
        )
    },
    init(){
      if (this.$route.params && this.$route.params.id){
        book.getBookById(this.$route.params.id).then(reps=> {
          // this.url=reps.data.book.imageUrl  //得到图片路径  以便判断是否更换图片
          this.book=reps.data.book
          category.getCategoryList()
            .then(response => {
              this.firstCategoryList = response.data.items
              for (let i = 0; i < this.firstCategoryList.length; i++) {
                // ## 当前选择的一级分类ID等于数据集合一级分类ID
                if (this.firstCategoryList[i].id == this.book.firstSort ) {
                  this.secondCategoryList = this.firstCategoryList[i].secondCategoryList
                  // this.book.firstSort+=''
                  // this.book.secondSort+=''
                }
              }
            })
        })
      }
    },
    getSecondCategoryList(value){
      this.book.secondSort = ''
      for (let i = 0; i < this.firstCategoryList.length; i++) {
        if (value === this.firstCategoryList[i].id){
          this.secondCategoryList=this.firstCategoryList[i].secondCategoryList
        }
      }
    }
    ,
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
