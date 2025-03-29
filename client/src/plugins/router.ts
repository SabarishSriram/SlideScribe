import { createWebHistory, createRouter } from "vue-router";

import Home from "@/views/Home.vue";
import Dashboard from "@/views/Dashboard.vue";
import Upload from "@/views/Upload.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/dashboard", component: Dashboard },
  {path:"/upload", component:Upload}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router