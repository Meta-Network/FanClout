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
          label="name"
        >
          <template #default="scope">
            <div class="name-container">
              <el-avatar :size="40" :src="scope.row.avatar" />
              <el-button type="text" class="name" @click="BuyCoinsUrl(scope.row)">
                {{ scope.row.name }}
              </el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="price"
          label="price"
        >
          <template #default="scope">
            <div class="price-container">
              <div class="PriceNumber">
                {{ scope.row.price }}
              </div>
              <el-button
                size="small"
                type="primary"
                class="BuyButton"
                @click="BuyCoinsUrl(scope.row)"
              >
                Buy
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { inject, onMounted, ref } from 'vue'

export default {
  setup () {
    const setTitle = inject('setTitle')
    const setHideSidebar = inject('setHideSidebar')
    const coinsData = ref([
      {
        name: 'test',
        price: 'test',
        avatar: 'https://pbs.twimg.com/profile_images/1273450418895376385/kIXRS_tA_400x400.jpg'
        // 示例//
      },
      {
        name: 'test',
        price: 'test',
        avatar: 'https://pbs.twimg.com/profile_images/1273450418895376385/kIXRS_tA_400x400.jpg'
        // 示例//
      }
    ])
    onMounted(() => {
      setTitle('Buy Contributors Coin')
      setHideSidebar(true)
    })
    const BuyCoinsUrl = (row) => {
      console.log(row)
    } // 跳转//
    return {
      coinsData,
      BuyCoinsUrl
    }
  }

}
</script>

<style scoped>
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
  padding: 0 20px 0 0;
  font-family: 'Roboto Mono', monospace;
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
}
.BuyButton{
  display: flex;
  align-items: center;
  background-color: #005bff;
  border-color: #005bff;
  transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
  border-radius: 12px;
}
.BuyButton:hover{
  color: #fff;
  background-color: #004bd1;
  border-color: #0047c4;
}

</style>
