<template>
  <div class="nav">
    <div class="nav-fixed">
      <div class="nav-inner">
        <h3>
          FanClout
        </h3>
        <left-bar-button href="/" name="Home" />
        <left-bar-button href="/about" name="About" />
      </div>
    </div>
  </div>
</template>

<script>
import LeftBarButton from '../leftBar/button'

export default {
  name: 'Navigation',
  components: {
    LeftBarButton
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
}
</style>
