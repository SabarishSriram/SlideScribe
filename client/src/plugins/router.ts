import { createWebHistory, createRouter } from "vue-router";

import Home from "@/views/Home.vue";
import Upload from "@/views/Upload.vue";
import Settings from "@/components/Settings.vue";
import Layout from "@/layout/layout.vue";
import Notes from "@/components/Notes.vue";

const routes = [
  { path: "/", component: Home },
  {
    path: "/",
    component: Layout,
    children: [
      { path: "/dashboard", component: Notes },
      { path: "/upload", component: Upload },
      { path: "/settings", component: Settings },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
