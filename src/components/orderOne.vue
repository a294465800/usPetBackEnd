
<style scoped>
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

<template>
  <div class="info-check" v-if="loading">
    <Spin size="large" fix></Spin>
  </div>

  <div class="info-check" v-else>

    <!--面包屑导航-->
    <Breadcrumb>
      <Breadcrumb-item>订单查询</Breadcrumb-item>
      <Breadcrumb-item href="/order/list">订单列表</Breadcrumb-item>
      <Breadcrumb-item>{{commodity.title}} — {{commodity.store_name}}</Breadcrumb-item>
    </Breadcrumb>
    <!--/面包屑导航-->

    <!--搜索框-->
    <div class="search-wrap" @keyup.enter="searchOrderOne">
      <Input v-model="search" placeholder="请输入">
      <Select v-model="select" slot="prepend" style="width: 80px">
        <Option value="order_id">单号</Option>
        <Option value="nickname">昵称</Option>
      </Select>
      <Button slot="append" icon="ios-search" @click="searchOrderOne"></Button>
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

<script>
  import expandRow from './expandOrderOne.vue'
	export default {
		data() {
			return {
        commodity: null,
        tableSize: 'default',
        loading: true,
        search: '',
        select: 'order_id',
        columns: [
          {
            title: '单号',
            key: 'number',
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
            title: '商品名称',
            key: 'product_name',
            align: 'center'
          },
          {
            title: '价格/(元)',
            key: 'price',
            width: 150,
            align: 'center',
            className: 'table-price'
          },
          {
          	title: '评分',
            key: 'score',
            align: 'center',
            render: (h, params) => {
          		return h('Rate', {
          			props: {
                  disabled: true,
                  value: params.row.score
                }
              })
            }
          },
          {
            title: '买家',
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
            key: 'time',
            align: 'center',
            width: 200,
            sortable: true
          }
        ],
        userBuys: [],

        count: 0,
        request: {
        	page: 1,
          product_id: this.$route.params.order.id
        }

      }
		},

    created(){
			this.commodity = this.$route.params.order
      this.getAllOrder(this.request)
    },

    methods: {

    	/**
    	* 请求封装
    	* */
    	getAllOrder(data){
    		this.$http.get(this.$global.url + 'web/orders', {
    			params: data
        }).then( res => {
        	this.loading = false
          if('200' === res.data.code){
          	this.userBuys = res.data.data
            this.count = res.data.count
          } else {
          	this.$Message.error(res.data.msg)
          }
        }).catch(error => {
        	this.$Modal.confirm({
            title: '提示',
            content: error
          })
        })
      },

      /**
      * 页码
      * */
      changePage(page){
      	this.request.page = page
      	this.getAllOrder(this.request)
      },

      /**
      * 搜索
      * */
      searchOrderOne(){
      	let tmp = {
      		page: 1,
        }
        tmp[this.select] = this.search
        this.request = tmp
        this.getAllOrder(this.request)
      },
    }
	}
</script>
