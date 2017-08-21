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
        <span class="expand-value">{{ row.shop_sales }}</span>
      </Col>
      <Col span="8">
        <span class="expand-key">固定顾客：</span>
        <span class="expand-value">{{ row.customs_number }}</span>
      </Col>
      <Col span="8">
        <span class="expand-key">主要经营：</span>
        <span class="expand-value" v-for="item in row.business">{{ item }}、</span>
      </Col>
    </Row>
    <Row>
      <Col span="8">
        <span class="expand-key">店铺全名：</span>
        <span class="expand-value">{{ row.full_name }}</span>
      </Col>
      <Col span="12">
        <span class="expand-key">详细地址：</span>
        <span class="expand-value">{{ row.address }}</span>
      </Col>
      <Col span="4">
        <span class="expand-key">营业时间：</span>
        <span class="expand-value">{{ row.time }}</span>
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
