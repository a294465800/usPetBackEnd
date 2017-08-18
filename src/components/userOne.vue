<template>
  <div class="info-check">

    <!--面包屑导航-->
    <Breadcrumb>
      <Breadcrumb-item>用户管理</Breadcrumb-item>
      <Breadcrumb-item href="/user/list">用户列表</Breadcrumb-item>
      <Breadcrumb-item>{{user}}</Breadcrumb-item>
    </Breadcrumb>
    <!--/面包屑导航-->

    <!--搜索框-->
    <div class="search-wrap">
      <Input v-model="search" placeholder="请输入">
      <Select v-model="select" slot="prepend" style="width: 80px">
        <Option value="id">单号</Option>
        <Option value="store">店铺</Option>
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
      <Table :columns="columns" :data="userBuys" :size="tableSize"></Table>
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
	export default {
		data() {
			return {
				user: '',
        tableSize: 'default',
        search: '',
        select: 'id',
        columns: [
          {
            title: '单号',
            key: 'id',
            align: 'center',
            width: 200
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
            className: 'table-price'
          },
          {
            title: '购买店铺',
            key: 'store',
            align: 'center',
            sortable: true
          },
          {
            title: '电话',
            key: 'tel',
            align: 'center'
          },
          {
            title: '订单日期',
            key: 'create_time',
            align: 'center',
            width: 200,
            sortable: true
          }
        ],
        userBuys: [
          {
            id: 1,
            name: '爱吃鱼的猫',
            commodity: '狗狗洗澡',
            store: '萌萌哒宠物店',
            tel: 18456122214,
            price: 50,
            create_time: '2017-03-20'
          },
          {
            id: 2,
            name: '爱吃鱼的猫',
            commodity: '狗狗洗澡',
            store: '萌萌哒宠物店',
            tel: 18658411125,
            price: 150,
            create_time: '2017-03-20'
          },
        ],

      }
		},
    created(){
			this.user = this.$route.params.user.name
    },

    methods: {
      changePage(e){
      	console.log(e)
      }
    }
	}
</script>
