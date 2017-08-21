<template>
  <div class="info-check">

    <!--面包屑导航-->
    <Breadcrumb>
      <Breadcrumb-item>投诉反馈</Breadcrumb-item>
      <Breadcrumb-item>已处理</Breadcrumb-item>
    </Breadcrumb>
    <!--/面包屑导航-->

    <!--搜索框-->
    <div class="search-wrap">
      <Input v-model="search" placeholder="请输入">
      <Select v-model="select" slot="prepend" style="width: 80px">
        <Option value="id">ID</Option>
        <Option value="name">昵称</Option>
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
      <Table :columns="columns" :data="complaintList" :size="tableSize"></Table>
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
</style>

<script>
  import expandRow from './expandComplaintList.vue'
  export default {
    data() {
      return {
        search: '',
        select: 'id',
        tableSize: 'default',
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
            title: '用户昵称',
            key: 'name',
            align: 'center',
            width: 200
          },
          {
            title: '投诉店铺',
            key: 'store',
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
            title: '投诉日期',
            key: 'create_time',
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
                      this.replayFunc(params)
                    }
                  }
                }, '回复')
              ])
            }
          }
        ],
        complaintList: [
          {
            id: 1,
            name: '爱吃鱼的猫',
            store: '萌萌哒宠物店',
            tel: 18456122214,
            create_time: '2017-03-20',
            content: '哎呀，这个店家态度很不好啊，很烦啊！！！！！！！！！！！！！'
          },
          {
            id: 2,
            name: '爱吃鱼的猫',
            store: '萌萌哒宠物店',
            tel: 18456122214,
            create_time: '2017-03-20',
            content: '哎呀，这个店家态度很不好啊，很烦啊！！！！！！！！！！！！！'
          },
          {
            id: 3,
            name: '爱吃鱼的猫',
            store: '萌萌哒宠物店',
            tel: 18456122214,
            create_time: '2017-03-20',
            content: '哎呀，这个店家态度很不好啊，很烦啊！！！！！！！！！！！！！'
          },
          {
            id: 4,
            name: '爱吃鱼的猫',
            store: '萌萌哒宠物店',
            tel: 18456122214,
            create_time: '2017-03-20',
            content: '哎呀，这个店家态度很不好啊，很烦啊！！！！！！！！！！！！！'
          },
        ],
        okIds: [],
        replay: ''
      }
    },
    created(){
    },
    methods: {
      changePage(e){
        console.log(e)
      },

      /**
      * 回复投诉用户
      * */
      replayFunc(data){
        this.$Modal.confirm({
          render: (h) => {
            return h('Input', {
              props: {
                autofocus: true,
                placeholder: '请输入回复内容···'
              },
              on: {
                input: (val) => {
                  this.replay = val
                }
              }
            })
          },
          onOk: () => {
          	this.$Message.info('已回复')
          },
          onCancel: () => {
          	this.$Message.warning('已取消')
          }
        })
      },

    }
  }
</script>
