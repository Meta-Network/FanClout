<template>
  <div class="meta-status">
    <div class="meta-status-price">
      <span class="meta-status-text-dark">{{ $t('meta-price') }}</span>
      <span class="meta-status-text-dark">~${{ price }} <span class="meta-status-text-light">{{ $t('usd-per-coin') }}</span></span>
    </div>
    <!-- <div class="meta-status-user-meta">
      <span class="meta-status-text-dark">{{ $t('your-meta') }}</span>
      <span class="meta-status-text-dark">{{ userMeta }} <span class="meta-status-text-light"> ≈ ${{ equalsUSD }} {{ $t('usd') }}</span></span>
    </div> -->
  </div>
</template>
<script>
export default {
  props: {
    price: {
      type: Number,
      required: false,
      default: 0
    },
    userMeta: {
      type: Number,
      required: false,
      default: 0
    }
  },
  computed: {
    // equalsUSD () {
    //   return this.price * this.userMeta
    // }
  }
}
</script>
<style lang="less" scoped>
.meta-status {
  background: #f8f8f8;
  border-radius: 12px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 13px;
  font-weight: 700;

  &-price {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  &-user-meta {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
  }
  &-text-dark {
    color: #555;
  }
  &-text-light {
    color: #6c757d;
  }
}
</style>
