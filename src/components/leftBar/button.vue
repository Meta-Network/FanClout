<template>
  <div class="leftbar-button">
    <router-link class="leftbar__dot leftbar__dot-inactive" :to="href" active-class="leftbar__dot-active">
      .
    </router-link>
    <div class="leftbar__flex">
      <router-link class="leftbar__text leftbar__text-inactive" :to="href" active-class="leftbar__text-active">
        {{ name }}
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
    name: {
      type: String,
      required: true
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
    padding-left: 15px;
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
