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
                  <div class="card-body">訂購人會員編號：{{ formatValue($route.params.MemberId, "MB").toLocaleString("en-US") }}
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="card text-bg-secondary">
                  <div class="card-body">訂購總金額：${{ (hotelTotalSum + driverTotalSum).toLocaleString("en-US") }} 元</div>
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
                    <button class="btn btn-outline-primary me-3" @click="() => submit('取消')">拒絕</button>
                    <button class="btn btn-primary" @click="() => submit('核准')">核准</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
      DriverOrder: []
    };
  },
  mounted() {
    this.Initial();
  },
  computed: {
    hotelTotalSum() {
      return this.HotelOrder.reduce((accumulator, currentItem) => {
        const total = parseFloat(currentItem.total);
        if (!isNaN(total)) {
          return accumulator + total;
        }
        return accumulator;
      }, 0);
    },
    driverTotalSum() {
      return this.DriverOrder.reduce((accumulator, currentItem) => {
        const total = parseFloat(currentItem.total);
        if (!isNaN(total)) {
          return accumulator + total;
        }
        return accumulator;
      }, 0);
    }
  }
  ,
  methods: {
    Initial() {
      // console.log("begin!");
      const MemberId = this.$route.params.OrderId;
      fetch(`/api/orders/detail/${MemberId}`, {
        method: 'GET'
      }).then((res) => res.json()).then((response) => {

        if (response.code === 1) {

          const hotel_el = [];
          const driver_el = [];

          response.data.map((item) => {
            if (item.hotelId !== null) {
              hotel_el.push(item);
            } else {
              driver_el.push(item)
            }
          });

          const hotel = hotel_el.map((item) => ({
            OrderId: item.orderId,
            HotelOrderId: item.hotelId,
            HotelName: item.hotelName,
            Type: item.productName,
            value: item.amount * item.quantity,
            total: item.nowPrice * item.amount * item.quantity
          }));

          const driver = driver_el.map((driver) => ({
            OrderId: driver.orderId,
            Type: driver.productName,
            StartAdd: driver.start,
            EndAdd: driver.end,
            Distance: driver.amount * driver.quantity,
            total: driver.nowPrice * driver.amount * driver.quantity
          }));
          // console.log(hotel);
          this.HotelOrder = hotel;
          this.DriverOrder = driver;

        }


      }).catch(error => {
        console.error("error:", error);
      })
    },
    formatValue(value, tittle) {
      const outPutValue = value.toString().padStart(5, "0");
      return `${tittle}${outPutValue}`;
    },
    submit(value) {
      const requestData = {
        id: this.$route.params.OrderId,
        orderStatus: value
      };
      fetch('/api/orders', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      })
        .then(response => response.json())
        .then(data => {
          if (data.code === 1) {
            this.$router.push('/OrderManager');
          } else if (data.status === 'noChange') {
            VXETable.modal.message({ content: `無變化`, status: 'error' });
          } else {
            console.error('Request failed with status:', data.status);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }
};
</script>

<style scoped></style>
