<template>
  <div class="info-check">

    <!--面包屑导航-->
    <Breadcrumb>
      <Breadcrumb-item>店铺管理</Breadcrumb-item>
      <Breadcrumb-item href="/store/list">店铺列表</Breadcrumb-item>
      <Breadcrumb-item>{{store.name}}</Breadcrumb-item>
    </Breadcrumb>
    <!--/面包屑导航-->

    <!--搜索框-->
    <div class="search-wrap">
      <Input v-model="search" placeholder="请输入">
        <Select v-model="select" slot="prepend" style="width: 80px">
          <Option value="commodity_id">商品ID</Option>
          <Option value="commodity">商品名称</Option>
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
      <Table :columns="columns" :data="orderList" :size="tableSize"></Table>
    </div>
    <!--/内容展示-->

    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="100" :current="1" @on-change="changePage" show-total></Page>
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
        select: 'commodity_id',
        tableSize: 'default',
        store: null,
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
            key: 'store',
            align: 'center',
            sortable: true
          },
          {
            title: '商品名称',
            key: 'commodity',
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
            title: '创建日期',
            key: 'create_time',
            align: 'center',
            width: 250,
            sortable: true
          }
        ],
        orderList: [
          {
            id: 1,
            commodity: '狗狗洗澡',
            store: '萌萌哒宠物店',
            create_time: '2017-06-20',
            price: '50',
            deal: '5000',
            buy_times: 24
          },
          {
            id: 2,
            commodity: '狗狗洗澡',
            store: '萌萌哒宠物店',
            create_time: '2017-04-11',
            price: '23',
            deal: '5000',
            buy_times: 4
          },
          {
            id: 3,
            commodity: '狗狗洗澡',
            store: '丑丑哒宠物店',
            create_time: '2017-03-20',
            price: '553',
            deal: '15000',
            buy_times: 1
          },
          {
            id: 4,
            commodity: '狗狗洗澡',
            store: '萌萌哒宠物店',
            create_time: '2017-12-20',
            price: '150',
            deal: '500',
            buy_times: 240
          },
        ],
        passIds: []
      }
    },
    created(){
    	this.store = this.$route.params.store
    },
    methods: {
      changePage(e){
        console.log(e)
      },

    }
  }
</script>
