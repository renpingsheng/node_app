<template>
    <div class="index">
        <HeadNav></HeadNav>
        <LeftMenu></LeftMenu>
        <!--<router-view></router-view>-->
        <div class="rightContainer">
            <!-- 必须添加，否则二级路由页面不能显示 -->
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import HeadNav from '../components/HeadNav.vue'
    import LeftMenu from '../components/LeftMenu.vue'

    export default {
        name: "index",
        components:{
            HeadNav,
            LeftMenu
        }
    }
</script>

<style scoped>
    .index {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .rightContainer {
        position: relative;
        top: 0;
        left: 180px;
        width: calc(100% - 180px);
        height: calc(100% - 71px);
        overflow: auto;
    }
</style>