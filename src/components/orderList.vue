<template>
  <div class="info-check" v-if="loading">
    <Spin size="large" fix></Spin>
  </div>

  <div class="info-check" v-else>

    <!--面包屑导航-->
    <Breadcrumb>
      <Breadcrumb-item>订单查询</Breadcrumb-item>
      <Breadcrumb-item>商品列表</Breadcrumb-item>
    </Breadcrumb>
    <!--/面包屑导航-->

    <!--搜索框-->
    <div class="search-wrap" @keyup.enter="commoditySearch">
      <Input v-model="search" placeholder="请输入">
      <Select v-model="select" slot="prepend" style="width: 80px">
        <Option value="product_id">商品ID</Option>
        <Option value="product_name">商品名称</Option>
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
      <Table :columns="columns" :data="orderList" :size="tableSize"></Table>
    </div>
    <!--/内容展示-->

    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="count" :current="page" @on-change="changePage" show-total></Page>
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
  import expandRow from './expandOrderList.vue'
  export default {
    data() {
      return {
        search: '',
        select: 'product_id',
        tableSize: 'default',
        loading: true,
        columns: [
          {
            title: 'ID',
            key: 'id',
            align: 'center',
            width: 200,
            sortable: true
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
            title: '所属店铺',
            key: 'store_name',
            align: 'center',
            sortable: true
          },
          {
            title: '商品名称',
            key: 'title',
            align: 'center'
          },
          {
            title: '金额/(元)',
            key: 'entity_price',
            width: 150,
            align: 'center',
            sortable: true,
            className: 'table-price'
          },
          {
            title: '原价/(元)',
            key: 'price',
            width: 150,
            align: 'center',
            sortable: true,
            className: 'table-price'
          },
          {
            title: '订单日期',
            key: 'createtime',
            align: 'center',
            width: 200,
            sortable: true
          },
          {
            title: '操作',
            key: 'action',
            width: 120,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.goToCommodity(params.row)
                    }
                  }
                }, '查看所有')
              ])
            }
          }
        ],
        orderList: [],
        passIds: [],

        /**
         * 请求相关
         * */
        page: 1,
        count: 0,
        request: {
        	page: 1,
        }
      }
    },
    created(){
      this.getCommodityList(1)
    },
    methods: {
    	/**
    	* 页码跳转
    	* */
      changePage(page){
      	this.request.page = page
        this.getCommodityList(this.request)
      },

      /**
       * 页面请求封装
       * */
      getCommodityList(data){
        this.$http.get(this.$global.url + 'web/products', {
          params: data,
        }).then(res => {
          if ('200' === res.data.code) {
          	this.loading = false
            this.count = Number(res.data.pages)
            this.orderList = res.data.data
          } else {
            this.$Message.error(res.data.msg)
          }
        }).catch(error => {
          this.orderList = []
          this.$Modal.error({
            title: '提示',
            content: error
          })
        })
      },

      /**
      * 商品搜索
      * */
      commoditySearch(){
      	const tmp = {
      		page: 1
        }
      	tmp[this.select] = this.search
        this.request = tmp
        this.getCommodityList(tmp)
      },

      /**
       * 单条商品跳转
       * */
      goToCommodity(params){
        this.$router.push({name: 'order_one', params: {order: params}})
      }
    }
  }
</script>
