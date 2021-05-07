<template>
  <div id="app">
    <Layout :hide-sidebar="hideSidebar">
      <template #title>
        {{ title }}
      </template>
      <router-view />
    </Layout>
  </div>
</template>

<script>
import Layout from '@/components/layout'

export default {
  name: 'App',
  components: {
    Layout
  },
  provide () {
    return {
      setTitle: this.setTitle,
      setHideSidebar: this.setHideSidebar
    }
  },
  data () {
    return {
      title: '',
      hideSidebar: false
    }
  },
  watch: {
    $route (val, oldVal) {
      if (val.name !== oldVal.name) {
        this.setHideSidebar(false)
        this.setTitle('')
      }
    }
  },
  methods: {
    setTitle (value) {
      this.title = value
    },
    setHideSidebar (value) {
      this.hideSidebar = Boolean(value)
    }
  }
}
</script>

<style lang="less">
body {
  margin: 0;
  padding: 0;
}

*, :after, :before {
  box-sizing: border-box;
}

#app {
  font-family: 'Roboto Mono';
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  text-align: left;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
  width: 100%;

  // 避免 el 的加载遮罩 挡住页面顶部的悬浮导航栏
  .el-loading-mask {
    z-index: 98 !important;
  }
}

.el-notification__group {
  .el-notification__content {
    span {
      display: block;
      text-align: left;
    }
  }
}
</style>
