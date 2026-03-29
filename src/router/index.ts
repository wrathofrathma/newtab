import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Index from "../views/Index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Index,
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

if (import.meta.env.VITE_APP_TARGET !== "extension") {
  routes.push({
    path: "/privacy",
    component: () => import("../views/Privacy.vue"),
  });
}

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
