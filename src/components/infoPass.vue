<template>

  <div class="info-check" v-if="loading">
    <Spin size="large" fix></Spin>
  </div>

  <div class="info-check" v-else>

    <!--面包屑导航-->
    <Breadcrumb>
      <Breadcrumb-item>信息审核</Breadcrumb-item>
      <Breadcrumb-item>审核通过</Breadcrumb-item>
    </Breadcrumb>
    <!--/面包屑导航-->

    <!--搜索框-->
    <div class="search-wrap">
      <Input v-model="search" placeholder="请输入">
      <Select v-model="select" slot="prepend" style="width: 80px">
        <Option value="name">店铺名字</Option>
        <Option value="area">地区</Option>
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
      <Button type="error" @click="closeAll">关闭</Button>
    </div>
    <div class="info-check-table">
      <Table :columns="columns" :data="infoPasses" :size="tableSize" @on-selection-change="selectAll"></Table>
    </div>
    <!--/内容展示-->

    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="pages" :current="page" @on-change="changePage" show-total></Page>
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

<script>
  import expandRow from './expandInfoPass.vue'
  export default {
    data() {
      return {
        search: '',
        select: 'name',
        tableSize: 'default',
        loading: true,
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            type: 'index',
            width: 60,
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
            width: 120,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  }
                }, '查看'),
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  }
                }, '关闭')
              ]);
            }
          }
        ],
        infoPasses: [
          {
            id: 1,
            name: '萌萌哒宠物店',
            area: '广东省广州市桥',
            address: '广东省广州市番禺区创意花园',
            tel: 18456122214,
            time: '2017-03-20',
            owner: '张飞',
            main: '活体、服务、医疗',
            monthMoney: '10万',
            customer: '300人左右'
          },
          {
            id: 2,
            name: '萌萌哒宠物店',
            area: '广东省广州番禺',
            address: '广东省广州市番禺区创意花园',
            tel: 18456122214,
            time: '2017-06-20',
            owner: '张飞',
            main: '活体、服务、医疗',
            monthMoney: '10万',
            customer: '300人左右'
          },
          {
            id: 3,
            name: '萌萌哒宠物店萌萌哒宠物店萌萌哒宠物店萌萌哒宠物店萌萌哒宠物店萌萌哒宠物店',
            area: '山东省广州大学城',
            address: '广东省广州市番禺区创意花园',
            tel: 18456122214,
            time: '2017-11-20',
            owner: '张飞',
            main: '活体、服务、医疗',
            monthMoney: '10万',
            customer: '300人左右'
          },
          {
            id: 4,
            name: '萌萌哒宠物店',
            area: '广东省广州大学城',
            address: '广东省广州市番禺区创意花园',
            tel: 18456122214,
            time: '2017-01-19',
            owner: '张飞',
            main: '活体、服务、医疗',
            monthMoney: '10万',
            customer: '300人左右'
          },
        ],
        pages: 0,
        page: 1,
        passIds: []
      }
    },
    created(){
      this.$http({
        url: this.$global.url + 'web/stores',
        data: this.$qs.stringify({
          page: 1,
          state: 1
        })
      }).then(res => {
        if('200' === res.data.code){
          this.loading = false
          this.pages = res.data.pages
          this.infoPasses = res.data.data
        }else {
          this.$Message(res.data.msg)
        }
      })
    },
    methods: {
      changePage(e){
        console.log(e)
      },

      /**
       * 全选
       * */
      selectAll(groups){
        let arr = []
        for(let i in groups){
          arr.push(groups[i].id)
        }
        this.passIds = arr
      },

      /**
       * 全选通过
       * */
      closeAll(){
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定关闭所选的店铺吗？</p>',
          onOk: () => {
            console.log(this.passIds)
            this.$Message.info('已全部关闭');
          },
          onCancel: () => {
            this.$Message.warning('已取消');
          }
        })
      }
    }
  }
</script>
