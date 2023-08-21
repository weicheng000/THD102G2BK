<template>
  <div class="thispage">
    <sidebar></sidebar>
    <div>
      <top></top>

      <div class="container mt-4">
        <div class="row">
          <div class="col-12">
            <h3>檢視訂單: {{ $route.params.OrderId }}</h3>
          </div>
        </div>

        <div class="row mt-4">
          <div class="col-2">
            <div class="card text-bg-secondary">
              <div class="card-body">訂單編號：{{ $route.params.OrderId }}</div>
            </div>
          </div>
          <div class="col-3">
            <div class="card text-bg-secondary">
              <div class="card-body">訂購人會員編號：MB00002</div>
            </div>
          </div>
          <div class="col-2">
            <div class="card text-bg-secondary">
              <div class="card-body">訂購總金額：65,535元</div>
            </div>
          </div>
        </div>

        <div class="row mt-4">
          <div class="col-12">
            <div class="card">
              <div class="card-header p-3">
                <h5>詳細資料</h5>
              </div>
              <div class="card-body">
                <h5 class="card-title mb-4">旅宿資料</h5>
                <div class="col-12 mb-4">
                  <vxe-table border :data="HotelOrder">
                    <vxe-column
                      field="HotelOrderId"
                      title="旅宿編號"
                    ></vxe-column>
                    <vxe-column field="HotelName" title="旅宿名稱"></vxe-column>
                    <vxe-column field="Type" title="房型">
                      <template #default="{ row }">
                        <span v-if="row.Type === 0">貓套房</span>
                        <span v-else>狗套房</span>
                      </template>
                    </vxe-column>
                    <vxe-column field="value" title="數量"></vxe-column>
                    <vxe-column field="total" title="小記">
                       <template #default="{ row }">
                        <span>${{ row.total.toLocaleString('en-US') }}</span>
                      </template>
                    </vxe-column>
                  </vxe-table>
                </div>

                <h5 class="card-title mb-4">接送資料</h5>
                <div class="col-12 mb-4">
                  <vxe-table border :data="DriverOrder">
                    <vxe-column field="Type" title="車型">
                      <template #default="{ row }">
                        <span v-if="row.Type === 0">轎車</span>
                        <span v-else>休旅車</span>
                      </template>
                    </vxe-column>
                    <vxe-column field="StartAdd" title="迄點"></vxe-column>
                    <vxe-column field="EndAdd" title="終點"></vxe-column>
                    <vxe-column field="Distance" title="里程">
                      <template #default="{ row }">
                        <span>{{ row.Distance }}公里</span>
                      </template>
                    </vxe-column>
                    <vxe-column field="total" title="小記">
                       <template #default="{ row }">
                        <span>${{ row.total.toLocaleString('en-US') }}</span>
                      </template>
                    </vxe-column>
                  </vxe-table>
                </div>

                <div class="row" v-show="$route.params.Info === '0'">
                  <div class="col-12 d-flex justify-content-end">
                    <button class="btn btn-outline-primary me-3">
                      拒絕
                    </button>
                    <button class="btn btn-primary">
                      核准
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <h1>{{ $route.params.OrderId }}</h1> -->
  <!-- 其他内容 -->
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import Top from "../components/Header.vue";
export default {
  components: {
    Sidebar,
    Top,
  },
  data() {
    return {
      HotelOrder: [
        {
          OrderId: "OR00001",
          HotelOrderId: "SH00001",
          HotelName: "快樂寵物旅館",
          Type: 0,
          value: 1,
          total: 1800,
        },
        {
          OrderId: "OR00301",
          HotelOrderId: "SH00001",
          HotelName: "毛起來住",
          Type: 1,
          value: 1,
          total: 800,
        },
      ],
      DriverOrder:[{
        OrderId: "OR00001",
        DriverId: "DR00001",
        Type: 0,
        StartAdd: "中和景新街235號",
        EndAdd: "快樂寵物旅館",
        Distance: 5,
        total: 435
      }]
    };
  },
  mount() {
    // 使用 replace 方法更改網址，但不會導致頁面重新載入
    const randomValue = Math.random().toString(36).substring(7);
    this.$router.replace({
      name: 'OrderList',
      params: {
        OrderId: this.$route.params.OrderId, // 保持不變
        Info: randomValue
      }
    });
  }
};
</script>

<style scoped>
</style>
