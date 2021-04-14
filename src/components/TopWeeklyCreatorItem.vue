<template>
  <div>
    <a>
      <div class="top-weekly-creator-item">
        <div class="top-weekly-creator-item-left">
          <img class="top-weekly-creator-item-left-avatar" :src="avatar" alt="user avatar">
          <span class="top-weekly-creator-item-left-username">{{ username }}</span>
        </div>
        <span class="top-weekly-creator-item-right">~${{ fanTicketPrice }}</span>
      </div>
    </a>
  </div>
</template>
<script>
export default {
  props: {
    avatar: {
      type: String,
      required: false,
      default: ''
    },
    username: {
      type: String,
      required: true
    },
    fanTicketPrice: {
      type: String,
      required: true
    }
  }
}
</script>
<style scoped lang="less">
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
  }
  &-right {

  }
}
</style>
