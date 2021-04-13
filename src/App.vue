<template>
  <div id="app">
    <Layout>
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
      setTitle: this.setTitle
    }
  },
  data () {
    return {
      title: ''
    }
  },
  methods: {
    setTitle (value) {
      this.title = value
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
