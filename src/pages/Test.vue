<template>
  <div>
    这是Test
    {{resData}}
  </div>
</template>

<script>
import { getTest } from "network/login/login.js";

export default {
  name: 'Test',
  data() {
    return {
      resData: 'aaa'
    }
  },
  mounted() {
    getTest().then(res => {
      this.resData = res
    })
  }
}
</script>

<style>

</style>