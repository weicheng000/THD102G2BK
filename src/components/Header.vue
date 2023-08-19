<script>
import IconDropdown from '../components/IconDropdown.vue'
export default {
  components: {
    IconDropdown
  },
  data() {
    return {};
  },
};
</script>
<template>
  <div class="content">
    <div class="control">
      <div class="name">王緯育</div>
      <iconDropdown></iconDropdown>
    </div>
  </div>
</template>
<style scoped>
.content {
  display: flex;
  justify-content: flex-end;
  padding: 16px;
  background: #fff;
  box-shadow: 2px 8px 24px 0px rgba(0, 0, 0, 0.1);
}
.control {
  display: flex;
  gap: 20px;
  align-items: center;
}
.name {
  color: #a8a8a8;
  text-align: right;
  font-family: monospace;
  font-size: 16px;
  font-weight: 700;
  line-height: 30px;
}
</style>