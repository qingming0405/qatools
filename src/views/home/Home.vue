<template>
  <div class="home">
    <h1>这是首页</h1>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {

    }
  },
  created() {
    console.log('Home path: ', this.$route.path);
  }
}
</script>

<style lang="scss" scoped>
  .home {
    width: 100%;
    height: calc(100% - 44px);

    font-size: 16px;
  }
</style>