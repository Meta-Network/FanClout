<template>
  <div class="home">
    <h1 class="title" v-loading="loading">
      FanClout
    </h1>
    <p>
      <svg-icon icon-class="time" />
      {{ time }}
    </p>
    <el-button type="primary">
      {{ message }}
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  inject: ['setTitle'],
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
    this.setTitle('Home')
  }
}
</script>

<style lang="less" scoped>
.title {
  margin: 40px 20px 40px;
  text-align: center;
}
.home {
  padding: 0 10px;
  text-align: center;
}
</style>
