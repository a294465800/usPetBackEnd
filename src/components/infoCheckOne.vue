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

    <div class="info-warp">
      <div v-for="(item, key) in store" class="info-item">
        <b>{{key}}：</b><span>{{item}}</span>
      </div>
    </div>

    <!--选择分类-->
    <div class="info-category">
      <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
        <Checkbox
          :value="checkAll"
          @click.prevent.native="categoryCheckAll">全选</Checkbox>
      </div>
      <Checkbox-group v-model="checkAllGroup" @on-change="getAllCheck">
        <Checkbox :label="category.id" v-for="(category, index) in categories">
          <img :src="category.url" alt="category.name" class="info-category-img">
          <span>{{category.name}}</span>
        </Checkbox>
      </Checkbox-group>
    </div>
    <!--/选择分类-->
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
</style>

<script>
  export default {
    data() {
      return {
        loading: false,
        store: this.$route.params,
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
//      console.log(this.$route.params)
    },

    methods: {

    	/**
    	* 分类全选
    	* */
      categoryCheckAll () {
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
      },

      /**
      * 监听多选
      * */
      getAllCheck(e){
      	console.log(e)
      }
    }
  }
</script>
