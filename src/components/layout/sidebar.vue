<template>
  <div class="sidebar">
    <el-input
      v-model="searchValue"
      class="sidebar-search-input"
      placeholder="Search"
      prefix-icon="el-icon-search"
    />
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  components: {},
  data () {
    return {
      searchValue: ''
    }
  },
  computed: {},
  watch: {},
  mounted () {},
  methods: {}
}
</script>

<style lang="less" scoped>
.sidebar {
  padding: 0 25px;
  box-sizing: border-box;

  &-search-input {
    margin: 25px 0 0 0;
    width: 100%;
    /deep/.el-input__inner {
      border-radius: 12px;
      font-family: "Roboto Mono";
    }
  }
}
</style>
