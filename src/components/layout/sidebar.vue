<template>
  <div class="sidebar">
    <SearchBox class="sidebar-search-box" />
    <MetaCoinStatus class="sidebar-meta-coin-status" />
    <TopWeeklyCreators class="sidebar-top-weekly-creators" />
  </div>
</template>

<script>
import SearchBox from '@/components/SearchBox'
import MetaCoinStatus from '@/components/MetaCoinStatus'
import TopWeeklyCreators from '@/components/TopWeeklyCreators'
export default {
  name: 'Sidebar',
  components: { TopWeeklyCreators, MetaCoinStatus, SearchBox },
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

  &-meta-coin-status {
    margin: 25px 0 0 0;
  }

  &-top-weekly-creators {
    margin: 25px 0 0 0;
  }
}
</style>
