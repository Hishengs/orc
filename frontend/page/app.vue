<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  export default {
    name: 'app',
  };
</script>

<style lang="less">
  html, body {
    height: 100%;
  }
  #app {
    height: 100%;
  }
</style>
