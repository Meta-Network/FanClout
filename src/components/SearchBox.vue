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
/deep/ .el-input__inner {
  border-radius: 12px;
  font-size: 15px;
  color: #6c757d;
  font-family: "Roboto Mono";
  &:focus {
    border-color: #DCDFE6;
  }
  &:hover {
    border-color: #DCDFE6;
  }
}

</style>
