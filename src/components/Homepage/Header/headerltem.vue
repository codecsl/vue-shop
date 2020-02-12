<template>
<div class="headerltem">
    <slot name="userinfo"></slot>
    <slot name="title"></slot>
    <slot name="exit"></slot>
</div>
</template>
<script>
export default {
  name: "component_name",
  data () {
    return {
    };
  }
}
</script>
<style lang="less" scoped>
.headerltem{
    display: flex;
    justify-content:space-between;
}
</style>