<template>
  <div class="user-info-bar" :class="{ 'user-info-bar__shadow': shoreMoreOptions }" v-if="isLoggedIn">
    <div class="user-info-bar-container" @click="handleShowMoreOptions">
      <div class="user-info-bar-info">
        <avatar class="user-info-bar-info-avatar" :src="avatarImg" />
        <div class="user-info-bar-info-name">
          {{ userInfo.nickname }}
        </div>
      </div>
      <font-awesome-icon class="user-info-bar-down-arrow" icon="angle-down" />
    </div>
    <div class="user-info-bar-container" v-if="shoreMoreOptions" @click="handleLogOutClick">
      <div class="user-info-bar-log-out">
        {{ $t('log-out') }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import store from 'store2'
import avatar from '@/common/components/avatar'

export default {
  name: 'UserInfoBar',
  components: {
    avatar
  },
  data () {
    return {
      shoreMoreOptions: false
    }
  },
  computed: {
    ...mapState(['userInfo']),
    isLoggedIn () {
      return this.userInfo && this.userInfo.id !== -1
    },
    avatarImg () {
      if (this.userInfo && this.userInfo.avatar) return this.$API.getImg(this.userInfo.avatar)
      return ''
    }
  },
  methods: {
    ...mapMutations(['resetUserInfo']),
    handleLogOutClick () {
      this.resetUserInfo()
      store.clearAll()
      location.reload()
    },
    handleShowMoreOptions () {
      this.shoreMoreOptions = !this.shoreMoreOptions
    }
  }
}
</script>

<style lang="less" scoped>
.user-info-bar {
  position: relative;
  z-index: 30;
  background-color: #f8f8f8;
  width: 185px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 12px;
  font-size: 14px;
  color: #222;
  cursor: pointer;
  &-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
    &:hover {
      background-color: #f5f5f5;
    }
  }
  &-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-name {
      line-height: 1;
    }
    &-avatar {
      margin-right: 8px;
    }
  }
  &-down-arrow {
    margin-top: 2px;
    margin-left: 2px;
    color: #555;
  }
  &-log-out {
    font-weight: 700;
    padding-top: 10px;
    padding-left: 10px;
  }

  &__shadow {
    box-shadow: rgba(101, 119, 134, 0.2) 0 0 15px 0px, rgba(101, 119, 134, 0.15) 0 0 3px 1px;
  }
}
</style>
