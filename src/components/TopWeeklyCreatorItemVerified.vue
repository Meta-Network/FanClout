<template>
  <div class="userplatform-platform">
    <!-- Twitter -->
    <el-tooltip
      class="item"
      effect="dark"
      :content="`@${card.twitter_name}`"
      :disabled="!card.twitter_name"
      placement="top"
    >
      <a
        class="userplatform-platform-unit twitter-color"
        :class="card.twitter_name || 'unit-disable'"
        :href="card.twitter_name && `https://twitter.com/${card.twitter_name}`"
        target="_blank"
      >
        <svg-icon icon-class="twitter" />
      </a>
    </el-tooltip>
    <!-- bilibili -->
    <el-tooltip
      class="item"
      effect="dark"
      :content="`UUID:${card.bilibili_id}`"
      :disabled="!card.bilibili_id"
      placement="top"
    >
      <a
        class="userplatform-platform-unit bilibili-color"
        :class="card.bilibili_id || 'unit-disable'"
        :href="card.bilibili_id && `https://space.bilibili.com/${card.bilibili_id}`"
        target="_blank"
      >
        <svg-icon icon-class="bilibili_tv" />
      </a>
    </el-tooltip>
    <!-- Mastodon -->
    <el-tooltip
      class="item"
      effect="dark"
      :content="card.mastodon_uesr ? `@${card.mastodon_uesr.username}@${card.mastodon_uesr.domain.replace(/^(https?:\/\/)/gm, '')}`: ''"
      :disabled="!card.mastodon_uesr"
      placement="top"
    >
      <a
        class="userplatform-platform-unit mastodon-color"
        :class="card.mastodon_uesr || 'unit-disable'"
        :href="card.mastodon_uesr && `${card.mastodon_uesr.domain}/@${card.mastodon_uesr.username}`"
        target="_blank"
      >
        <svg-icon icon-class="mastodon" />
      </a>
    </el-tooltip>
    <!-- Telegram Channel -->
    <!-- TODO:用户名获取不到 -->
    <!-- <el-tooltip
      placement="top"
      class="item"
      effect="dark"
      content="🚧暂时无法获取Telegram用户名"
    >
      <a
        class="userplatform-platform-unit telegram-color"
      >
        <svg-icon icon-class="telegram" />
      </a>
    </el-tooltip> -->
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.userplatform-platform {
  display: flex;
  align-items: center;

  &-unit {
    width: 33px;
    height: 33px;
    min-width: 33px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 20px;
    color: #00ACED;
    transition: all ease-in 0.1s;
    background: #00000000;

    &.twitter-color {
      color: #00ACED;
    }

    &.bilibili-color {
      color: #44A0D1;
    }

    &.mastodon-color {
      color: #3487D2;
    }

    &.telegram-color {
      color: #0091FF;
      // TG图标太小需要放大
      transform: scale(1.15);
    }

    svg {
      transition: all ease-in 0.1s;
    }

    &:hover {
      background: #00000010;

      svg {
        transform: scale(1.15);
      }
    }

    &.unit-disable {
      color: #b2b2b2;
      background: #00000000;
      cursor: no-drop;

      svg {
        transform: scale(1);
      }
    }
  }
}
</style>
