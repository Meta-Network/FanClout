<template>
  <div class="nav">
    <div class="nav-fixed">
      <div class="nav-inner">
        <logo />
        <UserInfoBar class="nav-user-info" />
        <left-bar-button href="/">
          {{ $t('nav-home') }}
        </left-bar-button>
        <left-bar-button href="/contributors">
          {{ $t('nav-contributors') }}
        </left-bar-button>
        <left-bar-button external href="https://app.unisave.exchange/#/swap?inputCurrency=0xe9e7cea3dedca5984780bafc599bd69add087d56&outputCurrency=0xebd31fd3e751b19b745e64b6422ef195b7015cc4">
          {{ $t('nav-buy-meta') }}
        </left-bar-button>
        <left-bar-button href="/about">
          {{ $t('nav-about') }}
        </left-bar-button>
      </div>
    </div>
  </div>
</template>

<script>
import LeftBarButton from '../leftBar/button'
import Logo from '../leftBar/logo'
import UserInfoBar from '../UserInfoBar'

export default {
  name: 'Navigation',
  components: {
    LeftBarButton,
    Logo,
    UserInfoBar
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  mounted () {},
  methods: {}
}
</script>

<style lang="less" scoped>
.nav {
  width: 245px;
  &-fixed {
    top: 0;
    height: 100%;
    position: fixed;
  }
  &-inner {
    width: 245px;
    overflow-y: auto;
    height: 100%;
    padding: 0 10px;
  }
  &-user-info {
    margin-left: 30px;
    margin-right: 15px;
  }
}
</style>
