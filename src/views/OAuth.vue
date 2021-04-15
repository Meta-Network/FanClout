<template>
  <div class="oauth-text">
    {{ oauthFail ? $t('oauth-fail') : $t('redirecting') }}
  </div>
</template>

<script>
import store from 'store2'
import { disassembleJWT } from '../utils'
import { KEY_ACCESS_TOKEN, KEY_ACCESS_TOKEN_INFO } from '../constants'

export default {
  name: 'Home',
  data () {
    return {
      oauthFail: false
    }
  },
  mounted () {
    this.oAuthRedirect()
  },
  methods: {
    oAuthRedirect () {
      try {
        const { token, path } = this.$route.query
        if (token) {
          store.set(KEY_ACCESS_TOKEN, token)
          store.set(KEY_ACCESS_TOKEN_INFO, disassembleJWT(token))
          setTimeout(() => {
            this.redirectToPath(path)
          }, 3000)
        } else {
          this.oauthFail = true
        }
      } catch (error) {
        this.oauthFail = true
        console.error(error)
      }
    },
    redirectToPath (path) {
      this.$router.push(path || '/')
    }
  }
}
</script>

<style lang="less" scoped>
.oauth {
  &-text {
    font-size: 20px;
    text-align: center;
    margin-top: 20px;
    padding: 0 10px;
  }
}
</style>
