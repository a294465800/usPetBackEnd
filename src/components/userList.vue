<template>
  <div class="info-check" v-if="loading">
    <Spin size="large" fix></Spin>
  </div>

  <div class="info-check" v-else>

    <!--面包屑导航-->
    <Breadcrumb>
      <Breadcrumb-item>用户管理</Breadcrumb-item>
      <Breadcrumb-item>用户列表</Breadcrumb-item>
    </Breadcrumb>
    <!--/面包屑导航-->

    <!--搜索框-->
    <div class="search-wrap" @keyup.enter="userSearch">
      <Input v-model="search" placeholder="请输入">
      <Select v-model="select" slot="prepend" style="width: 80px">
        <Option value="id">用户ID</Option>
        <Option value="nickname">昵称</Option>
      </Select>
      <Button slot="append" icon="ios-search" @click="userSearch"></Button>
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
      <Table :columns="columns10" :data="userList" :size="tableSize"></Table>
    </div>
    <!--/内容展示-->

    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="count" :current="request.page" @on-change="changePage" show-total></Page>
      </div>
    </div>

  </div>
</template>

<style>

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
        select: 'nickname',
        tableSize: 'default',
        loading: true,
        columns10: [
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
            title: '最近购买商品',
            key: 'recently_product',
            align: 'center'
          },
          {
            title: '最近购买店铺',
            key: 'recently_store',
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
            title: '创建时间',
            key: 'created_at',
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
                  on:{
                  	click: () => {
                      this.goToUserOne(params)
                    }
                  }
                }, '查看所有')
              ])
            }
          }
        ],
        userList: [],
        passIds: [],

        /**
        * 请求参数
        * */
        request: {
        	page: 1
        },
        count: 0,
      }
    },
    created(){
    	this.getUserList(this.request)
    },
    methods: {
      changePage(page){
      	this.request.page = page
        this.getUserList(this.request)
      },

      /**
      * 单用户跳转
      * */
      goToUserOne(user){
      	this.$router.push({name: 'user_one', params: {id: user.row.id, user: user.row}})
      },

      /**
      * 请求封装
      * */
      getUserList(data){
      	this.$http.get(this.$global.url + 'web/users', {
      		params: data,
      	}).then( res => {
      		if('200' === res.data.code){
      			this.loading = false
      			this.userList = res.data.data
            this.count = Number(res.data.count)
          }else {
      			this.$Message.error(res.data.msg)
          }
        }).catch( error => {
          this.$Modal.error({
            title: '提示',
            content: error
          })
        })
      },

      /**
      * 用户搜索
      * */
      userSearch(){
      	const tmp = {
      		page: 1
        }
      	tmp[this.select] = this.search
        this.request = tmp
        this.getUserList(tmp)
      }

    }
  }
</script>
