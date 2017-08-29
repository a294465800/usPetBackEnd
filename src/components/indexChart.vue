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
    height: 300px;
    margin: 0 auto;
    position: relative;
  }

  .account-chart-left li {
    font-size: 15px;
    height: 50px;
    font-weight: 600;
    color: #ff963d;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }

  .account-chart-bottom li {
    margin-left: 20px;
    width: 20px;
    height: 30px;
    position: relative;
    background: linear-gradient(to bottom, #ff963d 50%, #fffb89 100%);
  }

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

    <div class="accountDaily" v-if="loading">
      <Spin size="large" fix></Spin>
    </div>

    <div class="accountDaily" v-else>
      <div class="accountDaily-title">
        <div class="account-tag">月流水</div>
        <div class="account-time-picker">
          <Row>
            <Col span="12">
            <Date-picker type="month" :value="now" style="width: 200px" :editable="pickerEditable"
                         @on-change="changeDate"></Date-picker>
            </Col>
          </Row>
        </div>
      </div>
      <!--日流水图表-->
      <div class="account-chart" v-if="daily">
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
        loading: true,
        yearPayment: 0,
        yearTargetNum: localStorage.yearTargetNum || 100,
        monthPayment: 0,
        monthTargetNum: localStorage.monthTargetNum || 10,
        tmp: 0,
        pickerEditable: false,
        now: new Date().getFullYear() + '-' + new Date().getMonth(),
        options: this.$global.options,

        /**
         * 模拟数据
         * */
        days: [],
        daily: null,
      }
    },

    components: {
      BarChart
    },

    created(){
      this.store = this.$route.params.store
      this.getAccount(this.now + '-01')
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
              data: this.daily,
            }
          ],
        }
      },
    },
    methods: {

      /**
       * 获取图表数据
       * */
      getAccount(date){
      	this.loading = true
        this.$http.get(this.$global.url + 'web/store/count', {
          params: {date: date || ''}
        }).then(res => {
        	this.loading = false
        	if('200' === res.data.code){
            const days = res.data.data.days
            this.yearPayment = res.data.data.year
            this.monthPayment = res.data.data.month
            if(days.length){
              let days_count = this.getDaysCount()
              let current_days = [].concat(this.$global.days)
              current_days.length = days_count.length
              for (let day in days) {
                days_count[Number(days[day].datetime)] = days[day].Pcount
              }
              this.daily = days_count
              this.days = current_days
            }else {
            	this.daily = null
            }
          }else {
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
       * 获取指定月份天数，返回初始流水
       * */
      getDaysCount(){
        const date = this.now.split('-')
        const time = new Date(date[0], date[1], 0)
        let days_count = [].concat(this.$global.days_count)
        days_count.length = time.getDate()
        return days_count
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
              localStorage.yearTargetNum = that.tmp
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
              localStorage.monthTargetNum = that.tmp
            }
          }
        })
      },

      /**
       * 日期切换流水
       * */
      changeDate(date){
        this.now = date
        this.getAccount(date + '-01')
      }
    }
  }
</script>
