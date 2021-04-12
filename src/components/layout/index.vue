<template>
  <div class="layout">
    <div class="nav-shell">
      <navigation />
    </div>
    <div class="slot-shell">
      <div class="slot-shell-header">
        <h3>
          <slot name="title" />
        </h3>
      </div>
      <slot />
    </div>
    <div class="sidebar-shell">
      <sidebar />
    </div>
  </div>
</template>

<script>
import navigation from './navigation'
import sidebar from './sidebar'

export default {
  name: 'Layout',
  components: {
    navigation,
    sidebar
  }
}
</script>

<style lang="less" scoped>
.layout {
  width: 100%;
  max-width: 1220px;
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  padding: 0 10px;
  margin: 0 auto;

  .shell {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }

  .nav-shell {
    .shell();
    width: 245px;
  }

  .slot-shell {
    .shell();
    width: 602px;
    border-left: 1px solid #e5e5e5;
    border-right: 1px solid #e5e5e5;

    &-header {
      height: 80px;
      width: 100%;
      border-bottom: 1px solid #e5e5e5;
      display: flex;
      align-items: center;
      padding: 0 20px;
      box-sizing: border-box;

      h3 {
        font-size: 18px;
        font-weight: 700;
        color: black;
        margin: 0;
        padding: 0;
      }
    }
  }

  .sidebar-shell {
    .shell();
    flex: 1;
  }
}
</style>
