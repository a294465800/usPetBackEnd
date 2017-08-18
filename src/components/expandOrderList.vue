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
      <span class="expand-key"><b>总成交量：</b></span>
        <span class="expand-value">{{ row.deal }}元</span>
      </Col>
      <!--<Col span="8">
      <span class="expand-key"><b>光顾店铺：</b></span>
        <span class="expand-value" v-for="item in row.stores">{{ item }}、</span>
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
