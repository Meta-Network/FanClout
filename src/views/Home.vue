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
    <p>{{ $t('i18n-message') }}</p>
  </div>
</template>

<script>
import store from 'store2'
import { KEY_ACCESS_TOKEN, KEY_ACCESS_TOKEN_INFO } from '../constants'

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

    try {
      const accessToken = store.get(KEY_ACCESS_TOKEN)
      if (accessToken) {
        /**
         * @type { import('../utils').JWTInfo }
         */
        const accessInfo = store.get(KEY_ACCESS_TOKEN_INFO)
        if (accessInfo.exp > Date.now()) {
          console.log('Can login!')
        }
      }
    } catch (error) {
      console.error(error)
    }
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
