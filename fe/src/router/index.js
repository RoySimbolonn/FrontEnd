import { createRouter, createWebHistory } from 'vue-router';
import MainNav from '@/components/MainNav.vue';
import ItemList from '@/components/admin/item/ItemList.vue';
import UserList from '@/components/admin/user/UserList.vue';
import AdminView from '@/views/AdminView.vue';
import UserView from '@/views/UserView.vue';

const routes = [
  {
    path: '/',  // Setel rute utama ke MainNav
    name: 'main-nav',
    component: MainNav,
  },
  {
    path: '/item',
    name: 'item',
    component: ItemList,
  },
  {
    path: '/user',
    name: 'user',
    component: UserList,
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
  },
  {
    path: '/user-view',
    name: 'user-view',
    component: UserView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

