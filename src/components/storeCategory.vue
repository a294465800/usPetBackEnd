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
    margin-left: 30px;
  }

  .store-category-icon {
    width: 50px;
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
      <Breadcrumb-item>店铺分类</Breadcrumb-item>
    </Breadcrumb>
    <!--/面包屑导航-->

    <!--搜索框-->
    <div class="search-wrap">
      <Input v-model="search" placeholder="请输入">
      <Select v-model="select" slot="prepend" style="width: 80px">
        <Option value="id">ID</Option>
        <Option value="name">分类名</Option>
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
      <Button type="info" @click="newCategory">新建分类</Button>
      <Button type="warning" @click="deleteAll">删除</Button>
    </div>
    <div class="info-check-table">
      <Table :columns="columns" :data="storeCategory" :size="tableSize" @on-selection-change="selectAll"></Table>
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
            width: 150,
            align: 'center',
            sortable: true
          },
          {
            title: '图标',
            key: 'action',
            width: 200,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('img', {
                  'class': ['store-category-icon'],
                  attrs: {
                    src: params.row.src,
                    alt: params.row.name,
                    title: params.row.name
                  },
                })
              ])
            }
          },
          {
            title: '分类名',
            key: 'name',
            align: 'center'
          },
          {
            title: '创建时间',
            key: 'createtime',
            align: 'center',
            sortable: true
          },
          {
            title: '操作',
            width: 200,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small',
                  },
                  on: {
                    click: () => {
                      this.changeCategory(params.row)
                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small',
                  },
                  on: {
                    click: () => {
                      this.deleteCategory(params)
                    }
                  }
                }, '删除')
              ])
            }
          }
        ],
        storeCategory: [],
        delIds: [],
        count: 0,
        request: {
          page: 1,
        }
      }
    },
    created(){
      this.getStoreCategory(this.request)
    },
    methods: {

      /**
       * 请求封装
       * */
      getStoreCategory(data){
        this.$http.get(this.$global.url + 'web/store/types/list', {
          params: data,
        }).then(res => {
          if ('200' === res.data.code) {
            this.loading = false
            this.count = res.data.count
            this.storeCategory = res.data.data
          } else {
            this.$Message.error(res.data.msg)
          }
        }).catch(error => {
          this.storeCategory = []
          this.$Modal.error({
            title: '提示',
            content: error
          })
        })
      },

      changePage(e){
        console.log(e)
      },

      /**
       * 操作
       * */
      //修改
      changeCategory (params) {
        this.$router.push({name: 'store_category_upload', params: {category: params}})
      },
      //删除
      deleteCategory(params){
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确认删除该店铺分类吗？</p>',
          onOk: () => {
            this.storeCategoryDelete([params.row.id], () => {
              this.storeCategory.splice(params.index, 1)
            })
          },
          onCancel: () => {

          }

        })
      },

      /**
       * 全选
       * */
      selectAll(groups){
        let arr = []
        for (let i in groups) {
          arr.push(groups[i].id)
        }
        this.delIds = arr
      },

      /**
       * 全选通过
       * */
      deleteAll(){
        if (this.delIds.length) {
          this.$Modal.confirm({
            title: '提示',
            content: '<p>确定删除全部所选分类吗？</p>',
            onOk: () => {
              this.storeCategoryDelete([].concat(this.delIds), () => {
                this.getStoreCategory({page: 1})
              })
            },
            onCancel: () => {
              this.$Message.warning('已取消')
            }
          })
        }
      },

      /**
       * 删除请求
       * */
      storeCategoryDelete(ids, cb){
        this.$http.post(this.$global.url + 'web/store/type/delete', this.$qs.stringify({
          id: ids
        })).then(res => {
          if ('200' === res.data.code) {
            this.$Message.success('删除成功')
            typeof cb === 'function' && cb()
          } else {
            this.$Message.error(res.data.msg)
          }
        }).catch(error => {
          this.$Modal.error({
            title: '提示',
            content: error
          })
        })
      },

      /**
       * 新建分类
       * */
      newCategory(){
        this.$router.push({name: 'store_category_upload'})
      }
    }
  }
</script>
