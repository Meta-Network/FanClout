<template>
  <div :id="tag">
    <div v-if="noData || loading" class="infinite-scroll" v-loading="loading">
      <p v-if="!loading">
        {{ noDataText || $t('noStatusYet') }}
      </p>
    </div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle'
import { onMounted, ref, toRefs, nextTick, onUnmounted, watch } from 'vue'

export default {
  props: {
    /** 无数据 */
    noData: {
      type: Boolean,
      default: false
    },
    /** 无数据时的文本 */
    noDataText: {
      type: String,
      default: ''
    },
    /** 加载中 */
    loading: {
      type: Boolean,
      default: false
    },
    /** 触发加载时的距离阈值 */
    distance: {
      type: Number,
      default: 0
    },
    /** 是否在组件渲染完成或解除禁用后立即执行加载方法 */
    immediate: {
      type: Boolean,
      default: true
    },
    /** 组件的 id，用来定位组件在页面中的位置，不能重名 */
    tag: {
      type: String,
      default: 'infinite-scroll-load'
    },
    /** 禁用 */
    disable: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const { loading, distance, immediate, tag, disable } = toRefs(props)
    const scrollEvent = ref(null)

    /** 判断页面位置是否到达阈值 */
    const scroll = () => {
      if (disable.value || loading.value) return

      const currentTop = document.body.scrollTop || document.documentElement.scrollTop
      const clientHeight = document.documentElement.clientHeight || document.body.clientHeight

      const element = document.getElementById(tag.value)
      if (!element) return
      if (currentTop + clientHeight >= element.offsetTop - distance.value) {
        emit('load')
      }
    }

    // 监听是否被禁用
    watch(disable, (val, oldVal) => {
      // 如果 immediate 为真值，则在组件解除禁用后立即 load 一次
      if ((oldVal && !val) && immediate.value) emit('load')
    })

    // 初始化
    onMounted(() => {
      if (process.browser) {
        nextTick(() => {
          if (immediate.value && !disable.value) emit('load')
          scrollEvent.value = throttle(scroll, 300)
          window.addEventListener('scroll', scrollEvent.value)
        })
      }
    })

    // 生命周期结束时移除页面滚动监听器
    onUnmounted(() => {
      window.removeEventListener('scroll', scrollEvent.value)
    })
  }
}
</script>

<style scoped lang="less">
.infinite-scroll {
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  p {
    margin: 0;
    padding: 0;
    font-size: 14px;
    color: #657786;
  }
}
</style>
