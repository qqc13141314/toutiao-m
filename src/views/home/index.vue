<!--  -->
<template>
<div class='home-container'>
    <!-- 导航栏 -->
   <van-nav-bar class='app-nav-bar'>
       <van-button class='search-btn' slot='title' icon='search' type='info' round>搜索</van-button> 
   </van-nav-bar>

   <van-tabs v-model="active" color='skyblue'>
  <van-tab :title="channel.name" v-for='channel in channels' :key='channel.id'>{{channel.name}}的内容</van-tab>

</van-tabs>
</div>
</template>

<script>
import {getUserChannels}from '@/api/user'
export default {
name:'home',
components: {},
data() {
return {
     active: 0,
     channels:[]//频道列表
     

}
},
computed: {},
watch: {},
methods: {
    async loadChannels(){
        //请求获取频道数据
        const {data}=await getUserChannels()
        console.log(data);
        this.channels=data.data.channels
        
    }

},
created() {
    this.loadChannels()

},
mounted() {

},
}
</script>
<style lang='less' scoped>
.home-container{
    /deep/.van-nav-bar__title {
        max-width: none;
    }
    .search-btn{
        width: 277px;
        height: 32px;
        background: #5badfb;
        .van-icon{
            font-size: 16px;
        }
        .van-button__text{
            font-size: 14px;
        }
}}

</style>