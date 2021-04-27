<template>
  <div class="home">
    <div class="home-list">
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
      <infiniteScroll
        :no-data="!homeList || !homeList.length"
        :loading="loading"
        :distance="40"
        :disable="!hasNextPage"
        @load="loadMore"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import store from 'store2'
import { KEY_ACCESS_TOKEN, KEY_ACCESS_TOKEN_INFO } from '../constants'
import mttkCard from '@/components/statusCard/mttk'
import infiniteScroll from '@/components/InfiniteScroll'

import testData from '@/testData.json'

export default {
  name: 'Home',
  components: {
    mttkCard,
    infiniteScroll
  },
  inject: ['setTitle'],
  data () {
    return {
      loading: true,
      homeList: [],
      homeCount: 0,
      hasNextPage: true
    }
  },
  computed: {
    ...mapState(['userInfo']),
    time () {
      return this.$moment().format('YYYY-MM-DD HH:mm:ss')
    }
  },
  mounted () {
    this.setTitle('Home')
    this.autoLogin()
    // this.getUserState()
  },
  methods: {
    ...mapActions(['refreshUserData']),
    /** 模拟数据获取 */
    getHomeStatus () {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (!this.homeList || this.homeList.length < 20 * 3) {
            resolve(JSON.parse(JSON.stringify(testData)))
          } else {
            resolve({
              code: 0,
              data: {
                count: 845,
                list: []
              }
            })
          }
        }, 1000)
      })
    },
    async loadMore () {
      this.loading = true
      const res = await this.getHomeStatus()
      this.loading = false
      if (!res || res.code) return
      this.homeCount = res.data.count
      if (!res.data.list || !res.data.list.length) {
        this.hasNextPage = false
        return
      }
      this.homeList.push(...res.data.list.map(item => {
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
        }
      }))
    },
    tryJsonParse (str) {
      if (!str) return null
      try {
        return JSON.parse(str)
      } catch (e) {
        console.warn('转换动态列表 JSON 时出现错误：', e)
        return null
      }
    },
    async autoLogin () {
      try {
        const accessToken = store.get(KEY_ACCESS_TOKEN)
        if (accessToken) {
        /**
         * @type { import('../utils').JWTInfo }
         */
          const accessInfo = store.get(KEY_ACCESS_TOKEN_INFO)
          if (accessInfo.exp > Date.now()) {
            await this.refreshUserData()
            console.log('Can login!')
          }
        }
      } catch (error) {
        console.error(error)
      }
    },
    async getUserState () {
      const res = await this.$API.getMyUserData()
      console.log('getMyUserData:', res)
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
