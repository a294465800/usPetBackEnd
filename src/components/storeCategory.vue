<style>
  /*.info-check {
    position: relative;
    height: 100%;
    width: 100%;
    padding: 15px;
    display: flex;
    flex-direction: column;
  }*/
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

  .store-category-icon {
    width: 50px;
  }
</style>

<template>
  <div class="info-check">

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
  export default {
    data() {
      return {
        search: '',
        select: 'id',
        tableSize: 'default',
        loading: true,
        columns: [
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
            key: 'time',
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
                      this.show(params.index)
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
                      this.show(params.index)
                    }
                  }
                }, '删除')
              ])
            }
          }
        ],
        stores: [
          {
            id: 1,
            name: '美容',
            time: '2017-03-20',
            src: 'http://freefilehostings.com/wp-content/uploads/2016/02/2540002121dcc6e84b3.jpg'
          },
          {
            id: 2,
            name: '洗澡',
            time: '2017-03-20',
            src: 'http://freefilehostings.com/wp-content/uploads/2016/02/2540002121dcc6e84b3.jpg'
          },
          {
            id: 3,
            name: '活体',
            time: '2017-03-20',
            src: 'http://freefilehostings.com/wp-content/uploads/2016/02/2540002121dcc6e84b3.jpg'
          },
          {
            id: 4,
            name: '可爱',
            time: '2017-03-20',
            src: 'http://freefilehostings.com/wp-content/uploads/2016/02/2540002121dcc6e84b3.jpg'
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
       * 操作
       * */
      show (index) {
        this.$Modal.info({
          title: '店铺信息',
          content: '测试' + index
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
