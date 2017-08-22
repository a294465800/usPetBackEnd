<style scoped>
  .expand-row{
    margin-bottom: 16px;
  }
</style>
<template>
  <div>
    <Row class="expand-row" style="margin-bottom: 0">
      <Col span="12">
        <span class="expand-key"><b>购买次数：</b></span>
        <span class="expand-value">{{ row.buyCount }}次</span>
      </Col>
      <Col span="12">
        <span class="expand-key"><b>商品备注：</b></span>
        <span class="expand-value">{{ row.remark || '无'}}</span>
      </Col>
    </Row>
    <Row>
      <Col span="24">
        <span class="expand-key"><b>商品描述：</b></span>
        <span class="expand-value">{{ row.description || '无'}}</span>
      </Col>
    </Row>
    <Row>
      <Col span="24">
        <span class="expand-key"><b>商品提醒：</b></span>
        <span class="expand-value">{{ row.notice || '无'}}</span>
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
