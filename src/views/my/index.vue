<!--  -->
<template>
<div class='my-container'>
<!--    <div class="user-info">
       <div class="base-info"></div>
       <div class="data-info"></div>
   </div> -->
   <van-cell-group v-if='user' class='user-info'>
       <!-- base-info -->
  <van-cell class='base-info' center :border="false"> 
      <van-image
      class='avatar'
      slot='icon'
      round
      fit='cover'
      :src="currentUser.photo"
      />
      <div class='name' slot='title'>{{currentUser.name}}</div>
      <van-button class='update-btn' round size='small'>编辑资料</van-button>
  </van-cell>
  <!-- data-info -->
<van-grid class='data-info' :border='false'>
  <van-grid-item class='data-info-item'><div class='text-wrap' slot='text'><div class="count">{{currentUser.art_count}}</div><div class="text">头条</div></div></van-grid-item>
  <van-grid-item class='data-info-item'><div class='text-wrap' slot='text'><div class="count">{{currentUser.follow_count}}</div><div class="text">关注</div></div></van-grid-item>
  <van-grid-item class='data-info-item'><div class='text-wrap' slot='text'><div class="count">{{currentUser.fans_count}}</div><div class="text">粉丝</div></div></van-grid-item>
  <van-grid-item class='data-info-item'><div class='text-wrap' slot='text'><div class="count">{{currentUser.like_count}}</div><div class="text">获赞</div></div></van-grid-item>
</van-grid>
</van-cell-group>


<!-- 未登录状态 -->
<div v-else class="notlogin">
    <div class="phone" @click="$router.push('/login')">
        <img src="./521.jpeg" alt="">
    </div>
    <div class="text" >登录／注册</div>
</div>
<!-- 收藏，历史 -->
<van-grid class='nav-grid mb-4' :column-num="2">
  <van-grid-item class='nav-grid-item' icon="star-o" text="收藏" />
  <van-grid-item class='nav-grid-item'  icon="envelop-o" text="历史" />
</van-grid>

<!--跳转  -->
<van-cell title="消息通知" is-link to="/" />
<van-cell class='mb-4' title="小智同学" is-link to="/" />
<!-- 退出登录 -->
<van-cell v-if='user' class='logout-btn' title="退出登录" @click='onLogout' />


</div>
</template>

<script>
import {mapState}from 'vuex'
import {getCurrentUser} from '@/api/user'

export default {
name:'my',
components: {},
data() {
return {
    currentUser:{}

}
},
computed: {
    ...mapState(['user'])
},
watch: {},
methods: {

     async loadCurrentUser(){
        const { data }=await getCurrentUser()
        this.currentUser=data.data
        
    },
    //退出登录
    onLogout(){
        this.$dialog.confirm({
  title: '退出确认',
  message: '退出后，收藏／历史相关无法关联，是否继续？',
})
  .then(() => {
    // on confirm
    //清除用户登录状态
    this.$store.commit('setUser',null)
  })
  .catch(() => {
    // on cancel
  });
    }

},
created() {
    this.loadCurrentUser()

},
mounted() {

},
}
</script>
<style lang='less' scoped>

.my-container{
    background: seashell;
    height: 100%;
    //user-info
   
    .user-info{
        background: url('./1314.jpeg');
        background-size: cover;
        
        .base-info{
            background: unset;
            box-sizing: border-box;
            height: 115px;
            padding-top: 38px;
            padding-bottom: 11px;
            .avatar{
                width: 66px;
                height: 66px;
                box-sizing: border-box;
                border: 1px solid #fff;
                margin: 11px;
            }
          
            .name{
                font-size: 15px;
                color: #fff;
            }

            .update-btn{
                height: 26px;
              font-size: 10px;
              color:#666;
            }
        }
        .data-info{
            background: unset;
            .data-info-item{
             height: 65px;
             color: #ffffff;
             .text-wrap{

                 display: flex;
                 flex-direction:column;
                 justify-content: center;
                 align-items: center;

                  .count{
                 font-size: 18px;
             }
              .text{
                 font-size: 10px;
             }
            
             }
            
            }
           
            /* /deep/ ?? */
           /deep/ .van-grid-item__content{
                background: unset;
                
            }
        }
    }


//not login
.notlogin{
    height: 180px;
    background:url('./521.jpeg');
     background-size: cover;
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
    .phone{
        width: 66px;
        height: 66px;
        border-radius: 50%;
        overflow: hidden;
    }
    .text{
        font-size: 18px;
        color: #fff
    }
   


}

    //van-grid
    /deep/.nav-grid{
             height: 85px;
        .nav-grid-item{
            .van-icon {
                font-size: 22px; 
            }
            .van-icon-star-o {
                    color: sandybrown;
            }
            .van-icon-envelop-o{
                color: rgb(83, 202, 142);
            }
            .van-grid-item__text{
                font-size: 14px;
                color: #333;
            }
          
        }

    }

    .logout-btn{
    text-align: center;
    color: skyblue;
}
.mb-4{
            margin-bottom: 4px;    
        }


}

</style>