<template>
  <div class="home">
    <div class="home-nav">
      <div
        v-for="(item, index) of tabs"
        class="home-nav-tab"
        :class="item.name === tab && 'nav-tab-active'"
        :key="index"
        @click="switchTab(item.name)"
      >
        <h4>
          {{ $t(item.label) }}
        </h4>
        <div class="home-nav-tab-underline" />
      </div>
    </div>
    <div class="home-list">
      <template v-for="(item, index) of timeline.list">
        <!-- Matataki 动态卡片 -->
        <mttkCard
          v-if="item && item.platform === 'matataki'"
          class="home-list-item"
          :key="index + '-matataki'"
          :data="item.card"
        />
        <twitterCard
          v-else-if="item && item.platform === 'twitter'"
          class="home-list-item"
          show-logo
          :key="index + '-twitter'"
          :card="item.card"
          :stats="item.stats"
          @click-like="likeEvent"
        />
        <bilibiliCard
          v-else-if="item && item.platform === 'bilibili'"
          class="home-list-item"
          show-logo
          :key="index + '-bilibili'"
          :data="item.card"
          :stats="item.stats"
          @click-like="likeEvent"
        />
        <MastodonCard
          v-else-if="item && item.platform === 'mastodon'"
          class="home-list-item"
          show-logo
          :key="index + '-Mastodon'"
          :data="item.card"
          :stats="item.stats"
          @click-like="likeEvent"
        />
        <!-- 未知平台 -->
        <div v-else class="home-list-item item-warning" :key="index + '-unsupportedStausType'">
          {{ $t('home.unsupportedStausType', [item ? item.platform : 'unknown']) }}<br>
          ID: {{ item ? item.id : 'unknown' }}
        </div>
      </template>
      <infiniteScroll
        v-if="isLogined || tab !== 'following'"
        :no-data="!timeline.list || !timeline.list.length"
        :loading="loading"
        :distance="40"
        :disable="!hasNextPage"
        @load="loadMore"
      />
      <div class="home-list-not-login" v-else>
        <p>
          {{ $t('error.pleaseLogin') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import store from 'store2'
import { KEY_ACCESS_TOKEN, KEY_ACCESS_TOKEN_INFO } from '../constants'
import mttkCard from '@/components/statusCard/mttk'
import twitterCard from '@/components/statusCard/twitter'
import bilibiliCard from '@/components/statusCard/bilibili'
import infiniteScroll from '@/components/InfiniteScroll'
import MastodonCard from '@/components/statusCard/mastodon'

export default {
  name: 'Home',
  components: {
    mttkCard,
    twitterCard,
    bilibiliCard,
    infiniteScroll,
    MastodonCard
  },
  inject: ['setTitle'],
  data () {
    return {
      loading: true,
      global: {
        list: [],
        count: 1,
        page: 0
      },
      following: {
        list: [],
        count: 1,
        page: 0
      },
      homeCount: 1,
      pageSize: 20,
      page: 0,
      tab: this.$route.query.tab || 'global',
      tabs: [
        {
          label: 'home.tabGlobal',
          name: 'global'
        },
        {
          label: 'home.tabFollowing',
          name: 'following'
        }
      ]
    }
  },
  computed: {
    ...mapState(['userInfo']),
    ...mapGetters(['isLogined']),
    time () {
      return this.$moment().format('YYYY-MM-DD HH:mm:ss')
    },
    hasNextPage () {
      return Math.round(this.timeline.page * this.pageSize) < this.timeline.count
    },
    timeline () {
      return this.tab === 'global' ? this.global : this.following
    }
  },
  watch: {
    tab (val) {
      // this.initTimelineObj(val)
      this.loading = false
      if (this.timeline.list && this.timeline.list.length) return
      if (this.tab !== 'following' || this.isLogined) this.loadMore()
    }
  },
  mounted () {
    this.setTitle('Home')
    this.autoLogin()
    // this.getUserState()
  },
  methods: {
    ...mapActions(['refreshUserData']),
    async loadMore () {
      this.loading = true
      const oldTab = this.tab
      let res
      try {
        if (this.tab === 'global') res = await this.$API.getAllTimeline(this.timeline.page + 1, '["mastodon"]')
        else res = await this.$API.getTimeline(this.timeline.page + 1)
        console.log('res:', res)
      } catch (err) {
        this.loading = false
        // 未登录
        if (err.response.status === 403) {
          this.$message.warning(this.$t('error.pleaseLogin'))
          return
        }
        // 其他错误
        console.error(err)
        this.$message.error(this.$t('error.failedToFetchTimeline'))
        return
      }
      // 数据加载完成前用户就切换标签页，则放弃获取到的数据
      if (this.tab !== oldTab) return

      this.loading = false
      // 数据获取失败
      if (!res || res.code) {
        this.$message.error(res.message)
        return
      }
      this.timeline.count = res.data.count
      // 列表为空
      if (!res.data.list || !res.data.list.length) return
      // 页码递增，存储获取到的列表
      this.timeline.page++
      this.timeline.list.push(...res.data.list.map(item => {
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
      console.log('Timeline list', this.timeline.list)
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
    },
    async likeEvent ({ type, platform, dynamicId }) {
      try {
        const res = await this.$API.likeEvent(type, platform, dynamicId)
        if (!res.code) {
          this.$message.success(this.$t('likeSuccess'))
        } else this.$message.error(res.error)
      } catch (e) {
        console.error('[Like failed]:', e)
        this.$message.error(this.$t('error.fail'))
      }
    },
    switchTab (name) {
      this.tab = name
      this.$router.replace({
        query: {
          tab: name
        }
      })
    },
    initTimelineObj (tab) {
      const initData = {
        list: [],
        count: 1,
        page: 0
      }
      if (this.tab === 'global') this.global = initData
      else this.following = initData
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

  &-nav {
    margin-top: 10px;
    padding: 0 20px;
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
    background: white;
    display: flex;
    align-items: center;

    &-tab {
      margin-right: 20px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 50px;

      &:last-child {
        margin-right: 0;
      }

      h4 {
        text-align: center;
        color: #777;
        font-size: 15px;
        margin: 0px;
        height: 47px;
        line-height: 47px;
      }

      &-underline {
        width: 50px;
        border-bottom: 3px solid #fff0;
      }

      &:hover {
        h4 {
          color: black;
        }
      }

      &.nav-tab-active {
        .home-nav-tab-underline {
          border-bottom: 3px solid #0058f7;
        }

        h4 {
          color: black;
        }
      }
    }
  }

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

    &-not-login {
      height: 100px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;

      p {
        margin: 0;
        padding: 0;
        font-size: 14px;
        color: #657786;
      }
    }
  }
}
</style>
