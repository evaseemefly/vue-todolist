<template>
    <div>
    <div class="c-box bg-box" >
      <div class="login-box clearfix"style="margin-top:10px">
        <div class="fr form-box">
          <h2>帐号登录</h2>
          <form id="jsLoginForm" autocomplete="off">

            <input type="hidden" name="csrfmiddlewaretoken" value="ywSlOHdiGsK6VFB6iyhnB1B30khmz8SU">

            <div class="form-group marb20">
              <label>用&nbsp;户&nbsp;名</label>
              <input name="account_l" id="account_l" type="text" v-model="userName" @focus="errorUnshow" placeholder="手机号/账号">
            </div>
             <p class="error-text" v-show="userNameError">{{userNameError}}</p>
            <div class="form-group marb8">
              <label>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码</label>
              <input name="password_l" id="password_l" type="password" v-model="parseWord" @focus="errorUnshow" placeholder="请输入您的密码">
            </div>
            <p class="error-text" v-show="parseWordError">{{parseWordError}}</p>
     <!--        <div class="error btns login-form-tips" id="jsLoginTips" v-show="error"><p>用户名或密码错误</p></div> -->
            <div class="auto-box marb38">
            </div>
            <p class="error-text" v-show="error">{{error}}</p>
            <input class="btn btn-green" id="jsLoginBtn" type="button" @click = "login" value="立即登录 &gt; ">
          </form>
          <ul class="form other-form">
            <li>
              <h5>使用第三方帐号登录</h5>
            </li>
            <li class="other-login">
              <a class="qq" href="http://shop.projectsedu.com:8001/login/qq/"></a>
              <a class="sina" href="http://shop.projectsedu.com:8001/login/weibo/"></a>
              <a class="weixin" href="http://shop.projectsedu.com:8001/login/weixin/"></a>
            </li>
          </ul>
          <p class="form-p">
            没有帐号？
            <router-link :to="'/app/register/'" target = _blank>[立即注册]</router-link>
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {login} from '../../api/api'
export default {
    methods:{
        login(){
            var myself=this;
            login({}).then((response)=>{
                console.log(response);

            })
        }
    }
}
</script>

<style>

</style>
