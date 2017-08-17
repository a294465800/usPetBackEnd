<style scoped>
  .expand-row{
    margin-bottom: 16px;
  }
</style>
<template>
  <div>
    <Row class="expand-row">
      <Col span="8">
        <span class="expand-key">月营业额：</span>
        <span class="expand-value">{{ row.monthMoney }}</span>
      </Col>
      <Col span="8">
        <span class="expand-key">固定顾客：</span>
        <span class="expand-value">{{ row.customer }}</span>
      </Col>
      <Col span="8">
        <span class="expand-key">主要经营：</span>
        <span class="expand-value">{{ row.main }}</span>
      </Col>
    </Row>
    <Row>
      <!--<Col span="8">
      <span class="expand-key">月营业额：</span>
      <span class="expand-value">{{ row.monthMoney }}</span>
      </Col>-->
      <Col span="8">
        <span class="expand-key">详细地址：</span>
        <span class="expand-value">{{ row.address }}</span>
      </Col>
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
