<template>
  <div class="card">
    <div v-for="(item, index) in queue" :key="index">
      <twitterCardUnit
        v-if="item && !item.showMoreButton"
        :card="item"
        :show-up-line="index !== 0"
        :show-down-line="index !== queue.length - 1"
        :show-logo="showLogo"
        :from-user="fromUser"
        :stats="index === queue.length-1 ? stats : undefined"
        @click-like="value => $emit('click-like', value)"
      />
      <moreReplies v-else />
    </div>
  </div>
</template>

<script>
import twitterCardUnit from './twitter_card_unit'
import moreReplies from './more_replies'

export default {
  components: {
    twitterCardUnit,
    moreReplies
  },
  props: {
    // 卡片数据
    card: {
      type: Object,
      required: true
    },
    frontQueue: {
      type: Array,
      default: () => []
    },
    showLogo: {
      type: Boolean,
      default: false
    },
    fromUser: {
      type: Object,
      default: null
    },
    stats: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      replyQueue: []
    }
  },
  computed: {
    queue () {
      return [...this.replyQueue, this.card]
    }
  },
  mounted () {
    this.replyQueue = this.frontQueue
    if (this.queue[0].in_reply_to_status_id) {
      this.replyQueue.unshift({ showMoreButton: true, inReplyToStatusId: this.queue[0].in_reply_to_status_id })
    }
  }

}
</script>

<style lang="less" scoped>

.card {
  background: rgba(255, 255, 255, 1);
  padding: 20px;
  border-radius: 0;
  box-sizing: border-box;
  overflow: hidden;
}

@media screen and (max-width: 928px) {
  .card {
    padding: 20px 14px;
  }
}
</style>
