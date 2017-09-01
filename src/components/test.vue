<template>
  <div class="info-check">
    这是一个测试页面
    <Button type="error" @click="GETAPI">GET</Button>
    <Button type="error" @click="POSTAPI">POST</Button>
    <Button type="error" @click="PUTAPI">PUT</Button>
    <Button type="error" @click="DELETEAPI">DELETE</Button>
    <Button type="error" @click="PATCHAPI">PATCH</Button>
    <div class="content" v-if="data">这是一个{{api}}请求：{{data}}</div>
  </div>
</template>

<style>
  .info-check {
    padding: 30px;
  }

  .content {
    margin-top: 50px;
    width: 700px;
    margin-left: auto;
    margin-right: auto;
  }
</style>

<script>
  export default {
    data() {
      return {
        data: '',
        api: '',
      }
    },
    created(){
    },

    methods: {

      GETAPI(){
        this.$http.get(this.$global.url + 'test').then(res => {
          this.data = res
          this.api = 'get'
        }).catch(error => {
          console.log(error)
        })
      },


      POSTAPI(){
        this.$http.post(this.$global.url + 'test').then(res => {
          this.data = res
          this.api = 'post'
        }).catch(error => {
          console.log(error)
        })
      },


      PUTAPI(){
        this.$http.put(this.$global.url + 'test').then(res => {
          this.data = res
          this.api = 'put'
        }).catch(error => {
          console.log(error)
        })
      },


      DELETEAPI(){
        this.$http.delete(this.$global.url + 'test').then(res => {
          this.data = res
          this.api = 'delete'
        }).catch(error => {
          console.log(error)
        })
      },


      PATCHAPI(){
        this.$http.patch(this.$global.url + 'test').then(res => {
          this.data = res
          this.api = 'patch'
        }).catch(error => {
          console.log(error)
        })
      },

    },
  }
</script>
