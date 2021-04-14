<template>
  <el-input
    v-model="value"
    class="sidebar-search-input"
    placeholder="Search"
    prefix-icon="el-icon-search"
  />
</template>
<script>
export default {
  data () {
    return {
      value: ''
    }
  }
}
</script>
<style lang="less" scoped>
/deep/.el-input__inner {
  border-radius: 12px;
  font-family: "Roboto Mono";
}
</style>
