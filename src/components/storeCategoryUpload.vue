
<template>
  <div class="info-check store--category-upload">
    <!--面包屑导航-->
    <Breadcrumb>
      <Breadcrumb-item>店铺管理</Breadcrumb-item>
      <Breadcrumb-item href="/store/category">店铺分类</Breadcrumb-item>
      <Breadcrumb-item>店铺分类添加 / 修改</Breadcrumb-item>
    </Breadcrumb>
    <!--/面包屑导航-->

    <div class="store-category-form">
      <Form :model="submitData" :label-width="80">
        <Form-item label="分类名">
          <Input v-model="submitData.name" placeholder="请输入"></Input>
        </Form-item>
        <Input v-model="submitData.baseurl" style="display: none"></Input>
        <div  style="margin-left: 80px">
          <div class="demo-upload-list" v-for="item in uploadList">
            <template v-if="item.status === 'finished'">
              <img :src="item.url">
              <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
              </div>
            </template>
            <template v-else>
              <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
          </div>
          <Upload
            ref="upload"
            :show-upload-list="false"
            :default-file-list="defaultIcon"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            type="drag"
            action="//jsonplaceholder.typicode.com/posts/"
            style="display: inline-block;width:58px;">
            <div style="width: 58px;height:58px;line-height: 58px;">
              <Icon type="camera" size="20"></Icon>
            </div>
          </Upload>
          <Modal title="查看图片" v-model="visible">
            <img :src="currentImg.url" v-if="visible" style="width: 100%">
          </Modal>


        </div>
        <Form-item style="margin-top:30px;">
          <Button type="primary">提交</Button>
          <Button type="ghost" style="margin-left: 8px">取消</Button>
        </Form-item>
      </Form>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        submitData: {
        	name: '',
          baseurl: ''
        },
        defaultIcon: [],
        visible: false,
        uploadList: [],
        currentImg: null,
      }
    },
    created(){
    	const category = this.$route.params.category
      if(category){
    		this.defaultIcon = [{name: category.name, url: category.src}]
        this.submitData.name = category.name
        this.submitData.baseurl = category.url
      }
    },
    methods: {
    	/**
    	* 预览
    	* */
      handleView (item) {
        this.currentImg = item;
        this.visible = true;
      },

      /**
      * 移除
      * */
      handleRemove (file) {
        // 从 upload 实例删除数据
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      },

      /**
      * 上传成功
      * */
      handleSuccess (res, file) {
        // 因为上传过程为实例，这里模拟添加 url
        file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
        file.name = '7eb99afb9d5f317c912f08b5212fd69a';
      },

      /**
      * 格式错误
      * */
      handleFormatError (file) {
        this.$Notice.warning({
          title: '文件格式不正确',
          desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
        });
      },

      /**
      * 大小超出限制
      * */
      handleMaxSize (file) {
        this.$Notice.warning({
          title: '超出文件大小限制',
          desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
        });
      },

      /**
      * 上传之前操作
      * */
      handleBeforeUpload () {
        const check = this.uploadList.length < 1;
        if (!check) {
          this.$Notice.warning({
            title: '最多只能上传 1 张图片，请先删除原图片。'
          });
        }
        return check;
      }
    },
    mounted () {
      this.uploadList = this.$refs.upload.fileList;
    }
  }
</script>
<style scoped>
  .info-check {
    position: relative;
    height: 100%;
    width: 100%;
    padding: 15px;
    display: flex;
    flex-direction: column;
  }

  .store--category-upload {
    display: block;
  }

  .store-category-form {
    width: 700px;
    margin: 30px auto 0;
  }

  .demo-upload-list {
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;
  }

  .demo-upload-list img {
    width: 100%;
    height: 100%;
  }

  .demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
  }

  .demo-upload-list:hover .demo-upload-list-cover {
    display: block;
  }

  .demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
