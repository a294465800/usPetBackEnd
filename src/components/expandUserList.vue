<style scoped>
  .expand-row{
    margin-bottom: 16px;
  }
</style>
<template>
  <div>
    <Row class="expand-row" style="margin-bottom: 0">
      <Col span="8">
      <span class="expand-key"><b>购买次数：</b></span>
        <span class="expand-value">{{ row.buy_times }}次</span>
      </Col>
      <Col span="8">
      <span class="expand-key"><b>总花费：</b></span>
        <span class="expand-value">{{ row.cost }}元</span>
      </Col>
      <Col span="8">
      <span class="expand-key"><b>光顾店铺：</b></span>
        <span class="expand-value" v-for="item in row.stores">{{ item }}、</span>
      </Col>
    </Row>
    <Row>
      <!--<Col span="8">
      <span class="expand-key">月营业额：</span>
      <span class="expand-value">{{ row.monthMoney }}</span>
      </Col>-->
      <!--<Col span="8">
        <span class="expand-key">详细地址：</span>
        <span class="expand-value">{{ row.address }}</span>
      </Col>-->
<!--      <Col span="8">
      <span class="expand-key">申请时间：</span>
      <span class="expand-value">{{ row.time }}</span>
      </Col>-->
    </Row>
  </div>
</template>
<script>
  export default {
    props: {
      row: Object
    }
  };
</script>
