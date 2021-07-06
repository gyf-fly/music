<template>
    <div class="mask">
        <van-loading size="24px" color="#1989fa" type="spinner" vertical>加载中...</van-loading>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="less" scoped>
.mask{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
    height: 100%;
    background: rgba(0, 0, 0, .6);
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>