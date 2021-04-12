<template>
  <h1 class="title" v-loading="loading">
    FanClout
  </h1>
  <p>
    <svg-icon icon-class="time" />
    {{ time }}
  </p>
  <el-button type="primary">{{ message }}</el-button>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      message: 'Hello Element Plus',
      loading: false
    }
  },
  computed: {
    time () {
      return this.$moment().format('YYYY-MM-DD HH:mm:ss')
    }
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
.title {
  margin: 40px 20px 40px;
  text-align: center;
}
</style>
