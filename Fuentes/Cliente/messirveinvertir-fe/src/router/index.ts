import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/barcode-scanner',
  },
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '',
        redirect: '/barcode-scanner',
      },
      {
        path: 'barcode-scanner',
        component: () => import('@/views/BarcodeScanner.vue'),
      },
      {
        path: 'chart',
        component: () => import('@/views/Chart.vue'),
      },
      {
        path: 'external-account',
        component: () => import('@/views/External/ExternalAccountListPage.vue'),
      },
      {
        path: 'link-external-account',
        component: () => import('@/views/External/LinkExternalAccountPage.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
