<template>
  <div class="sidebar">
    <SearchBox class="sidebar-search-box" />
  </div>
</template>

<script>
import SearchBox from '@/components/SearchBox'
export default {
  name: 'Sidebar',
  components: { SearchBox },
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

  &-search-box {
    margin: 25px 0 0 0;
    width: 100%;
  }
}
</style>
