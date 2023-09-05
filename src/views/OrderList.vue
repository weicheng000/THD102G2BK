<template>
  <div class="thispage">
    <sidebar></sidebar>
    <div>
      <top></top>

      <div class="container mt-4">
        <div class="row">
          <div class="col-12">
            <h3>檢視訂單</h3>
          </div>
        </div>

        <div class="row mt-4">
          <div class="col-9">
            <div class="row">
              <div class="col">
                <div class="card text-bg-secondary">
                  <div class="card-body">
                    訂單編號：{{ formatValue($route.params.OrderId, "OR") }}
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card text-bg-secondary">
                  <div class="card-body">訂購人會員編號：{{ formatValue($route.params.MemberId,"MB").toLocaleString("en-US") }}</div>
                </div>
              </div>
              <div class="col">
                <div class="card text-bg-secondary">
                  <div class="card-body">訂購總金額：{{ (hotelTotalSum + driverTotalSum) }} 元</div>
                </div>
              </div>
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
                    <vxe-column field="HotelOrderId" title="旅宿編號">
                      <template #default="{ row }">
                        {{ formatValue(row.HotelOrderId, "SH") }}
                      </template>
                    </vxe-column>
                    <vxe-column field="HotelName" title="旅宿名稱"></vxe-column>
                    <vxe-column field="Type" title="房型">
                      <!-- <template #default="{ row }">
                        <span v-if="row.Type === 0">貓套房</span>
                        <span v-else>狗套房</span>
                      </template> -->
                    </vxe-column>
                    <vxe-column field="value" title="數量"></vxe-column>
                    <vxe-column field="total" title="小計">
                      <template #default="{ row }">
                        <span>${{ row.total.toLocaleString("en-US") }}</span>
                      </template>
                    </vxe-column>
                  </vxe-table>
                </div>

                <h5 class="card-title mb-4">接送資料</h5>
                <div class="col-12 mb-4">
                  <vxe-table border :data="DriverOrder">
                    <vxe-column field="Type" title="車型">
                      <!-- <template #default="{ row }">
                        <span v-if="row.Type === 0">轎車</span>
                        <span v-else>休旅車</span>
                      </template> -->
                    </vxe-column>
                    <vxe-column field="StartAdd" title="迄點"></vxe-column>
                    <vxe-column field="EndAdd" title="終點"></vxe-column>
                    <vxe-column field="Distance" title="里程">
                      <template #default="{ row }">
                        <span>{{ row.Distance }}公里</span>
                      </template>
                    </vxe-column>
                    <vxe-column field="total" title="小計">
                      <template #default="{ row }">
                        <span>${{ row.total.toLocaleString("en-US") }}</span>
                      </template>
                    </vxe-column>
                  </vxe-table>
                </div>

                <div class="row" v-show="$route.params.Info === '待審核'">
                  <div class="col-12 d-flex justify-content-end">
                    <button class="btn btn-outline-primary me-3">拒絕</button>
                    <button class="btn btn-primary">核准</button>
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
      HotelOrder: [],
      DriverOrder: [],
    };
  },
  mounted() {
    this.Initial();
  },
  computed: {
    hotelTotalSum() {
      return this.HotelOrder.reduce((accumulator, currentItem) => accumulator + currentItem.total, 0)
    },
    driverTotalSum() {
      return this.DriverOrder.reduce((accumulator, currentItem) => accumulator + currentItem.total, 0)
    }
  }
  ,
  methods: {
    Initial() {
      // console.log("begin!");
      const MemberId = this.$route.params.OrderId;
      fetch(`/thd102/g2/php/OrderTableList/select.php?MemberId=${MemberId}`, {
        method: 'GET'
      }).then((res) => res.json()).then((data) => {
        // console.log(data.hotel);

        const hotel = data.hotel.map((item) => ({
          OrderId: this.$route.params.OrderId[0],
          HotelOrderId: item.HOTELINFO_ID,
          HotelName: item.HOTELNAME,
          Type: item.PRODUCTNAME,
          value: item.AMOUNT,
          total: item.NOWPRICE
        }));

        const driver = data.driver.map((driver) => ({
          OrderId: this.$route.params.OrderId[0],
          Type: driver.PRODUCTNAME,
          StartAdd: driver.START,
          EndAdd: driver.END,
          Distance: driver.QUANTITY,
          total: driver.NOWPRICE,
        }));
        // console.log(hotel);
        this.HotelOrder = hotel;
        this.DriverOrder = driver;
      }).catch(error => {
        console.error("error:", error);
      })
    },
    formatValue(value, tittle) {
      const outPutValue = value.toString().padStart(5, "0");
      return `${tittle}${outPutValue}`;
    }
  }
};
</script>

<style scoped></style>
