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
    padding-left: 120px;
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
</style>

<template>
  <div class="info-check" v-if="loading">
    <Spin size="large" fix></Spin>
  </div>
  <div class="info-check" v-else>

    <!--面包屑导航-->
    <Breadcrumb>
      <Breadcrumb-item>店铺管理</Breadcrumb-item>
      <Breadcrumb-item>店铺列表</Breadcrumb-item>
    </Breadcrumb>
    <!--/面包屑导航-->

    <!--搜索框-->
    <div class="search-wrap">
      <Input v-model="search" placeholder="请输入">
        <Select v-model="select" slot="prepend" style="width: 80px">
          <Option value="store_name">店铺名字</Option>
          <Option value="area">地区</Option>
          <Option value="store_owner">联系人</Option>
        </Select>
        <Button slot="append" icon="ios-search"></Button>
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
      <Table :columns="columns" :data="stores" :size="tableSize"></Table>
    </div>
    <!--/内容展示-->

    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="100" :current="1" @on-change="changePage" show-total></Page>
      </div>
    </div>

  </div>
</template>

<script>
  import expandRow from './expandInfoPass.vue'
  export default {
    data() {
      return {
        search: '',
        select: 'store_name',
        tableSize: 'default',
        loading: true,
        columns: [
          {
          	title: 'ID',
            key: 'id',
            width: 120,
            align: 'center',
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
            title: '店铺名',
            key: 'name',
            align: 'center'
          },
          {
            title: '地区',
            key: 'location',
            align: 'center',
            sortable: true
          },
          {
            title: '联系电话',
            key: 'phone',
            width: 150,
            align: 'center'
          },
          {
            title: '联系人',
            key: 'contact',
            width: 100,
            align: 'center'
          },
          {
            title: '申请时间',
            key: 'createtime',
            align: 'center',
            width: 150,
            sortable: true
          },
          {
            title: '操作',
            key: 'action',
            width: 200,
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
                  		this.goToStore(params.row)
                    }
                  }
                }, '查看流水'),
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.goToStoreCommodity(params.row)
                    }
                  }
                }, '查看商品')
              ]);
            }
          }
        ],
        stores: [],
        passIds: [],

        count: 0,
        request: {
        	page: 1,
          state: 1,
        }
      }
    },
    created(){
    	this.getInfoPass(this.request)
    },
    methods: {

      /**
       * 请求封装
       * */
      getInfoPass(data){
        this.$http.get(this.$global.url + 'web/stores', {
          params: data,
        }).then(res => {
          if ('200' === res.data.code) {
            this.loading = false
            this.count = Number(res.data.count)
            this.stores = res.data.data
          } else {
            this.$Message.error(res.data.msg)
          }
        }).catch(error => {
          this.infoPasses = []
          this.$Modal.error({
            title: '提示',
            content: error
          })
        })
      },

      /**
      * 页码
      * */
      changePage(e){
        console.log(e)
      },

      /**
      * 查看店铺具体流水
      * */
      goToStore(store){
      	this.$router.push({name: 'store_chart', params: {store: store}})
      },

      /**
      * 查看店铺拥有商品
      * */
      goToStoreCommodity(store){
      	this.$router.push({name: 'store_commodity', params: {store: store}})
      }
    }
  }
</script>
