import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import TokenStore from '@/store/tokenStore';

const URLS_NO_TOKEN_REQUIRED = ['/login'];

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/operations-history',
  },
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '/login',
        component: () => import('@/views/Login.vue'),
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
      {
        path: 'operation-creator',
        component: () => import('@/views/Operations/OperationCreatorPage.vue'),
      },
      {
        path: 'operations-history',
        component: () => import('@/views/Operations/OperationsHistoryPage.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const currentTokenValue = TokenStore.get();
  const tokenRequired = !URLS_NO_TOKEN_REQUIRED.includes(to.path);
  if (tokenRequired && !currentTokenValue) {
    next('/login');
  }
  next();
});
export default router;
