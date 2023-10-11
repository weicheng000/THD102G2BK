import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";

const routes = [
  // 網址定義：/；給定名稱 Intro；載入 Intro.vue 元件
  { path: '/', name: 'Login', component: () => import('@/views/login.vue') },
  { path: '/OrderManager', name: 'OrderManager', component: () => import('@/views/ordermanager.vue') },
  { path: '/TourManager', name: 'TourManager', component: () => import('@/views/tourmanger.vue')},
  { path: '/PaperManager', name: 'PaperManager', component: () => import('@/views/papermanager.vue')},
  { path: '/MemberManager', name: 'MemberManager', component: () => import('@/views/membermanager.vue') },
  { path: '/OrderManager/:OrderId/:MemberId/:Info', name: 'OrderList', component: () => import('@/views/OrderList.vue') },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// const router = createRouter({
//   history: createWebHistory(), // 使用History API
//   routes
// });

export default router;