
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
      <Breadcrumb-item>成交订单</Breadcrumb-item>
    </Breadcrumb>
    <!--/面包屑导航-->

    <!--搜索框-->
    <div class="search-wrap" @keyup.enter="orderSearch">
      <Input v-model="search" placeholder="请输入">
      <Select v-model="select" slot="prepend" style="width: 80px">
        <Option value="number">单号</Option>
        <Option value="nickname">昵称</Option>
        <Option value="product_name">商品名称</Option>
        <Option value="store_name">店铺</Option>
      </Select>
      <Button slot="append" icon="ios-search" @click="orderSearch"></Button>
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
  import expandRow from './expandOrderDeal.vue'
	export default {
		data() {
			return {
        tableSize: 'default',
        search: '',
        select: 'number',
        loading: true,
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
            sortable: true,
            className: 'table-price'
          },
          {
            title: '买家',
            key: 'nickname',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  on:{
                    click: () => {
                      this.goToUserOne(params)
                    }
                  }
                }, params.row.nickname)
              ])
            }
          },
          {
            title: '店铺',
            key: 'store_name',
            align: 'center',
            sortable: true
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

        /**
        * 请求所需数据
        * */
        request: {
        	page: 1,
        },
        count: 0

      }
		},

    created(){
      this.getOrderList(this.request)
    },

    methods: {
      changePage(page){
      	this.request.page = page
        this.getOrderList(this.request)
      },

      /**
       * 单用户跳转
       * */
      goToUserOne(user){
        this.$router.push({name: 'user_one', params: {id: user.row.id, user: user.row}})
      },

      /**
      * 请求封装
      * */
      getOrderList(data){
        this.$http.get(this.$global.url + 'web/orders', {
        	params: data,
        }).then( res => {
        	if('200' === res.data.code){
        		this.loading = false
        		this.userBuys = res.data.data
            this.count = Number(res.data.count)
          }else {
        		this.$Message.error(res.data.msg)
          }
        }).catch(error => {
          this.userBuys = []
          this.$Modal.error({
            title: '提示',
            content: error
          })
        })
      },

      /**
      * 搜索
      * */
      orderSearch(){
      	const data = {
      		page: 1
        }
        data[this.select] = this.search
        this.request = data
        this.getOrderList(data)
      }
    }
	}
</script>
