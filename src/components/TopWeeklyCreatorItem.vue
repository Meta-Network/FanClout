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
        <!-- 认证标识 -->
        <el-popover
          placement="bottom"
          width="200"
          trigger="hover"
        >
          <!-- 此账户已认领 -->
          <div v-if="creator.verified" class="verified-status">
            <p>{{ $t('thisAccountIsVerified') }}</p>
            <TopWeeklyCreatorItemVerified class="verified-status-platform" :card="creator.verified" />
          </div>
          <!-- 此账户未认领 -->
          <div v-else class="verified-status">
            <p>{{ $t('thisAccountIsNotVerified') }}</p>
          </div>
          <template #reference>
            <i v-if="creator.verified" class="el-icon-success" />
            <i v-else class="el-icon-remove-outline" />
          </template>
        </el-popover>
      </div>
      <span class="top-weekly-creator-item-right">~${{ creator.priceFormated }}</span>
    </a>
  </div>
</template>
<script>
import TopWeeklyCreatorItemVerified from '@/components/TopWeeklyCreatorItemVerified'

export default {
  components: {
    TopWeeklyCreatorItemVerified
  },
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

    &-username {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      word-break: break-all;

      &:hover {
        color: #005bff;
        text-decoration: underline;
      }
    }

    .el-icon-success {
      color: #005bff;
      margin: 0 5px;
    }
    .el-icon-remove-outline {
      margin: 0 5px;
      color: #555;
    }
  }

  &:hover {
    color: black;
  }
}

.verified-status {
  p {
    margin: 0;
  }

  &-platform {
    margin-top: 5px;
  }
}
</style>
