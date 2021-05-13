<template>
  <div class="layout">
    <!-- 导航栏 -->
    <div class="nav-shell">
      <Navigation />
    </div>

    <div class="slot-shell" :class="hideSidebar && 'slot-shell-wider'">
      <!-- 页眉 -->
      <div class="slot-shell-header">
        <!-- 菜单按钮 -->
        <div class="slot-shell-header-menu-btn" @click="menuShow = true">
          <svg-icon icon-class="menu" />
        </div>
        <!-- 标题 -->
        <h3>
          <slot name="title" />
        </h3>
        <!-- 搜索框 -->
        <SearchBox v-if="hideSidebar" class="slot-shell-header-search-box" />
      </div>
      <!-- 页面主体插槽 -->
      <slot />
    </div>

    <!-- 侧边栏 -->
    <div v-if="!hideSidebar" class="sidebar-shell">
      <Sidebar />
    </div>

    <!-- 抽屉形式的侧边栏 -->
    <el-drawer
      class=".nav-drawer"
      direction="ltr"
      :size="300"
      :with-header="false"
      v-model="menuShow"
    >
      <div class="nav-drawer-close-btn" @click="menuShow = false">
        <svg-icon icon-class="close" />
      </div>
      <Navigation />
    </el-drawer>
  </div>
</template>

<script>
import { ref } from 'vue'

import Navigation from './navigation'
import Sidebar from './sidebar'
import SearchBox from '@/components/SearchBox'

export default {
  name: 'Layout',
  components: {
    Navigation,
    Sidebar,
    SearchBox
  },
  props: {
    hideSidebar: {
      type: Boolean,
      default: false
    }
  },
  setup () {
    const menuShow = ref(false)
    return {
      menuShow
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
      position: sticky;
      top: 0px;
      z-index: 100;

      &-menu-btn {
        user-select: none;
        width: 30px;
        height: 30px;
        font-size: 25px;
        color: #8a8a8a;
        justify-content: center;
        align-items: center;
        margin-right: 15px;
        cursor: pointer;
        display: none;

        &:hover {
          color: black;
        }
      }

      h3 {
        user-select: none;
        font-size: 18px;
        font-weight: 700;
        color: black;
        margin: 0;
        padding: 0;
        flex: 1;
      }

      &-search-box {
        width: 234px;
      }
    }
  }

  .sidebar-shell {
    .shell();
    flex: 1;
  }

  .nav-drawer {

    &-close-btn {
      position: absolute;
      top: 20px;
      right: 10px;
      width: 30px;
      height: 30px;
      font-size: 35px;
      color: #8a8a8a;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 15px;
      cursor: pointer;
      z-index: 100;
      &:hover {
        color: black;
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .layout {

    .nav-shell {
      display: none;
    }

    .slot-shell {
      flex: 2;
      border-left: none;

      &-header {
        &-menu-btn {
          display: flex;
        }
      }
    }

    .sidebar-shell {
      min-width: 365px;
    }
  }
}

@media screen and (max-width: 928px) {
  .layout {

    .slot-shell {
      border-right: none;

      &-header {
        padding: 0 10px;
        height: 60px;

        &-search-box {
          display: none;
        }
      }
    }

    .sidebar-shell {
      display: none;
    }
  }
}
</style>
