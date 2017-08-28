<template>
  <div class="info-check" v-if="loading">
    <Spin size="large" fix></Spin>
  </div>
  <div class="info-check" v-else>

    <!--面包屑导航-->
    <Breadcrumb>
      <Breadcrumb-item>投诉反馈</Breadcrumb-item>
      <Breadcrumb-item>待处理</Breadcrumb-item>
    </Breadcrumb>
    <!--/面包屑导航-->

    <!--搜索框-->
    <!--<div class="search-wrap">-->
    <!--<Input v-model="search" placeholder="请输入">-->
    <!--<Select v-model="select" slot="prepend" style="width: 80px">-->
    <!--<Option value="id">ID</Option>-->
    <!--<Option value="name">昵称</Option>-->
    <!--</Select>-->
    <!--<Button slot="append" icon="ios-search"></Button>-->
    <!--</Input>-->
    <!--</div>-->
    <!--/搜索框-->

    <!--内容展示-->
    <div class="table-action" style="margin-top: 30px">
      <b>表格尺寸</b>
      <Radio-group v-model="tableSize" type="button">
        <Radio label="large">大</Radio>
        <Radio label="default">中</Radio>
        <Radio label="small">小</Radio>
      </Radio-group>
      <Button type="info" @click="handleAll">处理</Button>
    </div>
    <div class="info-check-table">
      <Table :columns="columns" :data="complaintList" :size="tableSize" @on-selection-change="selectAll"></Table>
    </div>
    <!--/内容展示-->

    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="count" :current="request.page" @on-change="changePage" show-total></Page>
      </div>
    </div>

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
  export default {
    data() {
      return {
        search: '',
        select: 'id',
        tableSize: 'default',
        loading: true,
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: 'ID',
            key: 'id',
            align: 'center',
            width: 200,
            sortable: true
          },
          {
            title: '投诉内容',
            key: 'content',
            align: 'center',
          },
          {
            title: '联系电话',
            key: 'phone',
            width: 150,
            align: 'center'
          },
          {
            title: '投诉日期',
            key: 'createtime',
            align: 'center',
            width: 200,
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
                      this.complaintOk(params)
                    }
                  }
                }, '处理'),
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
        replay: '',
        count: 0,
        request: {
          page: 1,
          state: 0
        }
      }
    },
    created(){
      this.getFeedBack(this.request)
    },
    methods: {

      /**
       * 请求封装
       * */
      getFeedBack(data){
        this.$http.get(this.$global.url + 'web/list/feedback', {
          params: data,
        }).then(res => {
          if ('200' === res.data.code) {
            this.loading = false
            this.count = res.data.count
            this.complaintList = res.data.data
          } else {
            this.$Message.error(res.data.msg)
          }
        }).catch(error => {
          this.complaintList = []
          this.$Modal.error({
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
        this.getFeedBack(this.request)
      },

      /**
       * 确认投诉
       * */
      complaintOk(data){
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定把该投诉标记为已处理吗？</p>',
          onOk: () => {
            this.complaintList.splice(data.index, 1)
            this.handleRequest([data.row.id])
            this.$Message.success('已处理');
          },
          onCancel: () => {
            this.$Message.warning('已取消');
          }
        })
      },

      /**
       * 回复投诉用户
       * */
      /*replayFunc(data){
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
      },*/

      /**
       * 全选
       * */
      selectAll(all){
        let arr = []
        for (let i in all) {
          arr.push(all[i].id)
        }
        this.okIds = arr
      },

      /**
       * 批量处理
       * */
      handleAll(){
        if (this.okIds.length) {
          this.$Modal.confirm({
            title: '提示',
            content: '<p>确定把所有选中内容标记为“已处理”吗？</p>',
            onOk: () => {
              const arr = [].concat(this.okIds)
              this.handleRequest(arr)
              this.$Message.info('已全部处理')
            },
            onCancel: () => {
              this.$Message.warning('已取消')
            }
          })
        }
      },

      /**
       * 处理，请求
       * */
      handleRequest(ids){
        this.$http.post(this.$global.url + 'web/feedback/finish', this.$qs.stringify({
          id: ids,
        })).then(res => {
          if ('200' === res.data.code) {
            this.$Message.info('已全部处理')
            this.getFeedBack({page: 1, satate: 0,})
          } else {
            this.$Message(res.data.msg)
          }
        }).catch(error => {
          this.complaintList = []
          this.$Modal.error({
            title: '提示',
            content: error
          })
        })
      }

    }
  }
</script>
