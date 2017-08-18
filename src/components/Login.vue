<style scoped>

  .login-part {
    width: 100%;
    height: 100%;
    background-color: #f5f8fa;
    position: relative;
  }

  .login-title {
    font: normal 16px "Microsoft YaHei";
    width: 100%;
    text-align: center;
    color: #777;
    background-color: #fff;
    box-sizing: border-box;
    border-bottom: 1px solid #f8b96e;
    margin-bottom: 50px;
    padding: 20px 15px;
  }

  .login-form {
    width: 700px;
    background-color: #fff;
    border: 1px solid #f8b96e;
    margin: auto;
    box-sizing: border-box;
    border-radius: 4px;
    box-shadow: 0 1px 1px rgba(0,0,0,.05);
  }

  .login-title-head {
    border-bottom: 1px solid #f8b96e;
    font-size: 16px;
    color: #f8b96e;
    padding: 10px 30px;
  }

  .login-body {
    padding: 20px 30px 10px;
  }

  .copy-right {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 20px;
    padding: 10px 15px;
    color: #333;
    text-align: center;
    font-size: 16px;
  }

  .copy-right-link,.copy-right-link:hover,.copy-right-link:visited,.copy-right-link:focus {
    text-decoration: none;
  }
</style>


<template>
  <div class="login-part">
    <div class="login-title">{{message}}</div>
    <!--登录区域-->
    <div class="login-form" @keyup.enter="handleSubmit('loginInfo')">
      <div class="login-title-head">小主帮登录</div>
      <Form ref="loginInfo" :model="loginInfo" :rules="ruleLogin" :label-width="80" class="login-body">
        <Form-item label="帐号" prop="username">
          <Input type="text" v-model="loginInfo.username"></Input>
        </Form-item>
        <Form-item label="密码" prop="password">
          <Input type="password" v-model="loginInfo.password"></Input>
        </Form-item>
        <Form-item>
          <Button type="primary" @click="handleSubmit('loginInfo')">登录</Button>
        </Form-item>
      </Form>
    </div>
    <!--/登录区域-->

    <!--版权-->
    <div class="copy-right">
      <span>CopyRight &copy; 2017 Sennki All Rights Reserved</span>
      <a href="http://www.miitbeian.gov.cn" target="_blank" class="copy-right-link">粤ICP备17065039号-4</a>
    </div>
    <!--/版权-->
  </div>
</template>
<script>
  export default {
    data () {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入帐号'))
        } else {
          if (this.loginInfo.password !== '') {
            this.$refs.loginInfo.validateField('password');
          }
          callback()
        }
      }
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        }else {
          callback()
        }
      }

      return {
      	message: '小主帮主程序后台',
        loginInfo: {
          username: '',
          password: ''
        },
        ruleLogin: {
          username: [
            { validator: validatePass, trigger: 'blur' }
          ],
          password: [
            { validator: validatePassCheck, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {

          	this.$http({
              url: this.$global.url + 'web/login',
              method: 'POST',
              data: this.$qs.stringify({
                username: this.loginInfo.username,
                password: this.loginInfo.password
              })
            }).then(res => {
            	if('200' === res.data.code){
                  this.$Message.success('登录成功')
//                this.$router.push()
                let cookies = window.document.cookie
                console.log(cookies, 'cookie')
              }else{
                this.$Message.warning(res.data.msg)
              }
            })
          } else {
            this.$Message.error('请确认填写信息!')
          }
        })
      }
    }
  }
</script>

