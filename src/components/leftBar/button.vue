<template>
  <div class="leftbar-button">
    <a
      class="leftbar__dot leftbar__dot-inactive"
      :href="href"
      target="_blank"
      rel="noopener noreferrer"
      v-if="external"
    >.</a>
    <router-link
      class="leftbar__dot leftbar__dot-inactive"
      :to="href"
      active-class="leftbar__dot-active"
      v-else
    >
      .
    </router-link>
    <div class="leftbar__flex">
      <a
        class="leftbar__text leftbar__text-inactive"
        :href="href"
        target="_blank"
        rel="noopener noreferrer"
        v-if="external"
      ><slot /></a>
      <router-link
        class="leftbar__text leftbar__text-inactive"
        :to="href"
        active-class="leftbar__text-active"
        v-else
      >
        <slot />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeftBarButton',
  props: {
    href: {
      type: String,
      required: true
    },
    external: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
.leftbar {
  &-button {
    display: flex;
    width: 100%;
    padding-top: 15px;
    &:hover {
      .leftbar__dot {
        color: #0058f7 !important;
      }
    }
  }
  &__dot {
    font-size: 50px;
    line-height: 18px;
    cursor: pointer;
    text-decoration: none;
    background-color: initial;
    margin-top: -15px;
    &:hover {
      color: #0058f7 !important;
    }
    &-active {
      color: #0058f7 !important;
    }
    &-inactive {
      color: transparent;
    }
  }
  &__text {
    font-size: 15px;
    cursor: pointer;
    text-decoration: none;
    background-color: initial;
    &-active {
      color: #222 !important;
      font-weight: 700 !important;
    }
    &-inactive {
      color: #555;
    }
  }
  &__flex {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
