<template>
  <div id="appp">
    <div class="container">
      <div class="Chart__list">
        <div class="Chart">
          <h2>Linechart</h2>
          <line-example></line-example>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  #appp {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .container {
    max-width: 800px;
    margin:  0 auto;
  }
</style>

<script>
  import LineExample from './barChart'
  export default {
    name: 'appp',
    components: {
      LineExample
    }
  }
</script>
