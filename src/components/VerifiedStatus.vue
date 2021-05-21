<template>
  <!-- 认证标识 -->
  <el-popover
    placement="bottom"
    width="200"
    trigger="hover"
  >
    <!-- 此账户已认领 -->
    <div v-if="!isEmpty(verified)" class="verified-status">
      <p>{{ $t("thisAccountIsVerified") }}</p>
      <TopWeeklyCreatorItemVerified
        class="verified-status-platform"
        :card="verified"
      />
    </div>
    <!-- 此账户未认领 -->
    <div v-else class="verified-status">
      <p>{{ $t("thisAccountIsNotVerified") }}</p>
    </div>
    <template #reference>
      <div class="verified-status-icons">
        <i v-if="!isEmpty(verified)" class="el-icon-success" />
        <i v-else class="el-icon-remove-outline" />
      </div>
    </template>
  </el-popover>
</template>

<script>
import TopWeeklyCreatorItemVerified from '@/components/TopWeeklyCreatorItemVerified'
import { isEmpty } from '../utils'

export default {
  components: {
    TopWeeklyCreatorItemVerified
  },
  props: {
    verified: {
      type: [Object, null],
      required: true,
      default: null
    }
  },
  methods: {
    isEmpty
  }
}
</script>

<style lang="less" scoped>
.verified-status {
  p {
    margin: 0;
  }

  &-platform {
    margin-top: 5px;
  }

  &-icons {
    display: flex;
    align-items: center;
    .el-icon-success {
      color: #005bff;
      margin: 0 5px;
    }
    .el-icon-remove-outline {
      margin: 0 5px;
      color: #555;
    }
  }
}
</style>
