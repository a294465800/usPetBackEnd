<style scoped>
  .expand-row{
    margin-bottom: 16px;
  }
</style>
<template>
  <div>
    <Row class="expand-row">
      <Col span="6">
      <span class="expand-key"><b>月营业额：</b></span>
        <span class="expand-value">{{ row.shop_sales }}</span>
      </Col>
      <Col span="9">
      <span class="expand-key"><b>固定顾客：</b></span>
        <span class="expand-value">{{ row.customs_number }}</span>
      </Col>
      <Col span="9">
      <span class="expand-key"><b>主要经营：</b></span>
        <span class="expand-value" v-for="item in row.business">{{ item }}、</span>
      </Col>
    </Row>
    <Row>
      <Col span="6">
      <span class="expand-key"><b>店铺全名：</b></span>
        <span class="expand-value">{{ row.full_name }}</span>
      </Col>
      <Col span="9">
      <span class="expand-key"><b>详细地址：</b></span>
        <span class="expand-value">{{ row.address }}</span>
      </Col>
      <Col span="9">
      <span class="expand-key"><b>营业时间：</b></span>
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
