<template>
  <div class="nav">
    <div class="nav-fixed">
      <div class="nav-inner">
        <h3>
          FanClout
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  components: {},
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
