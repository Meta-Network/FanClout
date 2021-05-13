<template>
  <div class="top-weekly-creators">
    <div class="top-weekly-creators-title">
      <a>Top Weekly Creators</a>
    </div>
    <div>
      <TopWeeklyCreatorItem
        v-for="(creator, index) in topCreatorsSorted"
        :key="index"
        :creator="creator"
        class="top-weekly-creators-item-container"
      />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import TopWeeklyCreatorItem from '@/components/TopWeeklyCreatorItem'

export default {
  components: { TopWeeklyCreatorItem },
  computed: {
    ...mapGetters(['topCreatorsSorted'])
  },
  mounted () {
    this.updateCreatorData()
  },
  methods: {
    ...mapActions(['updateCreatorData'])
  }
}
</script>
<style lang="less" scoped>
.top-weekly-creators {
  &-title {
    font-size: 15px;
    font-weight: 700;
    color: #555;
    margin-bottom: 15px;
  }
  &-item-container {
    margin-bottom: 15px;
  }
}
</style>
