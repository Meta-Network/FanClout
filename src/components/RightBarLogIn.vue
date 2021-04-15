<template>
  <div class="login">
    <div class="login-text">
      {{ $t('right-bar-login-welcome') }}
    </div>
    <div class="login-button-group">
      <button class="login-login" @click="handleLogInClick">
        {{ $t('log-in') }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RightBarLogIn',
  methods: {
    handleLogInClick () {
      window.open(process.env.VUE_APP_MTTK_DEV_OAUTH_URL, '_self')
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  display: block;
  &-text {
    color: #222;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 5px;
  }
  &-button-group {
    display: flex;
    align-items: center;
  }
  &-login {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    color: #fff;
    text-align: center;
    vertical-align: middle;
    user-select: none;
    background-color: #005bff;
    border: 1px solid #005bff;
    padding: .375rem .75rem;
    font-size: 15px;
    line-height: 15px;
    border-radius: 12px;
    height: 36px;
    transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
    outline: none;
    min-width: 90px;
    &:not(:disabled):not(.disabled) {
      cursor: pointer;
    }
    &:hover, &:focus {
      color: #fff;
      background-color: #004bd1;
      border-color: #0047c4;
    }
  }
}
</style>
