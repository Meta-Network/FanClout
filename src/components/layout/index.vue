<template>
  <div class="layout">
    <div class="nav-shell">
      <Navigation />
    </div>
    <div class="slot-shell" :class="hideSidebar && 'slot-shell-wider'">
      <div class="slot-shell-header">
        <h3>
          <slot name="title" />
        </h3>
      </div>
      <slot />
    </div>
    <div v-if="!hideSidebar" class="sidebar-shell">
      <Sidebar />
    </div>
  </div>
</template>

<script>
import Navigation from './navigation'
import Sidebar from './sidebar'

export default {
  name: 'Layout',
  components: {
    Navigation,
    Sidebar
  },
  props: {
    hideSidebar: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
.layout {
  width: 100%;
  max-width: 1240px;
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  padding: 0;
  margin: 0 auto;

  .shell {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }

  .nav-shell {
    .shell();
    width: 265px;
    align-items: flex-end;
  }

  .slot-shell {
    .shell();
    width: 602px;
    border-left: 1px solid #e5e5e5;
    border-right: 1px solid #e5e5e5;
    background-color: #f8f8f8;

    &.slot-shell-wider {
      flex: 1;
    }

    &-header {
      height: 80px;
      width: 100%;
      border-bottom: 1px solid #e5e5e5;
      display: flex;
      align-items: center;
      padding: 0 20px;
      box-sizing: border-box;
      background-color: white;

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
