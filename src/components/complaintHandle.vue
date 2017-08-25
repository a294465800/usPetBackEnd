<template>
  <div class="info-check">

    <!--面包屑导航-->
    <Breadcrumb>
      <Breadcrumb-item>投诉反馈</Breadcrumb-item>
      <Breadcrumb-item>已处理</Breadcrumb-item>
    </Breadcrumb>
    <!--/面包屑导航-->

    <!--搜索框-->
<!--    <div class="search-wrap">
      <Input v-model="search" placeholder="请输入">
      <Select v-model="select" slot="prepend" style="width: 80px">
        <Option value="id">ID</Option>
        <Option value="name">昵称</Option>
      </Select>
      <Button slot="append" icon="ios-search"></Button>
      </Input>
    </div>-->
    <!--/搜索框-->

    <!--内容展示-->
    <div class="table-action" style="margin-top: 30px">
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
        columns: [
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
        ],
        complaintList: [],
        count: 0,
        request: {
          page: 1,
          state: 1
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
            this.$Message(res.data.msg)
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
