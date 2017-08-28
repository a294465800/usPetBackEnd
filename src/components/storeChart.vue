<style scoped>
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

  .accountDaily {
    height: auto;
    padding-top: 0;
    padding-bottom: 50px;
  }

  .accountDaily-title {
    position: relative;
    width: 100%;
    height: 60px;
    margin-bottom: 30px;
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
    cursor: pointer;
  }

  /*图表*/
  .account-chart {
    width: 90%;
    height: 360px;
    margin: 0 auto;
    position: relative;
  }

  /*.account-chart-left {
    position: absolute;
    width: 30px;
    bottom: -2px;
    left: -30px;
    display: flex;
    flex-direction: column;
  }*/

  /*.account-chart-left li {
    font-size: 15px;
    height: 50px;
    font-weight: 600;
    color: #ff963d;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }*/

  /*.account-chart-bottom {
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-end;
  }
*/
  /*.account-chart-bottom li {
    margin-left: 20px;
    width: 20px;
    height: 30px;
    position: relative;
    background: linear-gradient(to bottom, #ff963d 50%, #fffb89 100%);
  }*/

  /*.account-chart-num, .account-chart-day {
    position: absolute;
    width: 100%;
    left: 0;
    color: #ff963d;
    font-size: 14px;
    text-align: center;
    height: 20px;
  }

  .account-chart-num {
    top: -25px;
  }

  .account-chart-day {
    bottom: -25px;
  }

  .account-chart-title {
    font-size: 16px;
    position: absolute;
    top: -20px;
    right: 20px;
    color: #ff963d;
  }*/

  .account-no {
    font-size: 16px;
    color: #ff963d;
    text-align: center;
  }
</style>

<template>
  <div class="index-chart">
    <!--面包屑导航-->
    <Breadcrumb>
      <Breadcrumb-item>店铺管理</Breadcrumb-item>
      <Breadcrumb-item href="/store/list">店铺列表</Breadcrumb-item>
      <Breadcrumb-item>店铺流水 — {{store.name}}</Breadcrumb-item>
    </Breadcrumb>
    <!--/面包屑导航-->

    <!--总流水统计-->
    <div class="account-all">
      <div class="account-tag">总流水</div>
      <div class="account-store">{{store.name}}</div>
      <div class="account-circle-part">
        <div class="account-circle" @click="yearTarget">
          <i-circle :size="200" :trail-width="4" :stroke-width="5" :percent="yearPercentage" stroke-linecap="round"
                    stroke-color="#ff9e4b">
            <h1 class="account-circle-title">{{yearPayment}}</h1>
            <span class="account-circle-percentage">
              距离{{yearTargetNum}}万
              <i>{{yearPercentage}}%</i>
            </span>
          </i-circle>
          <div class="account-circle-target">今年总流水（万元）</div>
        </div>
        <div class="account-circle" @click="monthTarget">
          <i-circle :size="200" :trail-width="4" :stroke-width="5" :percent="monthPercentage" stroke-linecap="round"
                    stroke-color="#ff9e4b">
            <h1 class="account-circle-title">{{monthPayment}}</h1>
            <span class="account-circle-percentage">
              距离{{monthTargetNum}}万
              <i>{{monthPercentage}}%</i>
            </span>
          </i-circle>
          <div class="account-circle-target">当月总流水（万元）</div>
        </div>
      </div>
    </div>
    <!--/总流水统计-->

    <!--日流水-->
    <div class="accountDaily">
      <div class="accountDaily-title">
        <div class="account-tag">月流水</div>
        <div class="account-time-picker">
          <Row>
            <Col span="12">
            <Date-picker type="month" :placeholder="now" style="width: 200px" :editable="pickerEditable"
                         @on-change="changeDate"></Date-picker>
            </Col>
          </Row>
        </div>
      </div>
      <!--日流水图表-->
      <div class="account-chart" v-if="dail">
        <bar-chart :chart-data="dataCollection" :options="options"></bar-chart>
      </div>
      <div v-else>
        <div class="account-no">暂无数据</div>
      </div>
      <!--/日流水图表-->
    </div>
    <!--/日流水-->
  </div>
</template>

<script>
  import BarChart from './barChart'
  export default {
    data() {
      return {
        yearPayment: 78,
        yearTargetNum: 100,
        monthPayment: 5,
        monthTargetNum: 10,
        tmp: 0,
        pickerEditable: false,
        now: new Date().getFullYear() + '-' + new Date().getMonth(),
        store: null,
        options: this.$global.options,

        /**
         * 模拟数据
         * */
        days: [],
        dail: [10, 11, 20, 12, 50, 2, 51, 11, 1, 11, 21, 1],
        daily: [10, 11, 20, 12, 50, 2, 51, 11, 1, 11, 21, 1,2,5,23,2,12,3,14,23,23,2,1,5,23,3,11,22,23,42,12],
        dails: [2, 13, 20, 12, 22, 2, 11, 14, 1, 11, 21, 8],
        dailyt: [
          {
            account: 2.5,
            day: 1
          },
          {
            account: 1.5,
            day: 2
          },
          {
            account: 4.5,
            day: 3
          },
          {
            account: 5.5,
            day: 4
          },
          {
            account: .5,
            day: 5
          },
          {
            account: 2.5,
            day: 6
          },
          {
            account: 1.5,
            day: 7
          },
          {
            account: 4.5,
            day: 8
          },
          {
            account: 5.5,
            day: 9
          },
          {
            account: .5,
            day: 10
          },
          {
            account: 2.5,
            day: 11
          },
          {
            account: 1.5,
            day: 12
          },
          {
            account: 4.5,
            day: 13
          },
          {
            account: 5.5,
            day: 14
          },
          {
            account: .5,
            day: 15
          },
          {
            account: 2.5,
            day: 16
          },
          {
            account: 1.5,
            day: 17
          },
          {
            account: 4.5,
            day: 18
          },
          {
            account: 5.5,
            day: 19
          },
          {
            account: .5,
            day: 20
          },
          {
            account: 2.5,
            day: 21
          },
          {
            account: 1.5,
            day: 22
          },
          {
            account: 4.5,
            day: 23
          },
          {
            account: 5.5,
            day: 24
          },
          {
            account: .5,
            day: 25
          },
          {
            account: 2.5,
            day: 26
          },
          {
            account: 1.5,
            day: 27
          },
          {
            account: 4.5,
            day: 28
          },
        ],
        biggest: 0,
      }
    },
    components: {
      BarChart
    },

    created(){
      this.store = this.$route.params.store
      this.days = [].concat(this.$global.days)
      this.days.length = 12
    },

    /**
     * 计算百分比
     * */
    computed: {
      yearPercentage(){
        return Math.min(Number(((this.yearPayment * 100) / (this.yearTargetNum * 100) * 100).toFixed(2)), 100)
      },
      monthPercentage(){
        return Math.min(Number(((this.monthPayment * 100) / (this.monthTargetNum * 100) * 100).toFixed(2)), 100)
      },

      dataCollection(){
        return {
          labels: this.days,
          datasets: [
            {
              label: this.now,
              backgroundColor: '#ff963d',
              data: this.dail,
            }
          ],
        }
      },

    },
    methods: {

    	/**
    	* 请求封装
    	* */
    	getStoreAccount(id){
    		this.$http.get(this.$global.url + 'web/store')
      },

      /**
       * 选择年目标
       * */
      yearTarget(){
        const that = this
        this.$Modal.confirm({
          render: (h) => {
            return h('Input', {
              props: {
                autofocus: true,
                placeholder: '填写年流水目标（单位：万元）'
              },
              on: {
                input: (val) => {
                  that.tmp = Number(val)
                },
              }
            })
          },
          onOk(){
            if (isNaN(that.tmp)) {
              that.$Message.warning('请输入整数')
            } else {
              that.yearTargetNum = that.tmp
            }
          }
        })
      },

      /**
       * 选择月目标
       * */
      monthTarget(){
        const that = this
        this.$Modal.confirm({
          render: (h) => {
            return h('Input', {
              props: {
                autofocus: true,
                placeholder: '填写月流水目标（单位：万元）'
              },
              on: {
                input: (val) => {
                  that.tmp = Number(val)
                }
              }
            })
          },
          onOk(){
            if (isNaN(that.tmp)) {
              that.$Message.warning('请输入整数')
            } else {
              that.monthTargetNum = that.tmp
            }
          }
        })
      },

      /**
       * 日期切换流水
       * */
      changeDate(e){
        this.now = e
        this.days = [].concat(this.$global.days)
        if (this.dail === this.daily) {
          this.dail = null
        } else {
          this.dail = this.daily
          this.days.length =  this.daily.length
        }
      }
    }
  }
</script>
