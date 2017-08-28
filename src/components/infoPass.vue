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
    <div class="search-wrap" @keyup.enter="storeSearch">
      <Input v-model="search" placeholder="请输入">
      <Select v-model="select" slot="prepend" style="width: 80px">
        <Option value="name">店铺名字</Option>
      </Select>
      <Button slot="append" icon="ios-search" @click="storeSearch"></Button>
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
                  },
                  on: {
                    click: () => {
                      this.showAllNews(params.row)
                    }
                  }
                }, '查看'),
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.closeStore(params.index, params.row.id)
                    }
                  }
                }, '关闭')
              ]);
            }
          }
        ],
        infoPasses: [],
        count: 0,
        request: {
          page: 1,
          state: 1,
        },
        closeIds: [],
      }
    },
    created(){
      this.getInfoPass(this.request)
    },
    methods: {
      changePage(page){
        this.request.page = page
        this.getInfoCheck(this.request)
      },

      /**
       * 全选
       * */
      selectAll(groups){
        let arr = []
        for (let i in groups) {
          arr.push(groups[i].id)
        }
        this.closeIds = arr
      },

      /**
       * 全选通过
       * */
      closeAll(){
        if (this.closeIds.length) {
          this.$Modal.confirm({
            title: '提示',
            content: '<p>确定关闭所选的店铺吗？</p>',
            onOk: () => {
              this.closeAPI([].concat(this.closeIds), () => {
                this.getInfoPass({page: 1, state: 1})
                this.$Message.info('已全部关闭')
              })
            },
            onCancel: () => {
              this.$Message.warning('已取消')
            }
          })
        }
      },

      /**
       * 请求封装
       * */

      //列表请求
      getInfoPass(data){
        this.$http.get(this.$global.url + 'web/stores', {
          params: data,
        }).then(res => {
          if ('200' === res.data.code) {
            this.loading = false
            this.count = Number(res.data.count)
            this.infoPasses = res.data.data
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

      //关闭请求
      closeAPI(ids, cb){
        this.$http.post(this.$global.url + 'web/store/close', this.$qs.stringify({
          store_id: ids
        })).then(res => {
          if ('200' === res.data.code) {
            typeof cb === 'function' && cb()
          } else {
            this.$Message.error(res.data.msg)
          }
        }).catch(error => {
          this.$Modal.error({
            title: '提示',
            content: error,
          })
        })
      },

      /**
       * 店铺搜索
       * */
      storeSearch(){
        const tmp = {
          page: 1,
        }
        tmp[this.select] = this.search
        this.request = tmp
        this.getInfoPass(tmp)
      },

      /**
       * 操作
       * */

      //跳转详细信息，同时修改分类
      showAllNews (params) {
        this.$router.push({
          name: 'info_check_one', params: {
            id: params.id
          }
        })
      },

      //关闭店铺
      closeStore(index, id){
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定关闭该店铺吗？</p>',
          onOk: () => {
            this.closeAPI([id], () => {
              this.$Message.success('关闭成功')
              this.infoPasses.splice(index, 1)
            })
          },
          onCancel: () => {
            this.$Message.warning('已取消')
          }
        })
      }
    },

  }
</script>
