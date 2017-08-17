<template>
  <div class="index-wrap">

    <!--index头部-->
    <div class="index-head">
      <img src="../assets/logo/logo.png" alt="小主帮" class="index-head-img">
      <div class="index-head-operate">
        <span class="index-head-welcome">欢迎你<span class="index-head-user">{{user}}</span></span>
        <span @click="logout" class="index-logout">退出</span>
      </div>
    </div>
    <!--/index头部-->

    <!--index内容-->
    <section class="index-content">
      <div class="layout" :class="{'layout-hide-text': spanLeft < 4}">
        <Row type="flex">
          <i-col :span="spanLeft" class="layout-menu-left">
            <Menu :active-name="active" :open-names="open" theme="dark" width="auto" accordion @on-select="goToPage">
              <div class="layout-header">
                <i-button type="text" @click="toggleClick">
                  <Icon type="navicon" size="32"></Icon>
                </i-button>
              </div>
              <Menu-item name="/">
                <Icon type="ios-keypad" :size="iconSize"></Icon>
                <span class="layout-text">首页</span>
              </Menu-item>
              <Submenu name="info">
                <template slot="title">
                  <Icon type="information-circled"></Icon>
                  <span class="layout-text">信息审核</span>
                </template>
                <Menu-item name="/info/check">待审核</Menu-item>
                <Menu-item name="/info/pass">审核通过</Menu-item>
              </Submenu>
              <Submenu name="store">
                <template slot="title">
                  <Icon type="android-playstore"></Icon>
                  <span class="layout-text">店铺管理</span>
                </template>
                <Menu-item name="store/list">店铺列表</Menu-item>
              </Submenu>
              <Submenu name="order">
                <template slot="title">
                  <Icon type="android-list"></Icon>
                  <span class="layout-text">订单查询</span>
                </template>
                <Menu-item name="/order/list">订单列表</Menu-item>
              </Submenu>
              <Submenu name="user">
                <template slot="title">
                  <Icon type="person"></Icon>
                  <span class="layout-text">用户管理</span>
                </template>
                <Menu-item name="/user/list">用户列表</Menu-item>
              </Submenu>
              <Submenu name="6">
                <template slot="title">
                  <Icon type="compose"></Icon>
                  <span class="layout-text">投诉反馈</span>
                </template>
                <Menu-item name="6-1">待处理</Menu-item>
                <Menu-item name="6-2">已处理</Menu-item>
              </Submenu>
            </Menu>
          </i-col>
          <i-col :span="spanRight">
            <router-view></router-view>
          </i-col>
        </Row>
      </div>
    </section>
    <!--/index内容-->

    <!--index尾部-->
    <footer class="index-footer">
      <span>CopyRight &copy; 2017 Sennki All Rights Reserved</span>
      <a href="http://www.miitbeian.gov.cn" target="_blank">粤ICP备17065039号-4</a>
    </footer>
    <!--/index尾部-->
  </div>
</template>

<style>
  /*
  * index通用样式
  */

  .index-wrap {
    background-color: #fff;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .index-head {
    padding: 10px 15px;
    display: flex;
    width: 100%;
    height: 60px;
    background-color: #495060;
    align-items: center;
  }

  .index-head-operate {
    color: #495060;
    font-size: 16px;
    flex: 1;
    text-align: right;
  }

  .index-head-welcome {
    color: #fff;
    margin-right: 20px;
  }

  .index-head-user {
    color: #ff963d;
    padding-left: 10px;
  }

  .index-head-img {
    width: 67px;
    height: 43px;
  }

  .index-logout {
    cursor: pointer;
    color: #fff;
  }

  .index-logout:hover {
    color: #ff963d;
  }

  .index-content {
    flex: 1;
    overflow-y: hidden;
  }

  .index-footer {
    background-color: #495060;
    padding: 10px 15px;
    color: #fff;
    text-align: center;
    font-size: 15px;
  }

  .index-footer span {
    margin-right: 20px;
  }

  .layout {
    background: #f5f7f9;
    position: relative;
    overflow: hidden;
    height: 100%;
  }

  .layout-menu-left {
    background: #495060;
    height: 100%;
  }

  .layout-header {
    height: 60px;
    text-align: right;
  }

  .layout-header button {
    color: #fff !important;
  }

  .layout-ceiling-main a {
    color: #9ba7b5;
  }

  .layout-hide-text .layout-text {
    display: none;
  }

  .ivu-col {
    transition: width .2s ease-in-out;
  }

</style>

<script>
  export default {
    data() {
      return {
        user: '',
        active: '/',
        open: [],
        spanLeft: 4,
        spanRight: 20
      }
    },
    created(){
    	this.user = sessionStorage.user
      this.active = this.$route.path
      this.open[0] = this.$route.name.split('_')[0]
    },
    computed: {
      iconSize () {
        return this.spanLeft === 4 ? 14 : 24;
      }
    },
    methods: {

    	/**
    	* 退出登录
    	* */
      logout(){
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定退出登录吗？</p>',
          onOk: () => {
          	sessionStorage.user = ''
          	this.$router.push('/login')
          },
          onCancel: () => {
          	this.$http({
              url: 'https://api.douban.com/v2/movie/in_theaters',
            }).then(res => {
            	console.log(res)
            })
            this.$Message.info('取消了');
          }
        })
      },

      /**
      * 切换导航
      * */
      toggleClick () {
        if (this.spanLeft === 4) {
          this.spanLeft = 2;
          this.spanRight = 22;
        } else {
          this.spanLeft = 4;
          this.spanRight = 20;
        }
      },

      /**
      * 路由跳转
      * */
      goToPage(name){
      	this.$router.push(name)
      },

    }
  }
</script>
