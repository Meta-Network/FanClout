<template>
  <div class="logo-box">
    <router-link class="logo-link" to="/">
      <span class="logo-text">FanClout</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Logo'
}
</script>

<style lang="less" scoped>
.logo {
  &-box {
    height: 80px;
    display: flex;
    align-items: center;
  }
  &-link {
    color: inherit;
    text-decoration: inherit;
  }
  &-text {
    font-size: 27px;
    font-weight: normal;
    line-height: 1;
    margin-bottom: 3px;
    margin-left: 27px;
  }
}
</style>
