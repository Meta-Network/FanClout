<template>
  <div class="home">
    <div class="home-list" v-loading="loading">
      <template v-for="(item, index) of homeList">
        <!-- Matataki 动态卡片 -->
        <mttkCard
          v-if="item && item.platform === 'matataki'"
          class="home-list-item"
          :key="index"
          :data="item.card"
        />
        <!-- 未知平台 -->
        <div v-else class="home-list-item item-warning" :key="index + '-unsupportedStausType'">
          {{ $t('home.unsupportedStausType', [item ? item.platform : 'unknown']) }}<br>
          ID: {{ item ? item.id : 'unknown' }}
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import mttkCard from '@/components/statusCard/mttk'

import testData from '@/testData.json'

export default {
  name: 'Home',
  components: {
    mttkCard
  },
  inject: ['setTitle'],
  data () {
    return {
      loading: false,
      homeList: [],
      homeCount: 0
    }
  },
  computed: {
    time () {
      return this.$moment().format('YYYY-MM-DD HH:mm:ss')
    }
  },
  mounted () {
    this.setTitle('Home')
    this.loadMore()
  },
  methods: {
    /** 模拟数据获取 */
    getHomeStatus () {
      return new Promise((resolve) => {
        setTimeout(function () {
          resolve(JSON.parse(JSON.stringify(testData)))
        }, 1000)
      })
    },
    async loadMore () {
      this.loading = true
      const res = await this.getHomeStatus()
      this.loading = false
      if (!res || res.code) return
      this.homeList = res.data.list.map(item => {
        return {
          card: this.tryJsonParse(item.data),
          frontQueue: [],
          id: item.id,
          platform: item.platform,
          platform_user: item.platform_user,
          platform_user_id: item.platform_user_id,
          platform_username: item.platform_username,
          stats: {
            like: item.like,
            liked: item.liked
          }
          // frontQueue: this.getFrontQueue(res.data, i)
        }
      })
      this.homeCount = res.data.count
    },
    tryJsonParse (str) {
      if (!str) return null
      try {
        return JSON.parse(str)
      } catch (e) {
        console.warn('转换动态列表 JSON 时出现错误：', e)
        return null
      }
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  margin: 40px 20px 40px;
  text-align: center;
}
.home {
  padding: 0;

  &-list {
    min-height: 100px;

    &-item {
      background-color: white;
      border-bottom: 1px solid #e5e5e5;
      &.item-warning {
        padding: 15px;
        color: #E6A23C;
        overflow-wrap: break-word;
        word-wrap: break-word;
        -ms-word-break: break-all;
        word-break: break-word;
      }
    }
  }
}
</style>
