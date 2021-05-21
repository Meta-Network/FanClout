<template>
  <div class="sidebar">
    <SearchBox class="sidebar-search-box" />
    <MetaCoinStatus class="sidebar-meta-coin-status" :price="mtbtPrice" />
    <RightBarLogIn class="sidebar-login" v-if="!isLogined" />
    <TopWeeklyCreators class="sidebar-top-weekly-creators" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import SearchBox from '@/components/SearchBox'
import MetaCoinStatus from '@/components/MetaCoinStatus'
import TopWeeklyCreators from '@/components/TopWeeklyCreators'
import RightBarLogIn from '@/components/RightBarLogIn'

export default {
  name: 'Sidebar',
  components: { TopWeeklyCreators, MetaCoinStatus, SearchBox, RightBarLogIn },
  data () {
    return {
      searchValue: ''
    }
  },
  computed: {
    ...mapState(['userInfo']),
    ...mapGetters(['isLogined', 'mtbtPrice'])
  },
  watch: {},
  async mounted () {
    await this.getMetaCoinData()
  },
  methods: {
    ...mapActions(['getMetaCoinData'])
  }
}
</script>

<style lang="less" scoped>
.sidebar {
  padding: 0 20px;
  box-sizing: border-box;
  top: 0;
  position: sticky;

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

  &-login {
    margin-top: 25px;
  }
}
</style>
