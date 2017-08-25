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
  <div class="info-check">

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
  import expandRow from './expandStoreList.vue'
  export default {
    data() {
      return {
        search: '',
        select: 'store_name',
        tableSize: 'default',
        columns: [
          {
            title: '店铺ID',
            key: 'id',
            width: 150,
            align: 'center'
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
            key: 'area',
            align: 'center',
            sortable: true
          },
          {
            title: '联系电话',
            key: 'tel',
            width: 150,
            align: 'center'
          },
          {
            title: '联系人',
            key: 'owner',
            width: 100,
            align: 'center'
          },
          {
            title: '入驻时间',
            key: 'time',
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
                  	click: ()=> {
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
                    click: ()=> {
                      this.goToStoreCommodity(params.row)
                    }
                  }
                }, '查看商品')
              ])
            }
          }
        ],
        stores: [
          {
            id: 1,
            name: '萌萌哒宠物店',
            area: '广东省广州市桥',
            address: '广东省广州市番禺区创意花园',
            tel: 18456122214,
            time: '2017-03-20',
            deal: 500,
            month: 12,
            year: 50,
            owner: '陈飞珠'
          },
          {
            id: 2,
            name: '萌萌哒宠物店',
            area: '广东省广州番禺',
            address: '广东省广州市番禺区创意花园',
            tel: 18456122214,
            time: '2017-06-20',
            deal: 20,
            month: 2.1,
            year: 21,
            owner: '刘爱琪'
          },
          {
            id: 3,
            name: '萌萌哒宠物店萌萌哒宠物店萌萌哒宠物店萌萌哒宠物店萌萌哒宠物店萌萌哒宠物店',
            area: '山东省广州大学城',
            address: '广东省广州市番禺区创意花园',
            tel: 18456122214,
            time: '2017-11-20',
            deal: 100,
            month: 1.2,
            year: 10,
            owner: '谢一波'
          },
          {
            id: 4,
            name: '萌萌哒宠物店',
            area: '广东省广州大学城',
            address: '广东省广州市番禺区创意花园',
            tel: 18456122214,
            time: '2017-01-19',
            deal: 111,
            month: 6,
            year: 110,
            owner: '白客'
          },
        ],
        passIds: []
      }
    },
    created(){
    },
    methods: {
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
