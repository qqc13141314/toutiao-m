<!--  -->
<template>
<div class='login-container'>
    <!-- 导航栏 -->
<van-nav-bar
  title="登录"
  left-arrow
  @click-left="$router.back()"
 
/>
<!--登录表单  -->
<!-- 将login-btn 放入到van-form 中 -->
<!-- 表单验证 1:使用van-form 组件 包裹所有的表单项van-field 2:给van-form 绑定submit 事件，当表单提交的时候触发 3:表单会自动触发提示，只有当表单验证通过，才会调用submit-->
<van-form 
:show-error ='false'
:show-error-message='false'
ref='login-form'
@submit="onLogin"
@failed='onFailed'

>
  <van-field
    v-model="user.mobile"
    left-icon='shouji'
    placeholder="请输入手机号"
    name='mobile'
     :rules="formRules.mobile"
  > 
  <van-icon class='iconfont' class-prefix='icon' slot='left-icon' name='shouji'></van-icon>
  </van-field>
  <van-field
    v-model="user.code"
    left-icon="suo"
    name='code'
    placeholder="请输入验证码"
    :rules="formRules.code"
  >
  <van-icon class='iconfont' class-prefix='icon' slot='left-icon' name='suo'></van-icon>
   <template #button>
       <van-count-down :time="1000*60" format='ss s'  v-if='isCountshows' @finish='isCountshows=false'/>
    <van-button size="small" type="primary"  @click.prevent='onSendms' :loading='isSendmsLoading' v-else>发送验证码</van-button>
    <!-- .prevent 阻止默认行为 -->
    
  </template>
  </van-field>
  <!-- 登录按钮 -->
<div class="login-btn-wrap">
    <van-button  class='login-btn' type="info"  block >登录</van-button>
</div>
</van-form>


</div>
</template>

<script>
import {login,sendSms}from '@/api/user.js'
import { Toast } from 'vant';

export default {
name:'login',
components: {},
data() {
return {
    user:{
        mobile:'',
        code:''
    },
    formRules:{
        mobile:[
            {required:true,message:"请输入手机号",},
            {
                pattern:/^1[3,5,7,8,9]\d{9}$/,message:'手机号格式错误',trigger :'onChange'
            }
        ],
        code:[
            {
                required:true,message:'请输入验证码'
            },
            {
                pattern:/^\d{6}$/,message:'验证码格式错误'
            }
        ]
            
    },
    isCountshows:false,/* 倒计时显示控制 */
    isSendmsLoading:false /* 发送验证码按钮的状态 */
    

}
},
computed: {},
watch: {},
methods: {
    //登录按钮
   async onLogin(){
        //找到数据接口，封装请求方法，请求调用登录，处理响应结果

        Toast.loading({
  message: '加载中...',
  forbidClick: true,
  duration:0
});
       try{
            const res=await login(this.user)
        console.log(res);
        Toast.success('登录成功')
        //将后端返回的用户登录状态（tooken等数据）放到vuex中
        this.$store.commit('setUser',res.data.data)
       }catch(err){
           console.log(err);
           console.log('登录失败',err);
           Toast.fail('❌登录失败，手机号或验证码错误')
           
           

       }
        
    },
    //验证失败
    onFailed(error){
        console.log(error);
        if(error.errors[0]){
            this.$toast({ message:error.errors[0].message,
            position:'top'
            }
            )   
        }
    }
,
    //验证码

 async onSendms(){
     //验证通过
     this.isSendmsLoading=true/* 防止因网络过慢，触发多次按钮 */
     try{
         const validateRet = await this.$refs['login-form'].validate('mobile')
         console.log(validateRet);
         const res=await sendSms(this.user.mobile) 
         console.log(res);
         //验证码倒计时
         //短信发出去了，隐藏发送按钮，显示倒计时
         this.isCountshows=true
         //倒计时结束，隐藏倒计时，显示发送按钮


         this.isSendmsLoading=false
     }
     //验证失败
     catch(err){
       /*   console.log('验证失败',err);
          this.$toast({ message:err.message}) */


          //try里面任何代码的错误都会进入catch 
          //不同的错误需要有不同的提示，那就需要判断了
          let message=''
          if(err&&err.response&&err.response.status===429){
              //发送短信失败的错误提示
              message='发送太频繁，请稍后重试'

          }
          else if(err.name==='mobile'){
              //表单验证失败的错误提示
              message=err.message

          }
          else{
              //未知错误
              message='发送失败，请稍后重试'
          }
          this.$toast({
              message,

          })

         this.isSendmsLoading=false

     }
  /*  this.$refs['login-form'].validate('mobile').then(data=>{
       console.log(data);
       
   }) */
        //校验手机号码
        //验证通过-请求发送验证码-用户接收短信-输入验证码-处理响应结果
        //
        //
    }
    

},
created() {

},
mounted() {

},
}
</script>
<style lang='less' scoped>
.login-container{
 /*   /deep/ .van-field__left-icon{
        font-size: 24px!important;
    } */
    .login-btn-wrap{
        padding:  26px 16px;
       
        .login-btn{
             background: #6db4fb;
             border:none;
             .van-button__text{
                 font-size: 15px;
             }
        }
    }
}

</style>