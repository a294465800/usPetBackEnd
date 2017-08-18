<style scoped>
  .expand-row{
    margin-bottom: 16px;
  }
</style>
<template>
  <div>
    <Row class="expand-row">
      <Col span="8">
        <span class="expand-key">月成交订单：</span>
        <span class="expand-value">{{ row.deal }} 单</span>
      </Col>
      <Col span="8">
        <span class="expand-key">最近一月流水：</span>
        <span class="expand-value">{{ row.month }} 万元</span>
      </Col>
      <Col span="8">
        <span class="expand-key">今年流水：</span>
        <span class="expand-value">{{ row.year }} 万元</span>
      </Col>
    </Row>
    <Row>
      <Col span="24">
        <span class="expand-key">详细地址：</span>
        <span class="expand-value">{{ row.address }}</span>
      </Col>
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
