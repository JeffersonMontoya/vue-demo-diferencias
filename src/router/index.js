import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "comparisons",
    component: () => import("../views/ComparisonsView.vue"),
  },
  {
    path: "/zip-file",
    name: "zip-file",
    component: () => import("../views/ZipFile.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
