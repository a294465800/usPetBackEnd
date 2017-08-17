<template>
  <div class="index-chart">
    <!--面包屑导航-->
    <Breadcrumb>
      <Breadcrumb-item>首页</Breadcrumb-item>
      <Breadcrumb-item>统计图表</Breadcrumb-item>
    </Breadcrumb>
    <!--/面包屑导航-->

    <!--总流水统计-->
    <div class="account-all">
      <div class="account-tag">总流水</div>
      <div class="account-store">小主帮店铺</div>
      <div class="account-circle-part">
        <div class="account-circle" @click="yearTarget">
          <i-circle :size="200" :trail-width="4" :stroke-width="5" :percent="75" stroke-linecap="round"
                    stroke-color="#ff9e4b">
            <div class="demo-i-circle-custom">
              <h1 class="account-circle-title">32</h1>
              <span class="account-circle-percentage">
                距离100万
                <i>75%</i>
            </span>
            </div>
          </i-circle>
          <div class="account-circle-target">今年总流水（万元）</div>
        </div>
        <div class="account-circle"  @click="monthTarget">
          <i-circle :size="200" :trail-width="4" :stroke-width="5" :percent="50" stroke-linecap="round"
                    stroke-color="#ff9e4b">
            <div class="demo-i-circle-custom">
              <h1 class="account-circle-title">5</h1>
              <span class="account-circle-percentage">
                距离10万
                <i>50%</i>
            </span>
            </div>
          </i-circle>
          <div class="account-circle-target">当月总流水（万元）</div>
        </div>
      </div>
    </div>
    <!--/总流水统计-->

    <!--日流水-->
    <div class="accountDaily">
      <div class="account-tag">日流水</div>
      <div class="account-time-picker">
        <Row>
          <Col span="12">
          <Date-picker type="month" placeholder="选择年-月" style="width: 200px" @on-change="changeDate"></Date-picker>
          </Col>
        </Row>
      </div>
    </div>
    <!--/日流水-->
  </div>
</template>

<style>
  .index-chart {
    position: relative;
    height: 100%;
    width: 100%;
    padding: 15px;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .account-all, .accountDaily {
    height: 360px;
    width: 95%;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 1px 1px #ececec;
    position: relative;
    padding-top: 60px;
    margin: 10px auto 30px;
  }

  .account-tag {
    width: 130px;
    height: 50px;
    line-height: 50px;
    border-radius: 4px;
    position: absolute;
    top: -2px;
    left: -2px;
    background-color: #ff963d;
    color: #fff;
    font-size: 20px;
    padding-left: 20px;
    box-shadow: -1px 2px 1px #ccc;
  }

  .account-tag:after {
    content: '';
    position: absolute;
    width: 0;
    border-style: solid;
    border-width: 25px 20px 25px 0;
    border-color: transparent #f5f7f9 transparent transparent;
    right: 0;
    top: 0;
    border-radius: 4px;
  }

  .account-store {
    position: absolute;
    right: 30px;
    top: 5px;
    color: #ff963d;
    font-size: 20px;
    font-weight: 600;
  }

  .account-circle-part {
    width: 100%;
    padding: 15px;
    position: relative;
    text-align: center;
  }

  /*圆环样式*/
  .account-circle {
    display: inline-block;
    margin: 0 70px;
    cursor: pointer;
  }

  .account-circle-title {
    color: #3f414d;
    font-size: 28px;
    font-weight: normal;
  }

  .account-circle-percentage {
    display: block;
    padding-top: 15px;
    color: #657180;
    font-size: 14px;
  }

  .account-circle-percentage:before {
    content: '';
    display: block;
    width: 50px;
    height: 1px;
    margin: 0 auto;
    background: #e0e3e6;
    position: relative;
    top: -15px;
  }

  .account-circle-percentage i {
    font-style: normal;
    color: #3f414d;
    display: block;
    margin-top: 15px;
    font-weight: 600;
  }

  .account-circle-target {
    color: #ff963d;
    font-size: 20px;
    margin-top: 10px;
  }

  /*日期选择*/
  .account-time-picker {
    position: absolute;
    top: 10px;
    right: 30px;
  }

  .account-time-picker .ivu-input:hover {
    border-color: #ff963d;
  }

  .account-time-picker .ivu-input:focus {
    border-color: #ff963d;
    box-shadow: 0 0 0 2px rgba(250, 150, 61, .2);
  }

  .account-time-picker .ivu-date-picker-cells-cell-selected em, .ivu-date-picker-cells-cell-selected:hover em {
    background-color: #ffa85e;
  }

  .account-time-picker .ivu-input {
    font-size: 15px;
    text-align: center;
    color: #ff963d;
  }
</style>

<script>
  export default {
    data() {
      return {}
    },
    methods: {

      /**
       * 选择年目标
       * */
      yearTarget(){
        this.$Modal.confirm({
          render: (h) => {
            return h('Input', {
              props: {
                value: this.value,
                autofocus: true,
                placeholder: '填写流水目标（单位：元）'
              },
              on: {
                input: (val) => {
                  this.value = val;
                }
              }
            })
          }
        })
      },

      monthTarget(){
        this.$Modal.confirm({
          render: (h) => {
            return h('Input', {
              props: {
                value: this.value,
                autofocus: true,
                placeholder: '填写流水目标（单位：元）'
              },
              on: {
                input: (val) => {
                  this.value = val;
                }
              }
            })
          }
        })
      },

      /**
       * 日期切换流水
       * */
      changeDate(e){
        console.log(e)
      }
    }
  }
</script>
