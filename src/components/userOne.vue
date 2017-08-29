<template>
  <div class="info-check" v-if="loading">
    <Spin size="large" fix></Spin>
  </div>

  <div class="info-check" v-else>

    <!--面包屑导航-->
    <Breadcrumb>
      <Breadcrumb-item>用户管理</Breadcrumb-item>
      <Breadcrumb-item href="/user/list">用户列表</Breadcrumb-item>
      <Breadcrumb-item>{{user.name}}</Breadcrumb-item>
    </Breadcrumb>
    <!--/面包屑导航-->

    <!--搜索框-->
    <div class="search-wrap" @keyup.enter="commoditySearch">
      <Input v-model="search" placeholder="请输入">
      <Select v-model="select" slot="prepend" style="width: 80px">
        <Option value="number">单号</Option>
        <Option value="store_name">店铺</Option>
      </Select>
      <Button slot="append" icon="ios-search" @click="commoditySearch"></Button>
      </Input>
    </div>
    <!--/搜索框-->

    <!--内容展示-->
    <div class="table-action">
      <b>表格尺寸</b>
      <Radio-group v-model="tableSize" type="button">
        <Radio label="large">大</Radio>
        <Radio label="default">中</Radio>
        <Radio label="small">小</Radio>
      </Radio-group>
    </div>
    <div class="info-check-table">
      <Table :columns="columns" :data="userBuys" :size="tableSize"></Table>
    </div>
    <!--/内容展示-->

    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="count" :current="request.page" @on-change="changePage" show-total></Page>
      </div>
    </div>

  </div>
</template>

<style>
  .info-check {
    position: relative;
    height: 100%;
    width: 100%;
    padding: 15px;
    display: flex;
    flex-direction: column;
  }

  .info-check-table {
    width: 100%;
    clear: both;
    flex: 1;
    overflow-y: scroll;
    overflow-x: hidden;
    padding-right: 15px;
  }

  td.ivu-table-expanded-cell {
    padding-left: 200px;
    text-indent: 2em;
  }

  .table-action {
    margin-bottom: 20px;
  }

  .table-action b {
    font-size: 15px;
    padding-left: 10px;
    margin-right: 20px;
    font-weight: normal;
  }

  .table-action button {
    margin: 0 30px;
  }

  .ivu-table-tbody .table-price span {
    color: #ff963d;
  }

  .ivu-table-tbody .table-price span:after {
    content: '元';
    display: inline-block;
    margin-left: 5px;
  }
</style>

<script>
  import expandRow from './expandUserOne.vue'
  export default {
    data() {
      return {
      	loading: true,
        user: null,
        tableSize: 'default',
        search: '',
        select: 'number',
        columns: [
          {
            title: '单号',
            key: 'number',
            align: 'center',
            width: 200
          },
          {
          	type: 'expand',
            width: 50,
            render: (h, params) => {
              return h(expandRow, {
                props: {
                  row: params.row
                }
              })
            }
          },
          {
            title: '商品名称',
            key: 'product_name',
            align: 'center'
          },
          {
            title: '付款/(元)',
            key: 'price',
            width: 150,
            align: 'center',
            className: 'table-price'
          },
          {
            title: '购买店铺',
            key: 'store_name',
            align: 'center',
            sortable: true
          },
          {
            title: '用户昵称',
            key: 'nickname',
            align: 'center'
          },
          {
            title: '电话',
            key: 'phone',
            align: 'center'
          },
          {
            title: '订单日期',
            key: 'createtime',
            align: 'center',
            width: 200,
            sortable: true
          }
        ],
        userBuys: [],

        count: 0,
        request: {
          page: 1,
          uid: this.$route.params.user.id
        }

      }
    },
    created(){
      this.user = this.$route.params.user
      this.getUserBuy(this.request)
    },

    methods: {

      /**
       * 请求封装
       * */
      getUserBuy(data){
        this.$http.get(this.$global.url + 'web/orders', {
          params: data
        }).then(res => {
        	this.loading = false
          if ('200' === res.data.code) {
            this.userBuys = res.data.data
            this.count = res.data.count
          } else {
            this.$Message.error(res.data.msg)
          }
        }).catch(error => {
          this.$Modal.error({
            title: '提示',
            content: error
          })
        })
      },

      changePage(page){
      	this.request.page = page
        this.getUserBuy(this.request)
      },


      /**
       * 商品搜索
       * */
      commoditySearch(){
        const tmp = {
          page: 1
        }
        tmp[this.select] = this.search
        tmp.uid = this.user.id
        this.request = tmp
        this.getUserBuy(tmp)
      },
    }
  }
</script>
