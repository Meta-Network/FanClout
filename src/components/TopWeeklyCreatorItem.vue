<template>
  <div>
    <a class="top-weekly-creator-item" :href="creator.buyUrl" target="_blank">
      <div class="top-weekly-creator-item-left">
        <a :href="creator.homepage" target="_blank">
          <img class="top-weekly-creator-item-left-avatar" :src="creator.avatar" alt="user avatar">
        </a>
        <a :href="creator.homepage" target="_blank">
          <span class="top-weekly-creator-item-left-username">{{ creator.name }}</span>
        </a>
      </div>
      <span class="top-weekly-creator-item-right">~${{ creator.price }}</span>
    </a>
  </div>
</template>
<script>
export default {
  props: {
    creator: {
      type: Object,
      required: true
    }
  }
}
</script>
<style scoped lang="less">
a {
  text-decoration: none;
  color: #555;
}

.top-weekly-creator-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: #555;
  &-left {
    display: flex;
    img {
      height: 28px;
      width: 28px;
      border-radius: 3px;
      margin-right: 10px;
    }
    align-items: center;

    &-username:hover {
      color: #005bff;
      text-decoration: underline;
    }
  }

  &:hover {
    color: black;
  }
}
</style>
