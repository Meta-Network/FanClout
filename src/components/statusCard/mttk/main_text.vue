<template>
  <p class="dynamic-text" v-html="content || '&nbsp;'" />
</template>

<script>
import { renderLinkUser } from '@/utils/share'
import { filterOutHtmlShare } from '@/utils/xss'

export default {
  components: {
  },
  props: {
    // 卡片数据
    card: {
      type: Object,
      required: true
    }
  },
  computed: {
    content () {
      // 向后兼容 this.card.short_content_share || this.card.short_content
      return this.$utils.compose(renderLinkUser, filterOutHtmlShare)(this.card.short_content_share || this.card.short_content)
    }
  }
}
</script>

<style lang="less" scoped>
.dynamic-text {
  color: #333;
  overflow: hidden;
  width: 100%;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  word-wrap: break-word;
  -ms-word-break: break-all;
  word-break: break-word;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 20;
  -webkit-box-orient: vertical;
  em {
    font-weight: bold;
    font-style: normal;
    color: #409EFF;
  }
  a {
    color: rgb(47, 174, 227)
  }
}
</style>
