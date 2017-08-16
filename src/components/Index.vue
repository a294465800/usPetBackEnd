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
            <Menu active-name="1" theme="dark" width="auto">
              <div class="layout-header">
                <i-button type="text" @click="toggleClick">
                  <Icon type="navicon" size="32"></Icon>
                </i-button>
              </div>
              <Menu-item name="1">
                <Icon type="ios-keypad" :size="iconSize"></Icon>
                <span class="layout-text">首页</span>
              </Menu-item>
              <Submenu name="2">
                <template slot="title">
                  <Icon type="ios-paper"></Icon>
                  <span class="layout-text">信息审核</span>
                </template>
                <Menu-item name="1-1">审核通过</Menu-item>
                <Menu-item name="1-2">待审核</Menu-item>
              </Submenu>
              <Submenu name="3">
                <template slot="title">
                  <Icon type="ios-paper"></Icon>
                  <span class="layout-text">店铺管理</span>
                </template>
                <Menu-item name="1-1">店铺列表</Menu-item>
                <Menu-item name="1-2">店铺统计</Menu-item>
              </Submenu>
              <Submenu name="4">
                <template slot="title">
                  <Icon type="ios-paper"></Icon>
                  <span class="layout-text">订单查询</span>
                </template>
                <Menu-item name="1-1">订单列表</Menu-item>
                <Menu-item name="1-2">店铺统计</Menu-item>
              </Submenu>
              <Submenu name="5">
                <template slot="title">
                  <Icon type="ios-paper"></Icon>
                  <span class="layout-text">用户管理</span>
                </template>
                <Menu-item name="1-1">用户列表</Menu-item>
              </Submenu>
              <Submenu name="6">
                <template slot="title">
                  <Icon type="ios-paper"></Icon>
                  <span class="layout-text">投诉反馈</span>
                </template>
                <Menu-item name="1-1">待处理</Menu-item>
                <Menu-item name="1-1">已处理</Menu-item>
              </Submenu>
            </Menu>
          </i-col>
          <i-col :span="spanRight" class="index-content-right">
            <!--<div class="layout-breadcrumb">
              <Breadcrumb>
                <Breadcrumb-item href="#">首页</Breadcrumb-item>
                <Breadcrumb-item href="#">应用中心</Breadcrumb-item>
                <Breadcrumb-item>某应用</Breadcrumb-item>
              </Breadcrumb>
            </div>-->
            <!--<div class="layout-content-main">内容区域</div>-->
            <!--<div class="layout-content">
            </div>-->
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

</style>

<script>
  export default {
    data() {
      return {
        user: 'Sennki',
        spanLeft: 4,
        spanRight: 20
      }
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
          	this.$router
          },
          onCancel: () => {
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
      }
    }
  }
</script>
