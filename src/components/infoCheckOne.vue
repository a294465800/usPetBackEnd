<template>
  <div class="info-check" v-if="loading">
    <Spin size="large" fix></Spin>
  </div>
  <div class="info-check" v-else>
    <!--面包屑导航-->
    <Breadcrumb>
      <Breadcrumb-item>信息审核</Breadcrumb-item>
      <Breadcrumb-item href="/info/check">待审核</Breadcrumb-item>
      <Breadcrumb-item>{{store.name}}</Breadcrumb-item>
    </Breadcrumb>
    <!--/面包屑导航-->

    <div class="info-one-all">
      <div class="info-warp">
        <div v-for="(item, key) in store" class="info-item">
          <b>{{key}}：</b><span>{{item}}</span>
        </div>
      </div>

      <!--选择分类-->
      <div class="info-category">
        <div class="info-one--checkbox-title">选择店铺分类：</div>
        <!--<div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:10px;">-->
          <!--<Checkbox :value="checkAll" @click.prevent.native="categoryCheckAll">全选</Checkbox>-->
        <!--</div>-->
        <Checkbox-group v-model="checkAllGroup">
          <Checkbox :label="category.id" v-for="(category, index) in categories" :key="category.id"
                    style="margin: 0 5px;" @click.native="getAllCheck($event)" trueValue="1" falseValue="0">
            <img :src="category.url" alt="category.name" class="info-category-img">
            <span>{{category.name}}</span>
          </Checkbox>
        </Checkbox-group>
        <div class="info-btn">
          <Button type="primary" @click="addStoreCategory" class="info-on-submit">保存</Button>
        </div>
      </div>
      <!--/选择分类-->
    </div>
  </div>
</template>

<style scoped>
  .info-check {
    position: relative;
    height: 100%;
    width: 100%;
    padding: 15px;
    display: flex;
    flex-direction: column;
  }

  .info-one-all {
    flex: 1;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .info-warp {
    width: 700px;
    margin: 50px auto 0;
  }

  .info-item {
    margin: 5px 0;
    width: 350px;
    display: inline-block;
  }

  .info-category {
    width: 700px;
    margin: 20px auto 0;
  }

  .info-category-img {
    width: 30px;
  }

  .info-one--checkbox-title {
    font-size: 16px;
    margin: 10px 0;
    font-weight: 600;
  }

  .info-btn {
    text-align: center;
  }

  .info-on-submit {
    margin: 15px 0;
  }
</style>

<script>
  export default {
    data() {
      return {
        loading: true,
        store: null,
        checkAll: false,
        checkAllGroup: [],
        categories: [
          {
            id: 1,
            name: '美容',
            url: 'https://s-media-cache-ak0.pinimg.com/564x/8d/a1/ca/8da1ca0c1c7d94b0a2015e115f09834f--frenchie-puppies-for-sale-cute-puppies.jpg'
          },
          {
            id: 2,
            name: '洗澡',
            url: 'https://s-media-cache-ak0.pinimg.com/564x/8d/a1/ca/8da1ca0c1c7d94b0a2015e115f09834f--frenchie-puppies-for-sale-cute-puppies.jpg'
          },
          {
            id: 3,
            name: '剪发',
            url: 'https://s-media-cache-ak0.pinimg.com/564x/8d/a1/ca/8da1ca0c1c7d94b0a2015e115f09834f--frenchie-puppies-for-sale-cute-puppies.jpg'
          }
        ]
      }
    },

    created(){
      this.getStoreAll()
      this.getStoreCategory({all: 1})
    },

    methods: {

      /**
       * 请求封装
       * */
      //店铺详细数据请求
      getStoreAll(){
      	this.$http.get(this.$global.url + 'web/store/' + this.$route.params.id)
          .then(res => {
            if( '200' === res.data.code){
            	this.loading = false
            	this.store = res.data.data.store
              this.checkAllGroup = res.data.data.types
            } else {
            	this.$Message.error(res.data.msg)
            }
          }).catch(error => {
          	this.$Modal.confirm({
              title: '提示',
              content: error,
              onOk: () => {
                this.$router.go(-1)
              }
            })
        })
      },

      //分类请求
      getStoreCategory(data){
        this.$http.get(this.$global.url + 'web/store/types/list', {
          params: data,
        }).then(res => {
          if ('200' === res.data.code) {
            this.count = res.data.count
            this.categories = res.data.data
          } else {
            this.$Message.error(res.data.msg)
          }
        }).catch(error => {
          this.categories = []
          this.$Modal.error({
            title: '提示',
            content: error,
          })
        })
      },


      /**
       * 分类全选
       * */
/*      categoryCheckAll () {
        this.checkAll = !this.checkAll
        if (this.checkAll) {
          let tmpArr = []
          this.categories.forEach(item => {
            tmpArr.push(item.id)
          })
          this.checkAllGroup = tmpArr
        } else {
          this.checkAllGroup = [];
        }
      },*/

      /**
       * 监听每个checkbox
       * */
      getAllCheck(e){
      	if(e.target.tagName !== 'INPUT'){
      		return
        }
        this.singleSubmit(e)
      },


      /**
      * 单个提交请求
      * */
      singleSubmit(e){
      	this.$http.post(this.$global.url + 'web/store/bind', this.$qs.stringify({
          store_id: this.store.id,
          type_id: e.target.defaultValue
        })).then( res => {
        	if('200' !== res.data.code){
        		this.$Message.error(res.data.msg)
          }
        }).catch(error => {
        	this.$Modal.error({
            title: '提示',
            content: error
          })
        })
      },

      /**
       * 提交
       * */
      addStoreCategory(){
      	this.$Message.success('保存成功')
        this.$router.go(-1)
      }
    }
  }
</script>
