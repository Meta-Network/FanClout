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
          label="name">
          <template #default="scope">
            <div class="name-container">
                <el-avatar :size="40" src="https://pbs.twimg.com/profile_images/1273450418895376385/kIXRS_tA_400x400.jpg"></el-avatar>
              <div class="name">
                {{scope.row.name}}
              </div>
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
                class="BuyButton"
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
    const coinsData = ref([
      {
        name: 'test',
        price: 'test'
      }
    ])
    onMounted(() => {
      setTitle('Buy Contributors Coin')
    })
    return {
      coinsData
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
  padding: 0 10px 0 0;
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
  padding: 0 0 0 10px;
}
.BuyButton{
  display: flex;
  align-items: center;
}
</style>
