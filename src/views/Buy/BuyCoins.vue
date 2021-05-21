<template>
  <div class="contributors">
    <div class="Desc">
      <div>All creators have a coin. Buy your favorites and get on their team!</div>
    </div>
    <div>
      <el-table
        :data="coinsData"
        class="table"
      >
        <el-table-column
          prop="name"
          label="Name"
        >
          <template #default="scope">
            <div class="name-container">
              <a
                class="avatar"
                :href="scope.row.homepage"
                target="_blank"
                rel="noopener noreferrer"
              >
                <el-avatar :size="40" :src="scope.row.avatar" />
              </a>
              <a
                class="name"
                :href="scope.row.homepage"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ scope.row.name }}
              </a>
              <VerifiedStatus :verified="scope.row.verified || {}" />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="price"
          label="Price"
        >
          <template #default="scope">
            <div class="price-container">
              <div class="PriceNumber">
                ~${{ scope.row.priceFormated }}
              </div>
              <a
                :href="scope.row.buyUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="buy-link"
              >
                <el-button
                  size="small"
                  type="primary"
                  class="BuyButton"
                >
                  Buy
                </el-button>
              </a>
              <a
                :href="scope.row.sellUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="buy-link"
              >
                <el-button
                  size="small"
                  type="primary"
                  class="BuyButton sell-button"
                >
                  Sell
                </el-button>
              </a>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { inject, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import VerifiedStatus from '@/components/VerifiedStatus'

export default {
  components: {
    VerifiedStatus
  },
  setup () {
    const setTitle = inject('setTitle')
    const setHideSidebar = inject('setHideSidebar')
    const store = useStore()
    const coinsData = computed(() => store.getters.topCreators)

    /** 清除 referer，否则无法加载B站的图片资源 */
    // const clearReferer = () => {
    //   const meta = document.createElement('meta')
    //   meta.name = 'referrer'
    //   meta.content = 'no-referrer'
    //   document.getElementsByTagName('head')[0].appendChild(meta)
    // }

    onMounted(() => {
      setTitle('Buy Creator Coins')
      setHideSidebar(true)
      store.dispatch('updateCreatorData')
      // clearReferer()
    })
    return {
      coinsData
    }
  }
}
</script>

<style lang="less" scoped>
.Desc{
  font-family: 'Roboto Mono', monospace;
  padding: 20px ;
}
.price-container{
  display: flex;
}
.PriceNumber{
  display: flex;
  font-size: 15px;
  align-items:center;
  font-family: 'Roboto Mono', monospace;
  min-width: 105px;
}
.name-container{
  display: flex;
  padding: 0 0 0 10px;
}
.name{
  display: flex;
  align-items: center;
  font-size: 15px;
  font-family: 'Roboto Mono', monospace;
  padding: 0 0 0 20px;
  color: #606266;
  text-decoration: none;
  &:hover {
    color: #005bff;
    text-decoration: underline;
  }
}
.avatar {
  text-decoration: none;
  display: flex;
  align-items: center;
}
.buy-link {
  text-decoration: none;
}
.BuyButton{
  display: flex;
  align-items: center;
  background-color: #005bff;
  border-color: #005bff;
  transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
  border-radius: 12px;
  text-decoration: none;
  margin-left: 5em;
  &:hover{
    color: #fff;
    background-color: #004bd1;
    border-color: #0047c4;
    text-decoration: none;
  }
}
.sell-button {
  margin-left: 6px;
}
.table{
  @media screen and (max-width:600px) {
    .BuyButton{
      visibility: hidden;
      width: 0;
      margin-left:0;
    }
    position: absolute;
  }
}

</style>
