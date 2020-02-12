<template>
  <div class="home">
   <Str/>
  </div>
</template>

<script>

import Str from "components/Homepage/Structure.vue"
export default {
  name: 'home',
  components: {
   Str
  }
}
</script>
<style lang="less" scope>
  .home{
    height: 100%;
  }
</style>
