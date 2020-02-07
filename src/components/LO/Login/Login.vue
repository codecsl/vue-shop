<template>
<div id="login">
<Logi></Logi>

</div>
</template>

<script>
import Logi from 'components/LO/Logi/Logi'
export default {
  name: "component_name",
  data () {
    return {
    };
  },
  components:{
      Logi
  },
 
}
</script>
<style lang="less" scoped>
#login{
    height: 100%;
    background: #2b4b66
}
</style>