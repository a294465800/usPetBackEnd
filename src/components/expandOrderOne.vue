<style scoped>
  .expand-row{
    margin-bottom: 16px;
  }
</style>
<template>
  <div>
    <Row class="expand-row">
      <Col span="12">
        <span class="expand-key"><b>商品ID：</b></span>
        <span class="expand-value">{{ row.product_id }}</span>
      </Col>
      <Col span="12">
        <span class="expand-key"><b>微信单号：</b></span>
        <span class="expand-value">{{ row.transaction_id}}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="24">
        <span class="expand-key"><b>state：</b></span>
        <span class="expand-value">{{ row.state}}</span>
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
